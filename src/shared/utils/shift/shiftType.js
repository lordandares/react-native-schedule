import { shiftTypeValue } from '../../../shared/types/schedule.types';

export const isRepeating = (shiftType: number) =>
  shiftType === shiftTypeValue.repeating.value ||
  shiftType === shiftTypeValue.flexRepeating.value;

export const isOneTime = (shiftType: number) =>
  shiftType === shiftTypeValue.fixed.value ||
  shiftType === shiftTypeValue.flexFixed.value;

export const isShiftOffered = shift => shift && Boolean(shift.isOffered);
