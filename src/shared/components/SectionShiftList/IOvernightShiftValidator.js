// @flow
import moment from 'moment-timezone';

export interface IOvernightShiftValidator {
  isOvernightShift(date: moment): boolean,
}
