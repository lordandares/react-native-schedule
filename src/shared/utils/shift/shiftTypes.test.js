import { isRepeating, isOneTime } from './shiftType';
import TestData from '../../testUtils/TestData';

describe('shifts types', () => {
  it('should return true isRepeating of a repeating shift', () => {
    const repeatingShift = TestData.getRepeatingShift()[0];
    const repeatingShiftType = repeatingShift.shiftType;
    expect(isRepeating(repeatingShiftType)).toBe(true);
  });
  it('should return false isRepeating of a one time shift', () => {
    const repeatingShift = TestData.getShifts()[0];
    const repeatingShiftType = repeatingShift.shiftType;
    expect(isRepeating(repeatingShiftType)).toBe(false);
  });
  it('should return true isOneTime of a one time shift', () => {
    const repeatingShift = TestData.getShifts()[0];
    const repeatingShiftType = repeatingShift.shiftType;
    expect(isOneTime(repeatingShiftType)).toBe(true);
  });
  it('should return false isOneTime of a repeating shift', () => {
    const repeatingShift = TestData.getRepeatingShift()[0];
    const repeatingShiftType = repeatingShift.shiftType;
    expect(isOneTime(repeatingShiftType)).toBe(false);
  });
});
