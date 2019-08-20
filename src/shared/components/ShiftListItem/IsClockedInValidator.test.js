import moment from 'moment-timezone';
import ShiftListItemComponentTestData from './ShiftListItemComponent.testdata';
import { ClockEventTypes } from '../../types/schedule.types';
import { IsClockedInValidator } from './IsClockedInValidator';

describe('IsClockedInValidator', () => {
  let dateNowSpy;

  beforeAll(() => {
    const now = moment();
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => now.toDate().valueOf());
  });

  afterAll(() => {
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('should return shift is clocked in if the last event was a clock in', () => {
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

    const isClockedIn = IsClockedInValidator.isShiftClockedIn(shift);
    expect(isClockedIn).toBe(true);
  });

  it('should not return clocked in if the last event was not a clock in', () => {
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

    const isClockedIn = IsClockedInValidator.isShiftClockedIn(shift);
    expect(isClockedIn).toBe(false);
  });

  it('should not return clocked in if there are no events', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).toDate();
    shift.end = moment(currentTime).add(60, 'minutes').toDate();
    shift.clockEvents = [];

    const isClockedIn = IsClockedInValidator.isShiftClockedIn(shift);
    expect(isClockedIn).toBe(false);
  });
});
