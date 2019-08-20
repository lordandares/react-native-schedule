import React from 'react';
import { shallow } from 'enzyme';
import EnvironmentPickerComponent from './EnvironmentPickerComponent';

describe('EnvironmentPickerComponent', () => {
  it('should shallow render', () => {
    shallow(<EnvironmentPickerComponent />);
  });

  it('should set the selected value in state when environment is changed', () => {
    const spy = jest.fn();
    const tree = shallow(<EnvironmentPickerComponent onEnvironmentChange={spy} />);
    tree.find('Picker').simulate('ValueChange', 'yo');
    expect(tree.state().value).toBe('yo');
  });

  it('should default to test when environment is test', () => {
    const tree = shallow(<EnvironmentPickerComponent environment="test" />);
    const picker = tree.find('Picker');
    expect(picker.props().selectedValue).toBe('test');
  });

  it('should default to dev when environment is dev', () => {
    const tree = shallow(<EnvironmentPickerComponent environment="dev" />);
    const picker = tree.find('Picker');
    expect(picker.props().selectedValue).toBe('dev');
  });

  it('should default to prod when environment is prod', () => {
    const tree = shallow(<EnvironmentPickerComponent environment="dev" />);
    const picker = tree.find('Picker');
    expect(picker.props().selectedValue).toBe('dev');
  });
});
