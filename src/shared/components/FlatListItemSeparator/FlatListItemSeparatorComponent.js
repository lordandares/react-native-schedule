// @flow
import React from 'react';
import { View } from 'react-native';

import shiftListItemComponentStyles from './FlatListItemSeparatorComponent.style';
import { withStyles } from '../../withStyles';

type Props = {
  styles: any,
}

const FlatListItemSeparator = ({ styles }: Props) => (
  <View
    style={styles.separator}
  />
);

export default withStyles(shiftListItemComponentStyles)(FlatListItemSeparator);
