// @flow
import React from 'react';
import _ from 'lodash';
import UserAvatar from 'react-native-user-avatar';
import type { AvatarProps } from './Avatar.types';
import CustomIcon from '../../../shared/customIcons/NextIcons';

const Avatar = (props: AvatarProps) =>
  (props.name ? (
    <UserAvatar size={props.size} name={_.toUpper(props.name)} color={props.color} />
  ) : (
    <CustomIcon name="avatar" size={props.size} color={props.emptyColor} />
  ));

export default Avatar;
