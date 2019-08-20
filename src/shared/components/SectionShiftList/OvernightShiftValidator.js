// @flow
import moment from 'moment-timezone';
import type { IOvernightShiftValidator } from './IOvernightShiftValidator';
import type { Shift } from '../../types/schedule.types';

export class OvernightShiftValidator implements IOvernightShiftValidator {
  shift: Shift;

  constructor(shift: Shift) {
    this.shift = shift;
  }

  isOvernightShift(dayStart: moment): boolean {
    if (dayStart.isAfter(this.shift.end)) {
      return false;
    }
    return true;
  }
}
