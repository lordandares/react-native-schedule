// @flow
import type { Shift } from '../../types/schedule.types';
import { IsClockedInValidator } from './IsClockedInValidator';
import { ICanClockOutValidator } from './ICanClockOutValidator';

export class CanClockOutValidator implements ICanClockOutValidator {
  shift: Shift;

  constructor(shift: Shift) {
    this.shift = shift;
  }

  canClockOut(): boolean {
    if (!IsClockedInValidator.isShiftClockedIn(this.shift)) {
      return false;
    }

    return true;
  }
}
