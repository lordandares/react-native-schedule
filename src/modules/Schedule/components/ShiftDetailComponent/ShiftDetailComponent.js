// @flow
import React, { Component } from 'react';
import moment from 'moment-timezone';
import { View, ScrollView, Text, FlatList, WebView, TouchableOpacity } from 'react-native';
import type { ClockInRecord, ClockOutRecord } from '@next/schedule/types/timekeeping.types';
import { isEqual, differenceBy } from 'lodash';
import { Navigation } from 'react-native-navigation';
import { withNamespaces } from 'react-i18next';

import { withStyles } from '../../../../shared/withStyles';
import { SCREEN_LOADING_SHIFTS } from '../../../../shared/constants/screens';
import ShiftDetailComponentStyles from './ShiftDetailComponent.styles';
import { ShiftDetailComponentProps } from './ShiftDetailComponent.types';
import CoverageListItem from '../../../../shared/components/CoverageListItem/CoverageListItem';
import FlatListItemSeparator from '../../../../shared/components/FlatListItemSeparator/FlatListItemSeparatorComponent';
import { ICanClockInValidator } from '../../../../shared/components/ShiftListItem/ICanClockInValidator';
import { ICanClockOutValidator } from '../../../../shared/components/ShiftListItem/ICanClockOutValidator';
import { CanClockInValidator } from '../../../../shared/components/ShiftListItem/CanClockInValidator';
import { CanClockOutValidator } from '../../../../shared/components/ShiftListItem/CanClockOutValidator';
import type { User, Shift } from '../../../../shared/types/schedule.types';
import Touchable from '../../../../shared/components/Touchable/Touchable';
import formatStartEndShift from '../../../../shared/utils/shift/shiftTimesFormatter';
import hasPermissionsForShift from '../../../../shared/utils/shift/shiftPermission';
import { getAppBarStyle } from '../../../../shared/navigation/getAppBarStyle';
import userCanDo, { EDIT_SHIFT } from '../../../../shared/auth/utils/canUserDo';
import UserClockEvents from '../../../../shared/components/UserClockEvents/UserClockEvents';
import theme from '../../../../shared/theme';
import { isShiftOffered } from '../../../../shared/utils/shift/shiftType';

import COMMON from '../../../../shared/constants/common';
import SHIFT_DETAIL_COMPONENT from '../../constants/ShiftDetailComponent';

class ShiftDetailComponent extends Component<ShiftDetailComponentProps> {
  static options = getAppBarStyle(theme);

  constructor(props: ShiftDetailComponentProps) {
    super(props);
    const { authUser, scheduleState: { selectedShift } } = props;
    this.state = {
      canClockIn: false,
      canClockOut: false,
      clockButtonEnabled: true,
    };

    if (!hasPermissionsForShift(selectedShift, authUser) && !isShiftOffered(selectedShift)) {
      Navigation.pop(this.props.componentId);
    }
  }

  componentDidMount() {
    const { authUser, scheduleState: { selectedShift } } = this.props;
    this.updateShiftState(selectedShift, authUser);
  }

  componentWillReceiveProps(nextProps) {
    const { scheduleState: { selectedShift } } = this.props;
    const { loading } = selectedShift;
    const nextSelectedShift = nextProps.scheduleState.selectedShift;

    if (
      nextSelectedShift.clockEvents.length !== selectedShift.clockEvents.length ||
      differenceBy(nextSelectedShift.users, selectedShift.users, 'id')
    ) {
      this.updateShiftState(nextSelectedShift, nextProps.authUser);
    }

    if (loading !== nextProps.scheduleState.loading) {
      if (nextProps.scheduleState.loading) {
        nextProps.showOverlay(SCREEN_LOADING_SHIFTS);
      } else {
        nextProps.dismissOverlay(SCREEN_LOADING_SHIFTS);
      }
    }
  }

  onPressCard = () => {
    const { authUser, timeFormat, shortDateFormat } = this.props;
    if (!userCanDo(EDIT_SHIFT, authUser)) {
      return;
    }
    const shift = this.props.scheduleState.selectedShift;
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ShiftCoverage',
        passProps: { scheduleState: this.props.scheduleState },
        options: {
          topBar: {
            title: {
              text: `${shift.siteName} - ${shift.serviceName}`,
            },
            subtitle: {
              text: formatStartEndShift(shift.start, shift.end, shift.siteTimeZone, true, timeFormat, shortDateFormat),
            },
          },
        },
      },
    });
  };

  onPressInstructions = () => {
    const { authUser, timeFormat, shortDateFormat } = this.props;
    if (!userCanDo(EDIT_SHIFT, authUser)) {
      return;
    }
    const shift = this.props.scheduleState.selectedShift;
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ShiftInstructions',
        passProps: { scheduleState: this.props.scheduleState },
        options: {
          topBar: {
            title: {
              text: `${shift.siteName} - ${shift.serviceName}`,
            },
            subtitle: {
              text: formatStartEndShift(shift.start, shift.end, shift.siteTimeZone, true, timeFormat, shortDateFormat),
            },
          },
        },
      },
    });
  };

  onPressClock = () => {
    const { timeFormat, shortDateFormat } = this.props;
    const shift = this.props.scheduleState.selectedShift;

    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'ClockInOutEditComponent',
              options: {
                topBar: {
                  title: {
                    text: `${shift.siteName} - ${shift.serviceName}`,
                  },
                  subtitle: {
                    text: formatStartEndShift(
                      shift.start,
                      shift.end,
                      shift.siteTimeZone,
                      true,
                      timeFormat,
                      shortDateFormat,
                    ),
                  },
                },
              },
            },
          },
        ],
      },
    });
  };

  updateShiftState = (shift, authUser) => {
    const newState = this.calculateShiftState(shift, authUser);
    if (!isEqual(newState, this.state)) {
      this.setState(newState);
    }
  };

  calculateShiftState = (shift, authUser) => {
    let isClockInOutUserVerified = false;
    if (authUser && shift.users.length > 0) {
      isClockInOutUserVerified = shift.users.find(user => user.id === authUser.userId);
    }
    this.canClockInValidator = new CanClockInValidator(shift);
    this.canClockOutValidator = new CanClockOutValidator(shift);
    const state = {
      canClockIn: this.canClockInValidator.canClockIn() && isClockInOutUserVerified,
      canClockOut: this.canClockOutValidator.canClockOut() && isClockInOutUserVerified,
      clockButtonEnabled: true,
    };
    return state;
  };

  createClockRecord = (shift: Shift, userId: string) => ({
    eventTime: moment().toDate(),
    userId,
    siteId: shift.siteId ? shift.siteId : '',
    serviceId: shift.serviceId ? shift.serviceId : '',
    shiftId: shift.id ? shift.id : '',
  });

  canClockInValidator: ICanClockInValidator;
  canClockOutValidator: ICanClockOutValidator;

  clockIn = () => {
    this.setState({ clockButtonEnabled: false });
    this.props.showOverlay(SCREEN_LOADING_SHIFTS);
    const clockInRecord: ClockInRecord = this.createClockRecord(
      this.props.scheduleState.selectedShift,
      this.props.authUser.userId,
    );
    this.props.requestClockIn(clockInRecord);
  };

  clockOut = () => {
    this.setState({ clockButtonEnabled: false });
    this.props.showOverlay(SCREEN_LOADING_SHIFTS);
    const clockOutRecord: ClockOutRecord = this.createClockRecord(
      this.props.scheduleState.selectedShift,
      this.props.authUser.userId,
    );
    this.props.requestClockOut(clockOutRecord);
  };

  renderItem = (user: any) => <CoverageListItem user={user.item} onPressItem={this.onPressCard} />;

  renderUserList = (users: User[]) =>
    (users.length ? (
      <FlatList
        data={users}
        renderItem={(user: User) => this.renderItem(user)}
        keyExtractor={(item: User) => item.id}
        ItemSeparatorComponent={FlatListItemSeparator}
        style={this.props.styles.contentContainer}
      />
    ) : (
      <CoverageListItem onPressItem={this.onPressCard} />
    ));

  renderButtonClockInOut = () => {
    const { scheduleState: { selectedShift: shift }, styles, t: translate }: ShiftDetailComponentProps = this.props;
    const clockInTitle: string = translate(SHIFT_DETAIL_COMPONENT.CLOCK_IN);
    const clockOutTitle: string = translate(SHIFT_DETAIL_COMPONENT.CLOCK_OUT);

    return (
      <View>
        {this.state.canClockIn && (
          <View style={styles.clockButtonView}>
            <TouchableOpacity
              id={`shift-item-clockin-${shift.id}`}
              style={styles.clockInButton}
              onPress={this.clockIn}
              disabled={!this.state.clockButtonEnabled}
            >
              <Text style={styles.clockInButtonText}>{clockInTitle}</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.state.canClockOut && (
          <View style={styles.clockButtonView}>
            <TouchableOpacity
              id={`shift-item-clockout-${shift.id}`}
              style={styles.clockOutButton}
              onPress={this.clockOut}
              disabled={!this.state.clockButtonEnabled}
            >
              <Text style={styles.clockOutButtonText}>{clockOutTitle}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  render() {
    const {
      scheduleState: { selectedShift: shift },
      styles,
      t: translate,
      timeFormat,
      authUser: { userRole },
    } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.wrapper}>
          <View style={styles.header}>
            <Text id="coverage-title" style={styles.headerText}>
              {translate(SHIFT_DETAIL_COMPONENT.COVERAGE).toUpperCase()}
            </Text>
          </View>
          <View style={styles.usersClockinContainer}>
            {shift.users && this.renderUserList(shift.users)}
            <Touchable testID="clock-event-touchable" onPress={this.onPressClock} disabled={userRole === 'User'}>
              <View>
                <UserClockEvents
                  clockEvents={shift.clockEvents && shift.clockEvents}
                  exceptions={shift.clockExceptions}
                  siteTimeZone={shift.siteTimeZone}
                  shiftStart={shift.start}
                  shiftEnd={shift.end}
                  shiftType={shift.shiftType}
                  shiftDuration={shift.budgetedHours}
                  timeFormat={timeFormat}
                />
              </View>
            </Touchable>
          </View>
          <View style={styles.header}>
            <Text id="instructions-title" style={styles.headerText}>
              {translate(COMMON.INSTRUCTIONS).toUpperCase()}
            </Text>
          </View>
          <Touchable onPress={this.onPressInstructions}>
            <View style={[styles.contentContainer, styles.instructionsContainer]}>
              <WebView
                id="webViewInstructions"
                source={{ html: shift.instructions }}
                style={styles.instructionsContent}
                bounces={false}
                scalesPageToFit={false}
              />
            </View>
          </Touchable>
          <View style={styles.header}>
            <Text style={styles.headerText}>{translate(COMMON.NOTES).toUpperCase()}</Text>
          </View>
          {this.renderButtonClockInOut()}
        </ScrollView>
      </View>
    );
  }
}
const styleThemeOptions = { themePropName: 'withStylesTheme' };
const ShiftDetailComponentWithTranslation = withNamespaces()(ShiftDetailComponent);
const withStylesFactory = withStyles(ShiftDetailComponentStyles, styleThemeOptions);
export default withStylesFactory(ShiftDetailComponentWithTranslation);
