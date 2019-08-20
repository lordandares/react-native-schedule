// @flow
import moment from 'moment-timezone';
import type { Shift } from '../../types/schedule.types';
import type { IShiftTimeCalculator } from './IShiftTimeCalculator';

export class ShiftTimeCalculator implements IShiftTimeCalculator {
  shift: Shift;

  constructor(shift: Shift) {
    this.shift = shift;
  }

  hasStarted(): boolean {
    const now = moment();
    const start = moment(this.shift.start);
    return now.isSameOrAfter(start);
  }

  hasEnded(): boolean {
    const now = moment();
    const end = moment(this.shift.end);
    return now.isSameOrAfter(end);
  }
}
