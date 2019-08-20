// @flow
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment-timezone';
import { truncate, isEqual, findIndex } from 'lodash';
import { withNamespaces } from 'react-i18next';

import { ClockEventTypes } from '../../types/schedule.types';
import shiftListItemComponentStyles from './ShiftListItemComponent.style';
import { withStyles } from '../../withStyles';
import type { Shift } from '../../types/schedule.types';
import { CanClockInValidator } from './CanClockInValidator';
import { CanClockOutValidator } from './CanClockOutValidator';
import { ShiftCompletionCalculator } from './ShiftCompletionCalculator';
import CustomIcon from '../../customIcons/NextIcons';
import Avatar from '../Avatar/Avatar';
import { isRepeating } from '../../utils/shift/shiftType';
import type { IShiftAssignmentCalculator } from './IShiftAssignmentCalculator';
import { ShiftAssignmentCalculator } from './ShiftAssignmentCalculator';
import Touchable from '../Touchable/Touchable';
import { roundToDecimal, sumHours, calculateTotalHours } from '../../utils/clockInOut/clockInOutHelpers';
import { ICanClockInValidator } from './ICanClockInValidator';
import { ICanClockOutValidator } from './ICanClockOutValidator';
import COMMON from '../../constants/common';
import CompanyTime from '../DateTime/CompanyTime';

type Props = {
  shift: Shift,
  styles: any,
  theme: any,
  exception: boolean,
  clockIn(shift: Shift): void,
  clockOut(shift: Shift): void,
  onPressItem(shift: Shift): void,
};

class ShiftListItemComponent extends Component<Props> {
  /**
   * @deprecated Don't do this, string should be ellipsized by the view it self based on available space
   */
  static TruncateStringWithEllipsis = (value: string, length: number): string => truncate(value, { length });

  static isShiftActive = (referenceTime: moment, startTime: moment, endTime: moment): boolean =>
    referenceTime.isBetween(startTime, endTime, null, '[)');

  constructor(props: Props) {
    super(props);
    this.state = this.calculateShiftState();
    this.state.clockButtonEnabled = true;
  }

  componentDidMount() {
    this.timerId = setInterval(() => {
      this.updateShiftState();
    }, 1000);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.shift, this.props.shift)) {
      this.updateShiftState();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  onPressItem = () => {
    this.props.onPressItem(this.props.shift);
  };

  getDisplayName = (shift: any) => shift.users.length > 0 && `${shift.users[0].firstName} ${shift.users[0].lastName}`;

  canClockInValidator: ICanClockInValidator;
  canClockOutValidator: ICanClockOutValidator;
  shiftCompletionCalculator: IShiftAssignmentCalculator;
  shiftAssignmentCalculator: IShiftAssignmentCalculator;

  calculateShiftState = () => {
    this.canClockInValidator = new CanClockInValidator(this.props.shift);
    this.canClockOutValidator = new CanClockOutValidator(this.props.shift);
    this.shiftCompletionCalculator = new ShiftCompletionCalculator(this.props.shift);
    this.shiftAssignmentCalculator = new ShiftAssignmentCalculator(this.props.shift);
    const state = {
      isActive: ShiftListItemComponent.isShiftActive(moment(), this.props.shift.start, this.props.shift.end),
      canClockIn: !!this.props.clockIn && this.canClockInValidator.canClockIn(),
      canClockOut: !!this.props.clockOut && this.canClockOutValidator.canClockOut(),
      canSeeComplete: this.shiftCompletionCalculator.isComplete(),
      canSeeIncomplete: this.shiftCompletionCalculator.isIncomplete(),
      isAssigned: this.shiftAssignmentCalculator.isAssigned(),
    };
    if ((this.state && this.state.canClockIn !== state.canClockIn)
    || (this.state && this.state.canClockOut !== state.canClockOut)) {
      state.clockButtonEnabled = true;
    }
    return state;
  };

  updateShiftState = () => {
    const newState = this.calculateShiftState();
    if (!isEqual(newState, this.state)) {
      this.setState(newState);
    }
  };

  clockIn = () => {
    this.setState({ clockButtonEnabled: false });
    this.props.clockIn(this.props.shift);
  };

  clockOut = () => {
    this.setState({ clockButtonEnabled: false });
    this.props.clockOut(this.props.shift);
  };

  renderAvatar = () => {
    const name = this.getDisplayName(this.props.shift);
    return (
      <View>
        <View style={this.props.styles.avatarContainer}>
          <Avatar
            size={36}
            name={name}
            color={this.props.theme.palette.grey[400]}
            emptyColor={this.props.theme.palette.error.main}
          />
        </View>
      </View>
    );
  }

  renderName = () => (
    <Text id="shift-list-item-name" ellipsizeMode="tail" numberOfLines={1} style={this.props.styles.title}>
      {this.getDisplayName(this.props.shift)}
    </Text>
  );

  renderRightSideExceptions = () => {
    const { styles, shift, shift: { clockEvents } }: Props = this.props;
    const { isActive } = this.state;
    const hoursWorked: number = roundToDecimal(sumHours(clockEvents));
    const totalHours: number = calculateTotalHours(shift.shiftType, shift.start, shift.end, shift.budgetedHours);
    const isMatchingHours: boolean =
      totalHours < hoursWorked || findIndex(clockEvents, { eventType: ClockEventTypes.ClockIn }) === -1;
    const styledRed: any = isMatchingHours ? styles.displayRed : null;

    return (
      <View style={[styles.rightContainer, isActive ? styles.activeTime : null]}>
        <Text style={[styles.hoursDescription, styledRed]} id="display-hours">
          {`${hoursWorked} / ${totalHours} hrs`}
        </Text>
      </View>
    );
  };

  renderRightSide = () => {
    const { styles, shift }: Props = this.props;
    const { t: translate } = this.props;
    const clockInTitle: string = translate(COMMON.CLOCK_IN);
    const clockOutTitle: string = translate(COMMON.CLOCK_OUT);
    const completeText: string = translate(COMMON.COMPLETE);
    const incompleteText: string = translate(COMMON.INCOMPLETE);

    return (
      <View>
        {this.state.canClockIn && this.state.clockButtonEnabled && (
          <View style={styles.clockButtonView}>
            <TouchableOpacity
              id={`shift-list-item-clockin-${shift.id}`}
              style={styles.clockInButton}
              onPress={this.clockIn}
            >
              <Text style={styles.clockInButtonText}>{clockInTitle}</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.canClockOut && this.state.clockButtonEnabled && (
          <View style={styles.clockButtonView}>
            <TouchableOpacity
              id={`shift-list-item-clockout-${shift.id}`}
              style={styles.clockOutButton}
              onPress={this.clockOut}
            >
              <Text style={styles.clockOutButtonText}>{clockOutTitle}</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.canSeeComplete && (
          <View style={styles.textCompleteView}>
            <Text id={`shift-list-item-complete-text-${shift.id}`} style={styles.completeText}>
              {completeText}
            </Text>
          </View>
        )}
        {this.state.canSeeIncomplete && (
          <View style={styles.textCompleteView}>
            <Text id={`shift-list-item-incomplete-text-${shift.id}`} style={styles.completeText}>
              {incompleteText}
            </Text>
          </View>
        )}
      </View>
    );
  };

  renderIcon = (id, name, size, color, styles) => (
    <CustomIcon id={id} name={name} size={size} color={color} style={styles} />
  );

  render() {
    const {
      styles, shift, exception, theme: { palette },
    }: Props = this.props;

    const truncatedSiteName: string = shift
      ? ShiftListItemComponent.TruncateStringWithEllipsis(shift.siteName, 25)
      : '';
    const truncatedServiceName: string = shift
      ? ShiftListItemComponent.TruncateStringWithEllipsis(shift.serviceName, 25)
      : '';

    return (
      <Touchable onPress={this.onPressItem} useForeground>
        <View style={this.state.isActive ? styles.activeContainer : styles.container}>
          <View style={styles.leftContainer}>
            {this.renderAvatar()}
            <View style={styles.textsContainer}>
              {exception && this.renderName()}
              <View id="formatted-time-day" style={styles.hoursTextContainer}>
                <Text style={styles.hoursText} numberOfLines={1}>
                  <CompanyTime
                    id="formatted-time-day-prefix"
                    value={shift.start}
                  />
                  -
                  <CompanyTime
                    id="formatted-time-tz-suffix"
                    value={shift.end}
                    showTimeZone
                    timeZone={shift.siteTimeZone}
                  />
                </Text>
                {isRepeating(shift.shiftType) &&
                  this.renderIcon('repeating-icon', 'repeating', 16, palette.secondary.dark, styles.repeatingIcon)}
              </View>
              <View style={exception ? styles.containerExceptionName : null}>
                <Text style={styles.locationText} numberOfLines={1}>
                  {truncatedSiteName}
                </Text>
                {exception &&
                  this.renderIcon('icon-circle-filled', 'circlefilled', 6, palette.text.secondary, styles.lineCircle)}
                <Text style={styles.locationText}>{truncatedServiceName}</Text>
              </View>
            </View>
          </View>
          {exception ? this.renderRightSideExceptions() : this.renderRightSide()}
        </View>
      </Touchable>
    );
  }
}

export default withStyles(shiftListItemComponentStyles)(withNamespaces()(ShiftListItemComponent));
