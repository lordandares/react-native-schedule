import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingScreen = () => (
  <View
    style={{
      backgroundColor: 'black',
      opacity: 0.3,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
    }}
  >
    <ActivityIndicator size="large" />
  </View>
);

export default LoadingScreen;
