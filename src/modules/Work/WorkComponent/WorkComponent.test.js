import React from 'react';
import { shallow } from 'enzyme';
import { Navigation } from 'react-native-navigation';
import WorkComponent from './WorkComponent';
import { getContainerMaxHeight, getContainerWidth } from '../../../shared/utils/dimensions';

jest.mock('../../../shared/utils/dimensions');
getContainerMaxHeight.mockImplementation(() => {});
getContainerWidth.mockImplementation(() => {});

jest.mock('react-native-navigation', () => ({
  Navigation: {
    events: () => ({
      bindComponent: jest.fn(),
    }),
    mergeOptions: jest.fn(),
    push: jest.fn(),
  },
}));

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

describe('WorkComponent', () => {
  it('should shallow render', () => {
    shallow(<WorkComponent />);
  });

  it('should call navigate to create task when add button is pressed', () => {
    const currentUser = { companyId: '123' };
    const navSpy = jest.spyOn(Navigation, 'push');
    const workComponent = shallow(<WorkComponent createTask={jest.fn()} currentUser={currentUser} />).dive();
    workComponent.instance().navigationButtonPressed({ buttonId: 'add' });

    expect(navSpy).toHaveBeenCalled();
  });

  it('should show plus button when flag is true', () => {
    const workComponent = shallow(<WorkComponent createInspectionsEnabled />).dive();
    workComponent.instance().setupAppBarButtons();
    expect(Navigation.mergeOptions).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({
        topBar: {
          rightButtons: expect.arrayContaining([expect.objectContaining({ id: 'add' })]),
        },
      }),
    );
  });

  it('should show not show plus button when flag is false', () => {
    const workComponent = shallow(<WorkComponent createInspectionsEnabled={false} />).dive();
    workComponent.instance().setupAppBarButtons();
    expect(Navigation.mergeOptions).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({
        topBar: {
          rightButtons: expect.not.arrayContaining([expect.objectContaining({ id: 'add' })]),
        },
      }),
    );
  });
});
