import moment from 'moment-timezone';
import ShiftListItemComponentTestData from './ShiftListItemComponent.testdata';
import { ShiftTimeCalculator } from './ShiftTimeCalculator';

describe('ShiftTimeCalculator', () => {
  let dateNowSpy;

  beforeAll(() => {
    const now = moment();
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => now.toDate().valueOf());
  });

  afterAll(() => {
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('should say shift is started exactly when start time elapses', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).toDate();
    shift.end = moment(currentTime).add(60, 'minutes').toDate();

    const shiftTimeCalculator = new ShiftTimeCalculator(shift);
    const hasShiftStarted = shiftTimeCalculator.hasStarted();

    expect(hasShiftStarted).toBe(true);
  });

  it('should say shift is started after start time elapses', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).subtract(10, 'minutes').toDate();
    shift.end = moment(currentTime).add(60, 'minutes').toDate();

    const shiftTimeCalculator = new ShiftTimeCalculator(shift);
    const hasShiftStarted = shiftTimeCalculator.hasStarted();

    expect(hasShiftStarted).toBe(true);
  });

  it('should not say shift is started before start time elapses', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).add(10, 'minutes').toDate();
    shift.end = moment(currentTime).add(60, 'minutes').toDate();

    const shiftTimeCalculator = new ShiftTimeCalculator(shift);
    const hasShiftStarted = shiftTimeCalculator.hasStarted();

    expect(hasShiftStarted).toBe(false);
  });

  it('should say shift is ended exactly when end time elapses', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).subtract(60, 'minutes').toDate();
    shift.end = moment(currentTime).toDate();

    const shiftTimeCalculator = new ShiftTimeCalculator(shift);
    const hasShiftEnded = shiftTimeCalculator.hasEnded();

    expect(hasShiftEnded).toBe(true);
  });

  it('should say shift is ended after end time elapses', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).subtract(60, 'minutes').toDate();
    shift.end = moment(currentTime).subtract(10, 'minutes').toDate();

    const shiftTimeCalculator = new ShiftTimeCalculator(shift);
    const hasShiftEnded = shiftTimeCalculator.hasEnded();

    expect(hasShiftEnded).toBe(true);
  });

  it('should not say shift is ended before end time elapses', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).subtract(60, 'minutes').toDate();
    shift.end = moment(currentTime).add(10, 'minutes').toDate();

    const shiftTimeCalculator = new ShiftTimeCalculator(shift);
    const hasShiftEnded = shiftTimeCalculator.hasEnded();

    expect(hasShiftEnded).toBe(false);
  });
});
