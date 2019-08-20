import moment from 'moment-timezone';
import ShiftListItemComponentTestData from './ShiftListItemComponent.testdata';
import { ShiftAssignmentCalculator } from './ShiftAssignmentCalculator';

describe('ShiftAssignmentCalculator', () => {
  let dateNowSpy;

  beforeAll(() => {
    const now = moment();
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => now.toDate().valueOf());
  });

  afterAll(() => {
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('should say shift is assigned when there are users', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    const shiftAssignmentCalculator = new ShiftAssignmentCalculator(shift);
    const isAssigned = shiftAssignmentCalculator.isAssigned();

    expect(isAssigned).toBe(true);
  });

  it('should say shift is unassigned when there are no users', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.users = [];

    const shiftAssignmentCalculator = new ShiftAssignmentCalculator(shift);
    const isAssigned = shiftAssignmentCalculator.isAssigned();

    expect(isAssigned).toBe(false);
  });

  it('should say shift is unassigned when users is null', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.users = null;

    const shiftAssignmentCalculator = new ShiftAssignmentCalculator(shift);
    const isAssigned = shiftAssignmentCalculator.isAssigned();

    expect(isAssigned).toBe(false);
  });

  it('should say shift is unassigned when users is undefined', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.users = undefined;

    const shiftAssignmentCalculator = new ShiftAssignmentCalculator(shift);
    const isAssigned = shiftAssignmentCalculator.isAssigned();

    expect(isAssigned).toBe(false);
  });
});
