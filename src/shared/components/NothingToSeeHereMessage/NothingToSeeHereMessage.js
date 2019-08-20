/* eslint-disable global-require */
import React from 'react';
import { View, Text, Image } from 'react-native';
import { withNamespaces } from 'react-i18next';

import NothingToSeeHereMessageStyles from './NothingToSeeHereMessage.styles';
import { withStyles } from '../../withStyles';

import NOTHING from './constants/NothingToSeeHereMessage';


type Props = {
  styles: Object,
  t: Object,
};

const NothingToSeeHereMessage = ({ styles, t: translate }: Props) => (
  <View style={styles.container}>
    <Text style={styles.info}>{translate(NOTHING.TO_SEE_HERE)}</Text>
    <Image source={require('./rosieFull.png')} style={styles.image} />
  </View>
);

export default
withStyles(NothingToSeeHereMessageStyles, {
  themePropName: 'withStylesTheme',
})(withNamespaces()(NothingToSeeHereMessage));
