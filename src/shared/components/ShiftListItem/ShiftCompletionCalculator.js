// @flow
import type { Shift } from '../../types/schedule.types';
import { ClockEventTypes } from '../../types/schedule.types';
import { ShiftTimeCalculator } from './ShiftTimeCalculator';
import type { IShiftTimeCalculator } from './IShiftTimeCalculator';
import type { IShiftCompletionCalculator } from './IShiftCompletionCalculator';

export class ShiftCompletionCalculator implements IShiftCompletionCalculator {
  isIncomplete(): boolean {
    if (!this.isShiftAssigned()) {
      return false;
    }

    const hasEnded = this.shiftTimeCalculator.hasEnded();
    return hasEnded && !this.hasClockEvents();
  }

  isComplete(): boolean {
    if (!this.isShiftAssigned()) {
      return false;
    }

    const hasEnded = this.shiftTimeCalculator.hasEnded();
    return hasEnded && this.doAllClockInsHaveClockOuts();
  }

  shift: Shift;
  shiftTimeCalculator: IShiftTimeCalculator;

  constructor(shift: Shift) {
    this.shift = shift;
    this.shiftTimeCalculator = new ShiftTimeCalculator(this.shift);
  }

  getClockInCount = (): number => {
    let clockInCount: number = 0;
    const eventCount: number = this.shift.clockEvents ? this.shift.clockEvents.length : 0;
    for (let cnt = 0; cnt < eventCount; cnt += 1) {
      if (this.shift.clockEvents[cnt].eventType === ClockEventTypes.ClockIn) {
        clockInCount += 1;
      }
    }
    return clockInCount;
  };

  getClockOutCount = (): number => {
    let clockOutCount: number = 0;
    const eventCount: number = this.shift.clockEvents ? this.shift.clockEvents.length : 0;
    for (let cnt = 0; cnt < eventCount; cnt += 1) {
      if (this.shift.clockEvents[cnt].eventType === ClockEventTypes.ClockOut) {
        clockOutCount += 1;
      }
    }
    return clockOutCount;
  };

  hasClockEvents = (): boolean => {
    const numClockIns: number = this.getClockInCount();
    const numClockOuts: number = this.getClockOutCount();
    return (numClockIns + numClockOuts) > 0;
  };

  hasClockIns = (): boolean => {
    const numClockIns: number = this.getClockInCount();
    return numClockIns > 0;
  };

  doAllClockInsHaveClockOuts = (): boolean => {
    const numClockIns: number = this.getClockInCount();
    const numClockOuts: number = this.getClockOutCount();

    const hasClockIns: boolean = this.hasClockIns();
    const clockCountMatches: boolean = numClockIns === numClockOuts;

    return hasClockIns && clockCountMatches;
  };

  isShiftAssigned = (): boolean => this.shift.users && this.shift.users.length > 0;
}
