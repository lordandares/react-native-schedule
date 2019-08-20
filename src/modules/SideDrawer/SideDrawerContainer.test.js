import React from 'react';
import { shallow } from 'enzyme';

import { SideDrawerComponent as Component } from './SideDrawerContainer';

const mockMergeOptions = jest.fn();

jest.mock('react-native-navigation', () => ({
  Navigation: {
    events: () => ({
      bindComponent: jest.fn(),
    }),
    mergeOptions: jest.fn(() => mockMergeOptions()),
    push: jest.fn(),
  },
}));

jest.mock('react-native-device-info', () => ({
  getVersion: jest.fn(() => '123.123'),
}));

const initialProps = {
  styles: {},
};

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

describe('SideDrawerComponent', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Component {...initialProps} />);
  });

  it('should contain functioning close button', () => {
    const button = wrapper.find('#closeSideDrawer');
    expect(button).toBeTruthy();
    button.simulate('press');
    expect(mockMergeOptions).toHaveBeenCalledTimes(1);
  });

  it('should contain buttons to TOS, SP, PS', () => {
    const linkTos = wrapper.find('#termsOfService');
    const linkSp = wrapper.find('#securityPolicy');
    const linkPs = wrapper.find('#privacyStatement');
    expect(linkTos).toBeTruthy();
    expect(linkSp).toBeTruthy();
    expect(linkPs).toBeTruthy();
  });

  it('should contain copyright info', () => {
    const text = wrapper.find('#copyright').render().text();
    expect(text).toContain('SIDE_DRAWER.COPYRIGHT');
  });

  it('should contain version info', () => {
    const text = wrapper.find('#version').render().text();
    expect(text).toContain('SIDE_DRAWER.VERSION');
    expect(text).toContain('123.123');
  });
});
