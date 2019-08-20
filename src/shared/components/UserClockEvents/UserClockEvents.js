// @flow
import React from 'react';
import { View, Text } from 'react-native';
import times from 'lodash/times';
import findIndex from 'lodash/findIndex';
import moment from 'moment-timezone';
import type { ShiftClockEvent } from '@next/schedule/types/schedule.types';
import { ClockEventTypes } from '../../types/schedule.types';
import { withStyles } from '../../withStyles';
import UserClockEventsStyles from './UserClockEvents.style';
import UserClockEventsProps from './UserClockEvents.types';
import CustomIcon from '../../customIcons/NextIcons';
import { formatEventTime, getEventTypeVerbiage } from '../../utils/clockInOut/clockInOutFormatter';
import { roundToDecimal, sumHours, calculateTotalHours } from '../../utils/clockInOut/clockInOutHelpers';

const UserClockEvents = (props: UserClockEventsProps) => {
  const {
    clockEvents, exceptions, styles, shiftStart, shiftEnd, shiftType, shiftDuration, timeFormat,
  } = props;
  if (!clockEvents && !exceptions) {
    return null;
  }

  const makeExceptionString = () => {
    let exceptionString: string = '';
    for (let i = 0; i < exceptions.length; i += 1) {
      if (i === 0) {
        exceptionString = exceptions[i].exception;
      } else {
        exceptionString += `, ${exceptions[i].exception}`;
      }
    }
    return exceptionString;
  };

  const displayExceptions = () => {
    if (exceptions && exceptions.length > 0) {
      const exceptionString = makeExceptionString();
      return (
        <View style={styles.container}>
          <Text id="exceptions-text" style={styles.displayRed}>{exceptionString}</Text>
        </View>
      );
    }
    return null;
  };

  const displayTotalTime = () => {
    const hoursWorked: number = roundToDecimal(sumHours(clockEvents));
    const totalHours: number = calculateTotalHours(shiftType, shiftStart, shiftEnd, shiftDuration);
    const isMatchingHours: boolean =
      totalHours < hoursWorked || findIndex(clockEvents, { eventType: ClockEventTypes.ClockIn }) === -1;
    const styledRed: any = isMatchingHours ? styles.displayRed : null;
    return (
      <View style={styles.totalHoursContainer} id="total-time">
        <Text style={[styles.totalHoursTitle, styledRed]}>T:</Text>
        <Text style={[styles.totalHoursLabel, styledRed]} id="display-hours">
          {`${hoursWorked} / ${totalHours} hrs`}
        </Text>
      </View>
    );
  };

  const displayClockEvents = () =>
    (clockEvents && clockEvents.length > 0 ? (
      clockEvents.map((clockEvent: ShiftClockEvent, index) => {
        const eventTimeFormatted = formatEventTime(clockEvent.eventTime, props.siteTimeZone, timeFormat);
        const eventTypeFormatted = getEventTypeVerbiage(clockEvent.eventType);

        return (
          <View key={clockEvent.id} className="clockEvent">
            {!(clockEvents.length - 1 === index) && (
              <View style={styles.line}>
                {times(4, i => (
                  <CustomIcon
                    id="icon-circle"
                    name="circlefilled"
                    size={2}
                    style={styles.lineCircle}
                    key={`circle${i}`}
                  />
                ))}
              </View>
            )}
            <View style={styles.container}>
              <CustomIcon id="icon-circle" name="circlefilled" size={14} style={styles.bullet} />
              <Text style={styles.label}>{eventTimeFormatted}</Text>
              <Text style={styles.typeLabel}>{eventTypeFormatted}</Text>
            </View>
          </View>
        );
      })
    ) : (null));

  return (
    moment().isSameOrAfter(shiftStart) && (
      <View style={styles.mainContainer}>
        {displayExceptions()}
        {displayClockEvents()}
        {displayTotalTime()}
      </View>
    )
  );
};

export default withStyles(UserClockEventsStyles)(UserClockEvents);
