/* eslint-disable global-require, max-len */
import React from 'react';
import { View, Text, Image } from 'react-native';

import InfoRosieMessageStyles from './InfoRosieMessage.styles';
import { withStyles } from '../../withStyles';

const InfoRosieMessage = ({ text, styles }) => (
  <View>
    <Image source={require('./rosie.png')} style={styles.image} />
    <Text style={styles.info}>{text}</Text>
  </View>
);

export default withStyles(InfoRosieMessageStyles, { themePropName: 'withStylesTheme' })(InfoRosieMessage);
