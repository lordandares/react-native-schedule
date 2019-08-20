// @flow
import moment from 'moment-timezone';
import type { Shift } from '../../../../shared/types/schedule.types';
import { shiftTypeValue } from '../../../../shared/types/schedule.types';

export default class ShiftCoverageComponentTestData {
  static getRepeatingShift(): Shift {
    return {
      id: 'shift-id-0',
      start: moment()
        .utc()
        .hour(8)
        .toDate(),
      end: moment()
        .utc()
        .hour(9)
        .toDate(),
      users: [
        {
          id: 'user-id-1',
          firstName: 'Denise',
          lastName: 'Rodman',
          userRoles: [],
        },
      ],
      shiftType: shiftTypeValue.repeating.value,
    };
  }
}
