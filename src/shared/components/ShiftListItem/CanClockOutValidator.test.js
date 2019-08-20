import moment from 'moment-timezone';
import ShiftListItemComponentTestData from './ShiftListItemComponent.testdata';
import { ClockEventTypes } from '../../types/schedule.types';
import { CanClockOutValidator } from './CanClockOutValidator';

describe('CanClockOutValidator', () => {
  let dateNowSpy;

  beforeAll(() => {
    const now = moment();
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => now.toDate().valueOf());
  });

  afterAll(() => {
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('should not allow a clock out when a shift has no clock events', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).toDate();
    shift.end = moment(currentTime).add(60, 'minutes').toDate();
    shift.clockEvents = [];

    const canClockOutValidator = new CanClockOutValidator(shift);
    const canClockOut = canClockOutValidator.canClockOut();

    expect(canClockOut).toBe(false);
  });

  it('should not allow clock out when shift is not clocked in', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).toDate();
    shift.end = moment(currentTime).add(60, 'minutes').toDate();
    shift.clockEvents = [
      {
        id: 'clockevent-id-1',
        eventTime: moment(shift.start).add(10, 'minutes').toDate(),
        eventType: ClockEventTypes.ClockOut,
        userId: 'user-id-3',
      },
    ];

    const canClockOutValidator = new CanClockOutValidator(shift);
    const canClockOut = canClockOutValidator.canClockOut();

    expect(canClockOut).toBe(false);
  });

  it('should allow a clock out when a shift is clocked in', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).toDate();
    shift.end = moment(currentTime).add(60, 'minutes').toDate();
    shift.clockEvents = [
      {
        id: 'clockevent-id-1',
        eventTime: moment(shift.start).toDate(),
        eventType: ClockEventTypes.ClockIn,
        userId: 'user-id-3',
      },
    ];

    const canClockOutValidator = new CanClockOutValidator(shift);
    const canClockOut = canClockOutValidator.canClockOut();

    expect(canClockOut).toBe(true);
  });

  it('should allow a clock out between shift start and end times', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).subtract(10, 'minutes').toDate();
    shift.end = moment(currentTime).add(60, 'minutes').toDate();
    shift.clockEvents = [
      {
        id: 'clockevent-id-1',
        eventTime: moment(shift.start).toDate(),
        eventType: ClockEventTypes.ClockIn,
        userId: 'user-id-3',
      },
    ];

    const canClockOutValidator = new CanClockOutValidator(shift);
    const canClockOut = canClockOutValidator.canClockOut();

    expect(canClockOut).toBe(true);
  });

  it('should allow a clock out exactly at the shift end time', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).subtract(60, 'minutes').toDate();
    shift.end = moment(currentTime).toDate();
    shift.clockEvents = [
      {
        id: 'clockevent-id-1',
        eventTime: moment(shift.start).toDate(),
        eventType: ClockEventTypes.ClockIn,
        userId: 'user-id-3',
      },
    ];

    const canClockOutValidator = new CanClockOutValidator(shift);
    const canClockOut = canClockOutValidator.canClockOut();

    expect(canClockOut).toBe(true);
  });

  it('should allow a clock out after the shift end time', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).subtract(60, 'minutes').toDate();
    shift.end = moment(currentTime).subtract(10, 'minutes').toDate();
    shift.clockEvents = [
      {
        id: 'clockevent-id-1',
        eventTime: moment(shift.start).toDate(),
        eventType: ClockEventTypes.ClockIn,
        userId: 'user-id-3',
      },
    ];

    const canClockOutValidator = new CanClockOutValidator(shift);
    const canClockOut = canClockOutValidator.canClockOut();

    expect(canClockOut).toBe(true);
  });
});
