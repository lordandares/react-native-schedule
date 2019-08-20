// @flow
import moment from 'moment-timezone';
import type { ICanClockInValidator } from './ICanClockInValidator';
import type { Shift } from '../../types/schedule.types';
import { IsClockedInValidator } from './IsClockedInValidator';

export class CanClockInValidator implements ICanClockInValidator {
  shift: Shift;

  constructor(shift: Shift) {
    this.shift = shift;
  }

  canClockIn(): boolean {
    if (!this.shift) {
      return false;
    }

    if (IsClockedInValidator.isShiftClockedIn(this.shift)) {
      return false;
    }

    if (!this.isShiftBetweenTolerance()) {
      return false;
    }

    return true;
  }

  isShiftBetweenTolerance = (): boolean => {
    const now: moment = moment();
    const shiftClockInBeforeDelta = 15;
    const lowerTimeBoundary: moment = moment(this.shift.start).subtract(shiftClockInBeforeDelta, 'minutes');
    const upperTimeBoundary: moment = moment(this.shift.end);
    const inclusiveBeginExclusiveEnd: string = '[)';
    return now.isBetween(lowerTimeBoundary, upperTimeBoundary, null, inclusiveBeginExclusiveEnd);
  };
}
