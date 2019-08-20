// @flow
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import moment from 'moment-timezone';
import { findIndex } from 'lodash';
import Immutable from 'seamless-immutable';
import { Navigation } from 'react-native-navigation';
import { withNamespaces } from 'react-i18next';

import ClockTime from '../../../../../shared/components/ClockTime/ClockTime';
import Touchable from '../../../../../shared/components/Touchable/Touchable';
import { ClockEventTypes } from '../../../../../shared/types/schedule.types';
import { withStyles } from '../../../../../shared/withStyles';
import ClockInOutEditComponentStyles from './ClockInOutEditComponent.styles';
import { roundToDecimal, sumHours } from '../../../../../shared/utils/clockInOut/clockInOutHelpers';
import { getAppBarStyle } from '../../../../../shared/navigation/getAppBarStyle';
import theme from '../../../../../shared/theme';
import IconLoader from '../../../../../shared/utils/IconLoader';
import AnalyticsEvents from '../../../../../shared/constants/analyticsEvents';
import COMMON from '../../../../../shared/constants/common';

const renderClockTime = (index, clockEvent, siteTimeZone, styles, onDateChange) => (
  <ClockTime
    key={clockEvent.id}
    index={index}
    clockEvent={clockEvent}
    siteTimeZone={siteTimeZone}
    listStyles={styles}
    onDateChange={onDateChange}
  />
);

const displayTime = (clockEvents, shift, styles, translate) => {
  const hoursWorked: number = roundToDecimal(sumHours(clockEvents));
  const totalHours: number = roundToDecimal(moment.duration(moment(shift.end).diff(moment(shift.start))).asHours());
  const isMatchingHours: boolean =
    totalHours < hoursWorked || findIndex(clockEvents, { eventType: ClockEventTypes.ClockIn }) === -1;
  const styledRed: any = isMatchingHours ? styles.displayRed : null;
  return (
    <View style={styles.totalWrapper}>
      <Text style={[styles.title, styledRed]}>{translate(COMMON.TOTAL).toUpperCase()}</Text>
      <Text style={[styles.hoursDescription, styledRed]} id="display-hours">
        {`${hoursWorked} / ${totalHours} `}{translate(COMMON.HRS)}
      </Text>
    </View>
  );
};

class ClockInOutEditComponent extends Component {
  static options = getAppBarStyle(theme)

  constructor(props) {
    super(props);

    this.state = {
      clockEvents: this.props.shift.clockEvents,
    };

    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    const iconLoader = new IconLoader();
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: [
          {
            id: 'close',
            icon: iconLoader.getIcon('close'),
            color: ClockInOutEditComponent.options.topBar.rightButtons[0].color,
          },
        ],
      },
    });
  }

  onDateChange = (date, clockEvent) => {
    const eventTime = moment(clockEvent.eventTime)
      .tz(this.props.shift.siteTimeZone)
      .hours(moment(date, ['hh:mm A']).format('HH'))
      .minutes(moment(date, ['hh:mm A']).format('mm'));
    const formattedEventTime = eventTime.utc().format();

    const editedClockEvents = this.state.clockEvents.map((ce) => {
      if (ce.id === clockEvent.id) {
        const mutableEvent = Immutable.asMutable(ce, { deep: true });
        mutableEvent.eventTime = formattedEventTime;
        return mutableEvent;
      }
      return ce;
    });

    this.setState({
      clockEvents: editedClockEvents,
    });
  };

  onSave = () => {
    const patchClockEvents = this.state.clockEvents.map(event => ({
      id: event.id,
      eventTime: event.eventTime,
    }));
    this.props.editClockEvents(this.props.shift.id, patchClockEvents);
    Navigation.dismissModal(this.props.componentId);
    this.props.trackEvent(AnalyticsEvents.SET_TIMEKEEPING_EVENT);
  };

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'close') {
      Navigation.dismissModal(this.props.componentId);
    }
  }

  render() {
    return (
      <View style={this.props.styles.wrapper}>
        {this.props.shift &&
          this.props.shift.clockEvents &&
          this.props.shift.siteTimeZone && (
            <ScrollView style={this.props.styles.scrollViewWrapper}>
              <View style={this.props.styles.paddingWrapper}>
                {this.state.clockEvents.map((clock, index) =>
                  renderClockTime(index, clock, this.props.shift.siteTimeZone, this.props.styles, this.onDateChange))}
                {displayTime(this.state.clockEvents, this.props.shift, this.props.styles, this.props.t)}
              </View>
            </ScrollView>
          )}
        <View style={this.props.styles.saveButtonContainer}>
          <Touchable onPress={this.onSave} id="save">
            <View style={this.props.styles.saveButton}>
              <Text style={this.props.styles.saveButtonText}>Save</Text>
            </View>
          </Touchable>
        </View>
      </View>
    );
  }
}

export default withStyles(ClockInOutEditComponentStyles, {
  themePropName: 'withStylesTheme',
})(withNamespaces()(ClockInOutEditComponent));
