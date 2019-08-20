// @flow
import moment from 'moment-timezone';

import { ClockEventTypes, shiftTypeValue } from '../../types/schedule.types';
import type { ShiftClockEvent } from '../../types/schedule.types';

export const checkIndexIsOdd = n => n % 2 === 1;

export const roundToDecimal = num => +`${Math.ceil(`${num}e+1`)}e-1`;

export const sumHours = (clockEvents) => {
  let hours: number = 0;
  for (let i = 0; i < clockEvents.length; i += 2) {
    const clockInItem: ShiftClockEvent = clockEvents[i];
    const clockOutItem: ShiftClockEvent = clockEvents[i + 1];
    if (
      clockInItem &&
      clockInItem.eventType === ClockEventTypes.ClockIn &&
      clockOutItem &&
      clockOutItem.eventType === ClockEventTypes.ClockOut
    ) {
      const clockIn = moment(clockInItem.eventTime);
      const clockOut = moment(clockOutItem.eventTime);
      hours += moment.duration(clockOut.diff(clockIn));
    }
  }
  return moment.duration(hours).as('hours');
};

export const calculateTotalHours = (shiftType, shiftStart, shiftEnd, shiftDuration) => {
  const totalHours: number = shiftType !== shiftTypeValue.flexRepeating.value
  && shiftType !== shiftTypeValue.flexFixed.value ?
    roundToDecimal(moment.duration(moment(shiftEnd).diff(moment(shiftStart))).asHours())
    : roundToDecimal(shiftDuration);
  return totalHours;
};
