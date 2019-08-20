import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import moment from 'moment-timezone';
import { Navigation } from 'react-native-navigation';
import { withNamespaces } from 'react-i18next';

import { withStyles } from '../../../../shared/withStyles';
import { isRepeating } from '../../../../shared/utils/shift/shiftType';
import WebViewQuillEditor from '../../../../shared/components/WebViewQuillEditor/WebViewQuillEditor';
import {
  ShiftInstructionsComponentProps,
  ShiftInstructionsComponentState,
} from './ShiftInstructionsComponent.types';
import ShiftInstructionsComponentStyles from './ShiftInstructionsComponent.styles';
import Touchable from '../../../../shared/components/Touchable/Touchable';
import { getAppBarStyle } from '../../../../shared/navigation/getAppBarStyle';
import theme from '../../../../shared/theme';
import AnalyticsEvents from '../../../../shared/constants/analyticsEvents';

import COMMON from '../../../../shared/constants/common';
import SHIFT_INSTRUCTIONS_COMPONENT from '../../constants/ShiftInstructionsComponent';

class ShiftInstructionsComponent extends Component<ShiftInstructionsComponentProps,
  ShiftInstructionsComponentState,
  > {
  static options = getAppBarStyle(theme)
  constructor(props: ShiftInstructionsComponentProps) {
    super(props);
    this.state = { instructions: this.props.scheduleState.selectedShift.instructions };
  }

  onDeltaChangeCallback = (payload) => {
    this.setState({ instructions: payload.html });
  };

  onSave = async () => {
    const { t: translate } = this.props;
    let ret;
    if (isRepeating(this.props.scheduleState.selectedShift.shiftType)) {
      ret = await this.props.updateRepeatingShift({
        shift: {
          ...this.props.scheduleState.selectedShift,
          instructions: this.state.instructions,
        },
        allFutureShifts: !this.props.scheduleState.justThisShift,
        returnBoundaryStart: moment().add(-15, 'hours'),
        returnBoundaryEnd: moment().add(15, 'hours'),
      });
    } else {
      ret = await this.props.updateShift({
        ...this.props.scheduleState.selectedShift,
        instructions: this.state.instructions,
      });
    }
    if (ret) {
      this.props.trackEvent(AnalyticsEvents.SET_INSTRUCTIONS);
      this.goBack();
    } else {
      Alert.alert(
        translate(COMMON.ERROR).toUpperCase(),
        translate(SHIFT_INSTRUCTIONS_COMPONENT.INSTRUCTIONS_WHERE_NOT_SAVED),
      );
    }
  };

  goBack = () => Navigation.pop(this.props.componentId);

  render() {
    const {
      scheduleState: { selectedShift: shift }, styles, withStylesTheme, t: translate,
    } = this.props;
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text id="instructions-title" style={styles.headerText}>{translate(COMMON.INSTRUCTIONS)}</Text>
          <Touchable onPress={this.onSave}>
            <Text style={styles.headerAction}>{translate(COMMON.DONE)}</Text>
          </Touchable>
        </View>
        <WebViewQuillEditor
          // eslint-disable-next-line
          ref={component => (this.webViewQuillEditor = component)}
          onDeltaChangeCallback={this.onDeltaChangeCallback}
          backgroundColor={withStylesTheme.palette.white}
          htmlContentToDisplay={shift.instructions}
        />
      </View>
    );
  }
}

export default withStyles(
  ShiftInstructionsComponentStyles,
  { themePropName: 'withStylesTheme' },
)(withNamespaces()(ShiftInstructionsComponent));
