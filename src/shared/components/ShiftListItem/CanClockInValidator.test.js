import moment from 'moment-timezone';
import ShiftListItemComponentTestData from './ShiftListItemComponent.testdata';
import { ClockEventTypes } from '../../types/schedule.types';
import { CanClockInValidator } from './CanClockInValidator';

describe('CanClockInValidator', () => {
  let dateNowSpy;

  beforeAll(() => {
    const now = moment();
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => now.toDate().valueOf());
  });

  afterAll(() => {
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('should not allow clock in when shift is clocked in', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).toDate();
    shift.end = moment(currentTime).add(60, 'minutes').toDate();
    shift.clockEvents = [
      {
        id: 'clockevent-id-1',
        eventTime: moment(currentTime).toDate(),
        eventType: ClockEventTypes.ClockIn,
        userId: 'user-id-3',
      },
    ];

    const canClockInValidator = new CanClockInValidator(shift);
    const canClockIn = canClockInValidator.canClockIn();

    expect(canClockIn).toBe(false);
  });

  it('should allow a clock in when a shift has no clock events', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).toDate();
    shift.end = moment(currentTime).add(60, 'minutes').toDate();
    shift.clockEvents = [];

    const canClockInValidator = new CanClockInValidator(shift);
    const canClockIn = canClockInValidator.canClockIn();

    expect(canClockIn).toBe(true);
  });

  it('should allow a clock in when a shift has clock events but is not clocked in', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).toDate();
    shift.end = moment(currentTime).add(60, 'minutes').toDate();
    shift.clockEvents = [
      {
        id: 'clockevent-id-1',
        eventTime: moment(currentTime).toDate(),
        eventType: ClockEventTypes.ClockOut,
        userId: 'user-id-3',
      },
    ];

    const canClockInValidator = new CanClockInValidator(shift);
    const canClockIn = canClockInValidator.canClockIn();

    expect(canClockIn).toBe(true);
  });

  it('should allow a clock in when now is between the start and end times', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).subtract(10, 'minutes').toDate();
    shift.end = moment(currentTime).add(60, 'minutes').toDate();
    shift.clockEvents = [];

    const canClockInValidator = new CanClockInValidator(shift);
    const canClockIn = canClockInValidator.canClockIn();

    expect(canClockIn).toBe(true);
  });

  it('should allow a clock in exactly on the start time', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).toDate();
    shift.end = moment(currentTime).add(60, 'minutes').toDate();
    shift.clockEvents = [];

    const canClockInValidator = new CanClockInValidator(shift);
    const canClockIn = canClockInValidator.canClockIn();

    expect(canClockIn).toBe(true);
  });

  it('should allow a clock in between 0 and 15 minutes before the start time', () => {
    const currentTime = moment();
    const tenMinutesAfter = moment(currentTime).add(10, 'minutes');
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(tenMinutesAfter).toDate();
    shift.end = moment(tenMinutesAfter).add(60, 'minutes').toDate();
    shift.clockEvents = [];

    const canClockInValidator = new CanClockInValidator(shift);
    const canClockIn = canClockInValidator.canClockIn();

    expect(canClockIn).toBe(true);
  });

  it('should allow a clock in exactly 15 minutes before the start time', () => {
    const currentTime = moment();
    const fifteenMinutesAfter = moment(currentTime).add(15, 'minutes');
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(fifteenMinutesAfter).toDate();
    shift.end = moment(fifteenMinutesAfter).add(60, 'minutes').toDate();
    shift.clockEvents = [];

    const canClockInValidator = new CanClockInValidator(shift);
    const canClockIn = canClockInValidator.canClockIn();

    expect(canClockIn).toBe(true);
  });

  it('should not allow a clock greater than 15 minutes before the start times', () => {
    const currentTime = moment();
    const overFifteenMinutesAfter = moment(currentTime).add(15, 'minutes').add(1, 'milliseconds');
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(overFifteenMinutesAfter).toDate();
    shift.end = moment(overFifteenMinutesAfter).add(60, 'minutes').toDate();
    shift.clockEvents = [];

    const canClockInValidator = new CanClockInValidator(shift);
    const canClockIn = canClockInValidator.canClockIn();

    expect(canClockIn).toBe(false);
  });

  it('should not allow a clock in exactly when a shift has ended', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).subtract(120, 'minutes').toDate();
    shift.end = moment(currentTime).toDate();
    shift.clockEvents = [];

    const canClockInValidator = new CanClockInValidator(shift);
    const canClockIn = canClockInValidator.canClockIn();

    expect(canClockIn).toBe(false);
  });

  it('should not allow a clock in after when a shift has ended', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).subtract(120, 'minutes').toDate();
    shift.end = moment(currentTime).subtract(60, 'minutes').toDate();
    shift.clockEvents = [];

    const canClockInValidator = new CanClockInValidator(shift);
    const canClockIn = canClockInValidator.canClockIn();

    expect(canClockIn).toBe(false);
  });
});
