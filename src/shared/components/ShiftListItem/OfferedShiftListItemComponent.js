import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment-timezone';
import { withNamespaces } from 'react-i18next';

import { withStyles } from '../../withStyles';
import componentStyles from './OfferedShiftListItemComponent.styles';
import Touchable from '../Touchable/Touchable';
import COMMON from '../../constants/common';

class OfferedShiftListItem extends React.Component {
  onPressItem = () => {
    this.props.onPressItem(this.props.shift);
  };

  onPressAccept = () => {
    this.props.acceptShift(this.props.shift.id);
  }

  renderTextsContainer() {
    const { styles, timeFormat } = this.props;
    const formattedStart: string = this.props.shift
      ? moment(this.props.shift.start).format(timeFormat)
      : '';
    const formattedEnd: string = this.props.shift
      ? moment(this.props.shift.end).format(timeFormat)
      : '';

    return (
      <View style={styles.textsContainer}>
        <View style={styles.hoursTextContainer}>
          <Text style={styles.subtitle}>
            {formattedStart} - {formattedEnd}
          </Text>
        </View>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.locationText} >
          {this.props.shift.siteName}
        </Text>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.locationText} >
          {this.props.shift.serviceName}
        </Text>
      </View>
    );
  }

  render() {
    const { styles, t: translate } = this.props;

    return (
      <Touchable onPress={this.onPressItem}>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            {this.renderTextsContainer()}
          </View>
          <View style={styles.rightContainer}>
            <TouchableOpacity
              onPress={this.onPressAccept}
              style={styles.acceptButton}
            >
              <Text style={styles.acceptButtonText}>
                {translate(COMMON.ACCEPT)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Touchable>);
  }
}

export default withStyles(componentStyles)(withNamespaces()(OfferedShiftListItem));

