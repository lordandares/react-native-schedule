
import { testSaga } from 'redux-saga-test-plan';
import ErrorHandlerRedux from '@next/schedule/lib/redux/ErrorHandlerRedux';

import { watchScreenChanges, screenChangeChannel } from './ScreenControllerSaga';
import { appNavigationActions, getCurrentScreen } from '../redux/appNavigation';

jest.mock('react-i18next', () => ({
  withNamespaces: () => (lComponent) => {
    const loginComponent = lComponent;
    loginComponent.defaultProps = { ...lComponent.defaultProps, t: key => key };
    return loginComponent;
  },
  reactI18nextModule: jest.fn(),
}));


jest.mock('react-native-localize', () => ({
  RNLocalize: {
    language: 'en',
    languages: ['en'],
  },
  getLocales: jest.fn(() => [{ languageCode: 'en' }]),
}));

describe('ScreenControllerSaga', () => {
  it('watchScreenChanges puts SCREEN_CHANGED actions & closes channel on exception', () => {
    const channel = () => {};
    channel.close = () => {};
    const error = new Error('Fire&Explosions!');

    testSaga(watchScreenChanges)
      .next()
      .call(screenChangeChannel)
      .next(channel)
      .take(channel)
      .next('screen1')
      .select(getCurrentScreen)
      .next('defaultScreen')
      .put(appNavigationActions.screenChanged('screen1'))
      .next(channel)
      .take(channel)
      .next('screen2')
      .select(getCurrentScreen)
      .next('screen1')
      .put(appNavigationActions.screenChanged('screen2'))
      .next(channel)
      .throw(error)
      .put(ErrorHandlerRedux.addError(`watchScreenChanges failed: ${error.message}`, error))
      .next()
      .call(channel.close)
      .next()
      .isDone();
  });

  it('watchScreenChanges does not put SCREEN_CHANGED action if the screenName is the same', () => {
    const channel = () => {};
    channel.close = () => {};
    const error = new Error('Fire&Explosions!');

    testSaga(watchScreenChanges)
      .next()
      .call(screenChangeChannel)
      .next(channel)
      .take(channel)
      .next('screen1')
      .select(getCurrentScreen)
      .next()
      .put(appNavigationActions.screenChanged('screen1'))
      .next(channel)
      .take(channel)
      .next('screen1')
      .select(getCurrentScreen)
      .next('screen1')
      .next(channel)
      .throw(error)
      .put(ErrorHandlerRedux.addError(`watchScreenChanges failed: ${error.message}`, error))
      .next()
      .call(channel.close)
      .next()
      .isDone();
  });
});
