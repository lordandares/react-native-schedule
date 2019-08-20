// @flow
import React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import type { TouchableProps } from './Touchable.types';

const isAndroid = (): boolean => Platform.OS === 'android';

const Touchable = (props: TouchableProps) => {
  if (isAndroid()) {
    return (
      <TouchableNativeFeedback onPress={props.onPress} {...props}>
        {props.children}
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableOpacity onPress={props.onPress} {...props}>
      {props.children}
    </TouchableOpacity>
  );
};

export default Touchable;
