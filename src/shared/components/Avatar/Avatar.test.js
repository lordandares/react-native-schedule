import React from 'react';
import UserAvatar from 'react-native-user-avatar';
import { shallow } from 'enzyme';
import Avatar from './Avatar';
import CustomIcon from '../../../shared/customIcons/NextIcons';

describe('Avatar', () => {
  it('should show unassigned avatar when name is not supplied', () => {
    const avatar = shallow(<Avatar />);
    const icon = avatar.find(CustomIcon);
    expect(icon.length).toBe(1);
  });

  it('should not show initials avatar when name is not supplied', () => {
    const avatar = shallow(<Avatar />);
    const initialsAvatar = avatar.find(UserAvatar);
    expect(initialsAvatar.length).toBe(0);
  });

  it('should show initials avatar when name is supplied', () => {
    const avatar = shallow(<Avatar name="JP" />);
    const initialsAvatar = avatar.find(UserAvatar);
    expect(initialsAvatar.length).toBe(1);
  });

  it('should not show unassigned avatar when name is supplied', () => {
    const avatar = shallow(<Avatar name="JP" />);
    const icon = avatar.find(CustomIcon);
    expect(icon.length).toBe(0);
  });
});
