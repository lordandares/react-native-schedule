/* eslint-disable no-underscore-dangle */
import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import ErrorHandlerRedux from '@next/schedule/lib/redux/ErrorHandlerRedux';
import AuthRedux, { getCurrentUser, getUserTenantId } from '@next/auth/lib/redux/Auth';

import { trackEvent } from './AnalyticsSaga';
import { getCurrentScreen, appNavigationActions, getActiveTab, getActiveInnerTab } from '../redux/appNavigation';
import { getEnvironment } from '../redux/EnvSwitchRedux';
import AnalyticsRedux from '../redux/analytics';

global.__DEV__ = false;
const AppCenterAnalytics = {
  trackEvent: () => {},
};
const analyticsServices = { AppCenterAnalytics };
const error = new Error('error!');

const screenName = 'fake-screen';
const env = 'unit-test';
const eventName = 'eventName';
const currentTenantId = 'tenantId';
const email = 'fake@email.com';
const currentUser = { email };
const currentTab = { id: 'FakeTab' };
const currentInnerTab = { id: 'EventMoreFakeInnerTab' };


const genArgs = ({
  environment = env,
  username = email,
  screen = screenName,
  tenantId = currentTenantId,
  tab = currentTab.id,
  innerTab = currentInnerTab.id,
}) => ({
  environment, username, screen, tenantId, tab, innerTab,
});

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

describe('AnalyticsSaga', () => {
  it('TRACK_EVENT action is being tracked', () =>
    expectSaga(trackEvent, analyticsServices, AnalyticsRedux.trackEvent(eventName))
      .provide([
        [select(getCurrentScreen), screenName],
        [select(getEnvironment), env],
        [select(getCurrentUser), currentUser],
        [select(getUserTenantId), currentTenantId],
        [select(getActiveTab), currentTab],
        [select(getActiveInnerTab), currentInnerTab],
      ])
      .call(AppCenterAnalytics.trackEvent, eventName, genArgs({}))
      .run());

  it('TRACK_EVENT action is being tracked', () =>
    expectSaga(trackEvent, analyticsServices, AnalyticsRedux.trackEvent(eventName))
      .provide([
        [select(getCurrentScreen), screenName],
        [select(getEnvironment), env],
        [select(getCurrentUser), currentUser],
        [select(getUserTenantId), currentTenantId],
        [select(getActiveTab), currentTab],
        [select(getActiveInnerTab), currentInnerTab],
      ])
      .call(AppCenterAnalytics.trackEvent, eventName, genArgs({}))
      .run());

  it('Handle error when trackEvent fails', () =>
    expectSaga(trackEvent, analyticsServices, AnalyticsRedux.trackEvent(eventName))
      .provide([
        [select(getCurrentScreen), screenName],
        [select(getEnvironment), env],
        [select(getCurrentUser), currentUser],
        [select(getUserTenantId), currentTenantId],
        [select(getActiveTab), currentTab],
        [select(getActiveInnerTab), currentInnerTab],
        [matchers.call.fn(AppCenterAnalytics.trackEvent), throwError(error)],
      ])
      .call(AppCenterAnalytics.trackEvent, eventName, genArgs({}))
      .put(ErrorHandlerRedux.addError(`Failed to track an analytics event: ${error.message}`, error))
      .run());


  it('Username=NOT-LOGGED-IN when no user', () =>
    expectSaga(trackEvent, analyticsServices, AnalyticsRedux.trackEvent(eventName))
      .provide([
        [select(getCurrentScreen), screenName],
        [select(getEnvironment), env],
        [select(getCurrentUser), null],
        [select(getUserTenantId), currentTenantId],
        [select(getActiveTab), currentTab],
        [select(getActiveInnerTab), currentInnerTab],
      ])
      .call(AppCenterAnalytics.trackEvent, eventName, genArgs({ username: 'NOT-LOGGED-IN' }))
      .run());

  it('All values are being converted to strings', () =>
    expectSaga(trackEvent, analyticsServices, AnalyticsRedux.trackEvent(eventName))
      .provide([
        [select(getCurrentScreen), 123],
        [select(getEnvironment), false],
        [select(getCurrentUser), undefined],
        [select(getUserTenantId), null],
        [select(getActiveTab), { id: 321 }],
        [select(getActiveInnerTab), null],
      ])
      .call(AppCenterAnalytics.trackEvent, eventName, genArgs({
        environment: 'false',
        username: 'NOT-LOGGED-IN',
        screen: '123',
        tenantId: 'null',
        tab: '321',
        innerTab: '',
      }))
      .run());

  it('REQUEST_LOGIN_USER action is being tracked after SUCCESS_LOGIN_USER', () =>
    expectSaga(trackEvent, analyticsServices, AuthRedux.requestLoginUser())
      .provide([
        [select(getCurrentScreen), screenName],
        [select(getEnvironment), env],
        [select(getCurrentUser), currentUser],
        [select(getUserTenantId), currentTenantId],
        [select(getActiveTab), currentTab],
        [select(getActiveInnerTab), currentInnerTab],
      ])
      .call(AppCenterAnalytics.trackEvent, 'Auth/Login', genArgs({}))
      .dispatch(AuthRedux.successLoginUser())
      .run());

  it('REQUEST_LOGIN_USER action is NOT being tracked after ERROR_LOGIN_USER', () =>
    expectSaga(trackEvent, analyticsServices, AuthRedux.requestLoginUser())
      .provide([
        [select(getCurrentScreen), screenName],
        [select(getEnvironment), env],
        [select(getCurrentUser), currentUser],
        [select(getUserTenantId), currentTenantId],
        [select(getActiveTab), currentTab],
        [select(getActiveInnerTab), currentInnerTab],
      ])
      .not.call(AppCenterAnalytics.trackEvent, 'Auth/Login', genArgs({}))
      .dispatch(AuthRedux.errorLoginUser())
      .run());

  it('SCREEN_CHANGED action is being tracked', () =>
    expectSaga(trackEvent, analyticsServices, appNavigationActions.screenChanged('someScreen'))
      .provide([
        [select(getCurrentScreen), screenName],
        [select(getEnvironment), env],
        [select(getCurrentUser), currentUser],
        [select(getUserTenantId), currentTenantId],
        [select(getActiveTab), currentTab],
        [select(getActiveInnerTab), currentInnerTab],
      ])
      .call(AppCenterAnalytics.trackEvent, 'Screen/someScreen', genArgs({}))
      .dispatch(AuthRedux.successLoginUser())
      .run());


  // Keep it in the bottom because we redeclare global __DEV__=true
  it('Don\'t trackEvent in local development environment', () => {
    global.__DEV__ = true;
    return expectSaga(trackEvent, analyticsServices, AnalyticsRedux.trackEvent(eventName))
      .provide([
        [select(getCurrentScreen), screenName],
        [select(getEnvironment), env],
        [select(getCurrentUser), currentUser],
        [select(getUserTenantId), currentTenantId],
        [select(getActiveTab), currentTab],
        [select(getActiveInnerTab), currentInnerTab],
        [matchers.call.fn(AppCenterAnalytics.trackEvent), throwError(error)],
      ])
      .not.call(AppCenterAnalytics.trackEvent, eventName, genArgs({}))
      .run();
  });
});
