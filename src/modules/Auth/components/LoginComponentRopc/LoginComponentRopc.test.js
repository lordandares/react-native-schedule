import React from 'react';
import { shallow } from 'enzyme';

import Component, { USERNAME, PASSWORD, SETTINGS_BUTTON_ID } from './LoginComponentRopc';
import AnalyticsEvents from '../../../../shared/constants/analyticsEvents';

//
// Initial state
//
const defaultEnv = 'dev';

const loginAction = jest.fn();
const logoutAction = jest.fn();
const trackEvent = jest.fn();
const switchEnvironmentAction = jest.fn();
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

jest.mock('react-i18next', () => ({
  withNamespaces: () => (lComponent) => {
    const loginComponent = lComponent;
    loginComponent.defaultProps = { ...lComponent.defaultProps, t: key => key };
    return loginComponent;
  },
  reactI18nextModule: jest.fn(),
}));

jest.mock('appcenter', () => ({
  getInstallId: jest.fn(),
  AppCenterReactNative: {},
}));

jest.mock('appcenter/appcenter-log', () => ({
  AppCenterReactNative: {},
}));

const initialProps = {
  preventNoSubscriptionLoginFlag: true,
  userLoggedIn: false,
  authErrorMessage: null,
  loading: false,
  environment: defaultEnv,
  userInManagement: null,
  componentId: 'id',
  login: loginAction,
  logout: logoutAction,
  switchEnvironment: switchEnvironmentAction,
  trackEvent,
};

describe('LoginComponentROPC', () => {
  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Login screen', () => {
    beforeEach(() => {
      wrapper = shallow(<Component {...initialProps} />).dive();
    });


    it('should show login form and image', () => {
      const usrInput = wrapper.find('#username');
      const pwdInput = wrapper.find('#password');
      const loginButton = wrapper.find('#loginButton');
      const loginButtonText = wrapper.find('#loginButtonText');
      const image = wrapper.find('Image');

      expect(usrInput).toBeTruthy();
      expect(pwdInput).toBeTruthy();
      expect(loginButton).toBeTruthy();
      expect(image).toBeTruthy();

      expect(usrInput.dive().name()).toBe('FormInput');
      expect(pwdInput.dive().name()).toBe('FormInput');
      expect(usrInput.props().inputProps.placeholder).toBe('AUTH_MODULE.EMAIL');
      expect(pwdInput.props().inputProps.placeholder).toBe('AUTH_MODULE.PASSWORD');
      expect(loginButtonText.render().text()).toBe('AUTH_MODULE.SIGN_IN');
    });

    it('should show qbot with testFlag true', () => {
      wrapper.setProps({ testFlag: true });
      const qbot = wrapper.find('#qbot');
      expect(qbot.length).toBe(1);
    });

    it('should not show qbot with testFlag false', () => {
      wrapper.setProps({ testFlag: false });
      const qbot = wrapper.find('#qbot');
      expect(qbot.length).toBe(0);
    });

    it('should be invalid when no password provided', () => {
      // Prep
      const username = 'fake-username';
      const loginButton = wrapper.find('#loginButton');
      wrapper.setState({ [USERNAME]: username });

      // Execute
      loginButton.simulate('press');
      const state = wrapper.state();

      // Expected
      expect(state.errors[PASSWORD]).toBeTruthy();
      expect(state[USERNAME]).toBe(username);
      expect(state.touched).toContain(USERNAME);
      expect(state.touched).toContain(PASSWORD);
    });

    it('should dispatch login action', () => {
      // Prep
      const username = 'fake-username';
      const password = 'fake-password';
      const preventNoSubscriptionLoginFlag = true;
      const loginButton = wrapper.find('#loginButton');
      wrapper.setState({
        [USERNAME]: username,
        [PASSWORD]: password,
      });

      // Execute
      loginButton.simulate('press');
      const state = wrapper.state();

      // Expected
      expect(state.errors[USERNAME]).toBeFalsy();
      expect(state.errors[PASSWORD]).toBeFalsy();
      expect(state.touched).toContain(USERNAME);
      expect(state.touched).toContain(PASSWORD);
      expect(loginAction).toBeCalledWith(username, password, preventNoSubscriptionLoginFlag);
    });

    it('should display an auth error', () => {
      initialProps.authErrorMessage = 'fake-error';
      wrapper = shallow(<Component {...initialProps} />).dive();

      const errorText = wrapper.find('#authErrorMessage');

      expect(errorText.render().text()).toContain(initialProps.authErrorMessage);
    });

    it('should show forgot password modal', () => {
      // Prep
      const forgotPasswordButton = wrapper.find('#forgotPasswordButton');
      const forgotPasswordButtonText = wrapper.find('#forgotPasswordButtonText');

      // Execute
      expect(forgotPasswordButtonText.render().text()).toBe('AUTH_MODULE.FORGOT_PASSWORD');
      forgotPasswordButton.simulate('press');
      const state = wrapper.state();

      // Expected
      expect(state.showForgotPasswordWebView).toBeTruthy();
    });

    it('should hide forgot password modal', () => {
      // Prep
      const forgotPasswordButton = wrapper.find('#forgotPasswordButton');
      forgotPasswordButton.simulate('press');
      const closeForgotPasswordButton = wrapper.find('#closeForgotPasswordButton');
      const closeForgotPasswordButtonText = wrapper.find('#closeForgotPasswordButtonText');

      // Execute
      expect(closeForgotPasswordButtonText.render().text()).toBe('AUTH_MODULE.CLOSE');
      closeForgotPasswordButton.simulate('press');
      const state = wrapper.state();

      // Expected
      expect(state.showForgotPasswordWebView).toBeFalsy();
    });
  });

  describe('Logged in screen', () => {
    beforeEach(() => {
      initialProps.userLoggedIn = true;
      initialProps.userInManagement = 'John Smith';
      wrapper = shallow(<Component {...initialProps} />).dive();
    });

    it('should show welcome, name and image', () => {
      const welcomeText = wrapper;
      const image = wrapper.find('Image');
      const logoutButton = wrapper.find('#logoutButton');

      expect(welcomeText).toBeTruthy();
      expect(logoutButton).toBeTruthy();
      expect(image).toBeTruthy();

      const text = welcomeText.render().text();
      expect(text).toContain('AUTH_MODULE.WELCOME');
      expect(text).toContain(initialProps.userInManagement);
      expect(logoutButton.props().title).toBe('AUTH_MODULE.LOG_OUT');
    });

    it('should dispatch logout action', () => {
      // Prep
      const logoutButton = wrapper.find('#logoutButton');
      // Execute
      logoutButton.simulate('press');
      // Expected
      expect(logoutAction).toBeCalledTimes(1);
    });

    it('should trigger trackEvent on', () => {
      // Prep
      const event = { buttonId: SETTINGS_BUTTON_ID };
      // Execute
      wrapper.instance().navigationButtonPressed(event);
      // Expected
      expect(trackEvent).toBeCalledTimes(1);
      expect(trackEvent).toHaveBeenCalledWith(AnalyticsEvents.PRESS_SETTINGS_COG);
      expect(mockMergeOptions).toBeCalledTimes(2);
    });
  });

  describe('EnvironmentPickerComponent', () => {
    it('should shallow render', () => {
      shallow(<Component {...initialProps} />);
    });

    it('should hide the environment picker when showEnvironmentSelector is false', () => {
      const loginComponent = shallow(<Component {...initialProps} />).dive();
      loginComponent.setState({ environment: 'dev', showEnvironmentSelector: false });
      const pickerWrapper = loginComponent.find('#environmentPicker');
      expect(pickerWrapper).toHaveLength(0);
    });

    it('should show the environment picker when showEnvironmentSelector is true', () => {
      const loginComponent = shallow(<Component {...initialProps} />).dive();
      loginComponent.setState({ environment: 'dev', showEnvironmentSelector: true });
      const pickerWrapper = loginComponent.find('#environmentPicker');
      expect(pickerWrapper).toHaveLength(1);
    });
  });
});
