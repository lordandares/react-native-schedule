// @flow
import type { Shift } from '../../types/schedule.types';
import type { IShiftAssignmentCalculator } from './IShiftAssignmentCalculator';

export class ShiftAssignmentCalculator implements IShiftAssignmentCalculator {
  shift: Shift;

  constructor(shift: Shift) {
    this.shift = shift;
  }

  isAssigned(): boolean {
    const isUsersTruthy = !!this.shift.users;
    const hasUsers: boolean = isUsersTruthy && (this.shift.users.length > 0);
    return hasUsers;
  }
}
