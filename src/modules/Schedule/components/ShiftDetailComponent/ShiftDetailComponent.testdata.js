// @flow
import moment from 'moment-timezone';
import type { Shift } from '../../../../shared/types/schedule.types';
import { shiftTypeValue } from '../../../../shared/types/schedule.types';

export default class ShiftDetailComponentTestData {
  static getAssignedShiftsForToday(): Shift[] {
    return [
      {
        id: 'shift-id-0',
        siteName: '',
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
          {
            id: 'user-id-2',
            firstName: 'Horace',
            lastName: 'Grant',
            userRoles: [],
          },
        ],
        tenantId: '',
        customerId: '',
        siteId: '',
        serviceId: '',
        serviceName: '',
        instructions: '',
        shiftType: shiftTypeValue.fixed.value,
        clockEvents: [],
      },
      {
        id: 'shift-id-1',
        siteName: '',
        start: moment()
          .utc()
          .add(-2, 'hours')
          .toDate(),
        end: moment()
          .utc()
          .add(-1, 'hours')
          .toDate(),
        users: [
          {
            id: 'user-id-3',
            firstName: 'Wiz',
            lastName: 'Khaleefa',
            userRoles: [],
          },
        ],
        clockEvents: [],
        tenantId: '',
        customerId: '',
        siteId: '',
        serviceId: '',
        serviceName: '',
        instructions: '',
        shiftType: shiftTypeValue.fixed.value,
      },
      {
        id: 'shift-id-1',
        siteName: '',
        start: moment()
          .utc()
          .add(-4, 'hours')
          .toDate(),
        end: moment()
          .utc()
          .add(3, 'hours')
          .toDate(),
        users: [
          {
            id: 'user-id-3',
            firstName: 'Wiz',
            lastName: 'Khaleefa',
          },
        ],
        clockEvents: [
          {
            id: 'clockevent-id-1',
            eventTime: moment()
              .utc()
              .hour(8)
              .minute(5)
              .toDate(),
            eventType: 'clockin',
            userId: 'user-id-3',
          },
        ],
        tenantId: '',
        customerId: '',
        siteId: '',
        serviceId: '',
        serviceName: '',
        instructions: '',
        shiftType: shiftTypeValue.repeating.value,
      },
    ];
  }
}
