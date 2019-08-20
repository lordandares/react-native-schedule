/* eslint-disable no-plusplus */
import TestData from './TestData';

describe('TestData', () => {
  it('should return 2 shifts for getSomeUnassignedShiftsForToday', () => {
    const shifts = TestData.getSomeUnassignedShiftsForToday();
    const actual = shifts.length;
    const expected = 2;
    expect(actual).toBe(expected);
  });

  it('should have 0 users for any unassigned shift in getSomeUnassignedShiftsForToday', () => {
    const shifts = TestData.getSomeUnassignedShiftsForToday();

    let totalLength = 0;
    shifts.map((shift) => {
      totalLength += shift.users.length;
      return shift;
    });

    const actual = totalLength;
    const expected = 0;
    expect(actual).toBe(expected);
  });

  it('should return 2 shifts for getAssignedShiftsForToday', () => {
    const shifts = TestData.getAssignedShiftsForToday();
    const actual = shifts.length;
    const expected = 2;
    expect(actual).toBe(expected);
  });

  it('should have 2 users in first assigned shift for getAssignedShiftsForToday', () => {
    const shifts = TestData.getAssignedShiftsForToday();
    const actual = shifts[0].users.length;
    const expected = 2;
    expect(actual).toBe(expected);
  });

  it('should have 1 user in second assigned shift for getAssignedShiftsForToday', () => {
    const shifts = TestData.getAssignedShiftsForToday();
    const actual = shifts[1].users.length;
    const expected = 1;
    expect(actual).toBe(expected);
  });
});
