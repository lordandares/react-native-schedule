import moment from 'moment-timezone';
import ShiftListItemComponentTestData from './ShiftListItemComponent.testdata';
import { ClockEventTypes } from '../../types/schedule.types';
import { ShiftCompletionCalculator } from './ShiftCompletionCalculator';

describe('ShiftCompletionCalculator', () => {
  let dateNowSpy;

  beforeAll(() => {
    const now = moment();
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => now.toDate().valueOf());
  });

  afterAll(() => {
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('should mark shift as complete exactly when a shift has ended and is clocked out', () => {
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
      {
        id: 'clockevent-id-2',
        eventTime: moment(shift.end).toDate(),
        eventType: ClockEventTypes.ClockOut,
        userId: 'user-id-3',
      },
    ];

    const shiftCompletionCalculator = new ShiftCompletionCalculator(shift);
    const isShiftComplete = shiftCompletionCalculator.isComplete();

    expect(isShiftComplete).toBe(true);
  });

  it('should mark shift as complete after a shift has ended and is clocked out', () => {
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
      {
        id: 'clockevent-id-2',
        eventTime: moment(shift.end).toDate(),
        eventType: ClockEventTypes.ClockOut,
        userId: 'user-id-3',
      },
    ];

    const shiftCompletionCalculator = new ShiftCompletionCalculator(shift);
    const isShiftComplete = shiftCompletionCalculator.isComplete();

    expect(isShiftComplete).toBe(true);
  });

  it('should not mark shift as complete when a shift has does not' +
    ' have matching pairs of clockin/clockout events', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).subtract(60, 'minutes').toDate();
    shift.end = moment(currentTime).toDate();
    shift.clockEvents = [
      {
        id: 'clockevent-id-1',
        eventTime: moment(shift.end).toDate(),
        eventType: ClockEventTypes.ClockOut,
        userId: 'user-id-3',
      },
    ];

    const shiftCompletionCalculator = new ShiftCompletionCalculator(shift);
    const isShiftComplete = shiftCompletionCalculator.isComplete();

    expect(isShiftComplete).toBe(false);
  });

  it('should not mark a shift as complete when a shift has ended but it is not clocked out', () => {
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

    const shiftCompletionCalculator = new ShiftCompletionCalculator(shift);
    const isShiftComplete = shiftCompletionCalculator.isComplete();

    expect(isShiftComplete).toBe(false);
  });

  it('should not mark a shift as complete before it has ended', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).subtract(60, 'minutes').toDate();
    shift.end = moment(currentTime).add(10, 'minutes').toDate();
    shift.clockEvents = [
      {
        id: 'clockevent-id-1',
        eventTime: moment(shift.start).toDate(),
        eventType: ClockEventTypes.ClockIn,
        userId: 'user-id-3',
      },
      {
        id: 'clockevent-id-2',
        eventTime: moment(shift.end).subtract(10, 'minutes').toDate(),
        eventType: ClockEventTypes.ClockOut,
        userId: 'user-id-3',
      },
    ];

    const shiftCompletionCalculator = new ShiftCompletionCalculator(shift);
    const isShiftComplete = shiftCompletionCalculator.isComplete();

    expect(isShiftComplete).toBe(false);
  });

  it('should not mark shift as complete if it is an unassigned shift', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).subtract(60, 'minutes').toDate();
    shift.end = moment(currentTime).subtract(10, 'minutes').toDate();
    shift.users = [];
    shift.clockEvents = [];

    const shiftCompletionCalculator = new ShiftCompletionCalculator(shift);
    const isShiftComplete = shiftCompletionCalculator.isComplete();

    expect(isShiftComplete).toBe(false);
  });

  it('should mark a shift as incomplete exactly when a shift ends but has no clock events', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).subtract(60, 'minutes').toDate();
    shift.end = moment(currentTime).toDate();
    shift.clockEvents = [];

    const shiftCompletionCalculator = new ShiftCompletionCalculator(shift);
    const isShiftIncomplete = shiftCompletionCalculator.isIncomplete();

    expect(isShiftIncomplete).toBe(true);
  });

  it('should mark a shift as incomplete when a shift has ended but has no clock events', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).subtract(60, 'minutes').toDate();
    shift.end = moment(currentTime).subtract(10, 'minutes').toDate();
    shift.clockEvents = [];

    const shiftCompletionCalculator = new ShiftCompletionCalculator(shift);
    const isShiftIncomplete = shiftCompletionCalculator.isIncomplete();

    expect(isShiftIncomplete).toBe(true);
  });

  it('should not mark a shift as incomplete when a shift has ended but has clock events', () => {
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
      {
        id: 'clockevent-id-2',
        eventTime: moment(shift.end).subtract(10, 'minutes').toDate(),
        eventType: ClockEventTypes.ClockOut,
        userId: 'user-id-3',
      },
    ];

    const shiftCompletionCalculator = new ShiftCompletionCalculator(shift);
    const isShiftIncomplete = shiftCompletionCalculator.isIncomplete();

    expect(isShiftIncomplete).toBe(false);
  });

  it('should not mark a shift as incomplete when a shift has not ended and has no clock events', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).subtract(60, 'minutes').toDate();
    shift.end = moment(currentTime).add(10, 'minutes').toDate();
    shift.clockEvents = [];

    const shiftCompletionCalculator = new ShiftCompletionCalculator(shift);
    const isShiftIncomplete = shiftCompletionCalculator.isIncomplete();

    expect(isShiftIncomplete).toBe(false);
  });

  it('should not mark a shift as incomplete when a shift is unassigned', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).subtract(60, 'minutes').toDate();
    shift.end = moment(currentTime).subtract(10, 'minutes').toDate();
    shift.users = [];
    shift.clockEvents = [];

    const shiftCompletionCalculator = new ShiftCompletionCalculator(shift);
    const isShiftIncomplete = shiftCompletionCalculator.isIncomplete();

    expect(isShiftIncomplete).toBe(false);
  });
});
