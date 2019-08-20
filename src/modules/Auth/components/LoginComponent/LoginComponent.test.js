import React from 'react';
import { shallow } from 'enzyme';
import LoginComponent from './LoginComponent';

jest.mock('appcenter', () => ({
  getInstallId: jest.fn(),
  AppCenterReactNative: {},
}));

jest.mock('appcenter/appcenter-log', () => ({
  AppCenterReactNative: {},
}));

describe('EnvironmentPickerComponent', () => {
  it('should shallow render', () => {
    shallow(<LoginComponent />);
  });

  it('should hide the environment picker when showEnvironmentSelector is false', () => {
    const loginComponent = shallow(<LoginComponent />).dive();
    loginComponent.setState({ environment: 'dev', showEnvironmentSelector: false });
    const pickerWrapper = loginComponent.find('#environmentPicker');
    expect(pickerWrapper).toHaveLength(0);
  });

  it('should show the environment picker when showEnvironmentSelector is true', () => {
    const loginComponent = shallow(<LoginComponent />).dive();
    loginComponent.setState({ environment: 'dev', showEnvironmentSelector: true });
    const pickerWrapper = loginComponent.find('#environmentPicker');
    expect(pickerWrapper).toHaveLength(1);
  });
});
