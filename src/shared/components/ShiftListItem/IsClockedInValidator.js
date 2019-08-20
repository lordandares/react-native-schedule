// @flow
import type { Shift, ShiftClockEvent } from '../../types/schedule.types';
import { ClockEventTypes } from '../../types/schedule.types';

export class IsClockedInValidator {
  static isShiftClockedIn = (shift: Shift): boolean => {
    const clockEventsFalsy = !shift.clockEvents;
    if (clockEventsFalsy) {
      return false;
    }

    const clockEventsEmpty = shift.clockEvents.length <= 0;
    if (clockEventsEmpty) {
      return false;
    }

    const lastClockEventIndex: number = shift.clockEvents.length - 1;
    const lastClockEvent: ShiftClockEvent = shift.clockEvents[lastClockEventIndex];
    return lastClockEvent.eventType === ClockEventTypes.ClockIn;
  };
}
