import moment from 'moment-timezone';
import { OvernightShiftValidator } from './OvernightShiftValidator';
import ShiftListItemComponentTestData from '../ShiftListItem/ShiftListItemComponent.testdata';

describe('OvernightShiftValidator', () => {
  it('should return true for overnight shift 2 hour', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[2];

    const currentTime = moment();
    shift.start = moment(currentTime).add(-2, 'hours');
    shift.end = moment(currentTime).add(2, 'hours');

    const overnightShiftValidator = new OvernightShiftValidator(shift);

    const isOvernightShift = overnightShiftValidator.isOvernightShift(currentTime);
    expect(isOvernightShift).toBe(true);
  });

  it('should return true for overnight shift 30 minutes', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[2];

    const currentTime = moment();
    shift.start = moment(currentTime).add(-30, 'minutes');
    shift.end = moment(currentTime).add(30, 'minutes');

    const overnightShiftValidator = new OvernightShiftValidator(shift);

    const isOvernightShift = overnightShiftValidator.isOvernightShift(currentTime);
    expect(isOvernightShift).toBe(true);
  });

  it('should return true for overnight shift 1 minute', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[2];

    const currentTime = moment();
    shift.start = moment(currentTime).add(-1, 'minutes');
    shift.end = moment(currentTime).add(1, 'minutes');

    const overnightShiftValidator = new OvernightShiftValidator(shift);

    const isOvernightShift = overnightShiftValidator.isOvernightShift(currentTime);
    expect(isOvernightShift).toBe(true);
  });

  it('should return false for  non-overnight shift', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[2];

    const currentTime = moment();
    shift.start = moment(currentTime).add(-6, 'hours');
    shift.end = moment(currentTime).add(-2, 'hours');

    const overnightShiftValidator = new OvernightShiftValidator(shift);

    const isOvernightShift = overnightShiftValidator.isOvernightShift(currentTime);
    expect(isOvernightShift).toBe(false);
  });

  it('should return false for  non-overnight shift 1 hour', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[2];

    const currentTime = moment();
    shift.start = moment(currentTime).add(-1, 'hours');
    shift.end = moment(currentTime).add(-1, 'hours');

    const overnightShiftValidator = new OvernightShiftValidator(shift);

    const isOvernightShift = overnightShiftValidator.isOvernightShift(currentTime);
    expect(isOvernightShift).toBe(false);
  });

  it('should return false for  non-overnight shift 1 minute', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[2];

    const currentTime = moment();
    shift.start = moment(currentTime).add(-1, 'hours');
    shift.end = moment(currentTime).add(-1, 'minutes');

    const overnightShiftValidator = new OvernightShiftValidator(shift);

    const isOvernightShift = overnightShiftValidator.isOvernightShift(currentTime);
    expect(isOvernightShift).toBe(false);
  });

  it('should return true for overnight shift 2 hour - repeating', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[9];

    const currentTime = moment();
    shift.start = moment(currentTime).add(-2, 'hours');
    shift.end = moment(currentTime).add(2, 'hours');

    const overnightShiftValidator = new OvernightShiftValidator(shift);

    const isOvernightShift = overnightShiftValidator.isOvernightShift(currentTime);
    expect(isOvernightShift).toBe(true);
  });

  it('should return true for overnight shift 30 minutes - repeating', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[9];

    const currentTime = moment();
    shift.start = moment(currentTime).add(-30, 'minutes');
    shift.end = moment(currentTime).add(30, 'minutes');

    const overnightShiftValidator = new OvernightShiftValidator(shift);

    const isOvernightShift = overnightShiftValidator.isOvernightShift(currentTime);
    expect(isOvernightShift).toBe(true);
  });

  it('should return true for overnight shift 1 minute - repeating', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[9];

    const currentTime = moment();
    shift.start = moment(currentTime).add(-1, 'minutes');
    shift.end = moment(currentTime).add(1, 'minutes');

    const overnightShiftValidator = new OvernightShiftValidator(shift);

    const isOvernightShift = overnightShiftValidator.isOvernightShift(currentTime);
    expect(isOvernightShift).toBe(true);
  });

  it('should return false for  non-overnight shift - repeating', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[9];

    const currentTime = moment();
    shift.start = moment(currentTime).add(-6, 'hours');
    shift.end = moment(currentTime).add(-2, 'hours');

    const overnightShiftValidator = new OvernightShiftValidator(shift);

    const isOvernightShift = overnightShiftValidator.isOvernightShift(currentTime);
    expect(isOvernightShift).toBe(false);
  });

  it('should return false for  non-overnight shift 1 hour - repeating', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[9];

    const currentTime = moment();
    shift.start = moment(currentTime).add(-1, 'hours');
    shift.end = moment(currentTime).add(-1, 'hours');

    const overnightShiftValidator = new OvernightShiftValidator(shift);

    const isOvernightShift = overnightShiftValidator.isOvernightShift(currentTime);
    expect(isOvernightShift).toBe(false);
  });

  it('should return false for  non-overnight shift 1 minute - repeating', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[9];

    const currentTime = moment();
    shift.start = moment(currentTime).add(-1, 'hours');
    shift.end = moment(currentTime).add(-1, 'minutes');

    const overnightShiftValidator = new OvernightShiftValidator(shift);

    const isOvernightShift = overnightShiftValidator.isOvernightShift(currentTime);
    expect(isOvernightShift).toBe(false);
  });
});
