// @flow
import moment from 'moment-timezone';
import type { Shift } from '../../types/schedule.types';
import { shiftTypeValue } from '../../types/schedule.types';

export default class ShiftListItemComponentTestData {
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
        id: 'shift-id-2',
        siteName: '',
        start: moment()
          .utc()
          .add(1, 'hours')
          .toDate(),
        end: moment()
          .utc()
          .add(2, 'hours')
          .toDate(),
        users: [
          {
            id: 'user-id-3',
            firstName: 'Wiz',
            lastName: 'Khaleefa',
            userRoles: [],
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
        shiftType: shiftTypeValue.fixed.value,
      },
      {
        id: 'shift-id-3',
        siteName: '',
        start: moment()
          .utc()
          .add(-1, 'hours')
          .toDate(),
        end: moment()
          .utc()
          .add(4, 'hours')
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
        id: 'shift-id-4',
        siteName: '',
        start: moment()
          .utc()
          .add(-4, 'hours')
          .toDate(),
        end: moment()
          .utc()
          .add(-3, 'hours')
          .toDate(),
        users: [
          {
            id: 'user-id-3',
            firstName: 'Wiz',
            lastName: 'Khaleefa',
            userRoles: [],
          },
        ],
        clockEvents: [
          {
            id: 'clockevent-id-1',
            eventTime: moment()
              .utc()
              .add(5, 'minutes')
              .add(-4, 'hours')
              .toDate(),
            eventType: 'clockin',
            userId: 'user-id-3',
          },
          {
            id: 'clockevent-id-2',
            eventTime: moment()
              .utc()
              .add(10, 'minutes')
              .add(-4, 'hours')
              .toDate(),
            eventType: 'clockout',
            userId: 'user-id-3',
          },
        ],
        tenantId: '',
        customerId: '',
        siteId: '',
        serviceId: '',
        serviceName: '',
        instructions: '',
        shiftType: shiftTypeValue.fixed.value,
      },
      {
        id: 'shift-id-5',
        siteName: '',
        start: moment()
          .utc()
          .add(-4, 'hours')
          .toDate(),
        end: moment()
          .utc()
          .add(-3, 'hours')
          .toDate(),
        users: [
          {
            id: 'user-id-3',
            firstName: 'Wiz',
            lastName: 'Khaleefa',
            userRoles: [],
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
          {
            id: 'clockevent-id-2',
            eventTime: moment()
              .utc()
              .hour(8)
              .minute(10)
              .toDate(),
            eventType: 'clockout',
            userId: 'user-id-3',
          },
          {
            id: 'clockevent-id-3',
            eventTime: moment()
              .utc()
              .hour(8)
              .minute(15)
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
        shiftType: shiftTypeValue.fixed.value,
      },
      {
        id: 'shift-id-6',
        siteName: '',
        start: moment()
          .utc()
          .add(-4, 'hours')
          .toDate(),
        end: moment()
          .utc()
          .add(-3, 'hours')
          .toDate(),
        users: [
          {
            id: 'user-id-3',
            firstName: 'Wiz',
            lastName: 'Khaleefa',
            userRoles: [],
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
          {
            id: 'clockevent-id-2',
            eventTime: moment()
              .utc()
              .hour(8)
              .minute(10)
              .toDate(),
            eventType: 'clockout',
            userId: 'user-id-3',
          },
          {
            id: 'clockevent-id-3',
            eventTime: moment()
              .utc()
              .hour(8)
              .minute(15)
              .toDate(),
            eventType: 'clockin',
            userId: 'user-id-3',
          },
          {
            id: 'clockevent-id-4',
            eventTime: moment()
              .utc()
              .hour(8)
              .minute(15)
              .toDate(),
            eventType: 'clockout',
            userId: 'user-id-3',
          },
        ],
        tenantId: '',
        customerId: '',
        siteId: '',
        serviceId: '',
        serviceName: '',
        instructions: '',
        shiftType: shiftTypeValue.fixed.value,
      },
      {
        id: 'shift-id-7',
        siteName: '',
        start: moment()
          .utc()
          .add(-1, 'hours')
          .toDate(),
        end: moment()
          .utc()
          .add(4, 'hours')
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
        id: 'shift-id-8',
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
            userRoles: [],
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
          {
            id: 'clockevent-id-2',
            eventTime: moment()
              .utc()
              .hour(8)
              .minute(10)
              .toDate(),
            eventType: 'clockout',
            userId: 'user-id-3',
          },
          {
            id: 'clockevent-id-3',
            eventTime: moment()
              .utc()
              .hour(8)
              .minute(15)
              .toDate(),
            eventType: 'clockin',
            userId: 'user-id-3',
          },
          {
            id: 'clockevent-id-4',
            eventTime: moment()
              .utc()
              .hour(8)
              .minute(15)
              .toDate(),
            eventType: 'clockout',
            userId: 'user-id-3',
          },
        ],
        tenantId: '',
        customerId: '',
        siteId: '',
        serviceId: '',
        serviceName: '',
        instructions: '',
        shiftType: shiftTypeValue.fixed.value,
      },
      {
        id: 'shift-id-9',
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
            userRoles: [],
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
          {
            id: 'clockevent-id-2',
            eventTime: moment()
              .utc()
              .hour(8)
              .minute(10)
              .toDate(),
            eventType: 'clockout',
            userId: 'user-id-3',
          },
          {
            id: 'clockevent-id-3',
            eventTime: moment()
              .utc()
              .hour(8)
              .minute(15)
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
        shiftType: shiftTypeValue.fixed.value,
      },
      {
        id: 'shift-id-10',
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
            userRoles: [],
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
          {
            id: 'clockevent-id-2',
            eventTime: moment()
              .utc()
              .hour(8)
              .minute(10)
              .toDate(),
            eventType: 'clockout',
            userId: 'user-id-3',
          },
        ],
        tenantId: '',
        customerId: '',
        siteId: '',
        serviceId: '',
        serviceName: '',
        instructions: '',
        shiftType: shiftTypeValue.fixed.value,
      },
      {
        id: 'shift-id-11',
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
            userRoles: [],
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
        shiftType: shiftTypeValue.fixed.value,
      },
      {
        id: 'shift-id-12',
        siteName: '',
        start: moment().utc()
          .add(-4, 'hours')
          .toDate(),
        end: moment().utc()
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
            eventTime: moment().utc()
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
      {
        id: 'shift-id-13',
        siteName: '',
        start: moment().utc()
          .add(2, 'seconds')
          .toDate(),
        end: moment().utc()
          .add(10, 'seconds')
          .toDate(),
        users: [
          {
            id: 'user-id-3',
            firstName: 'Wiz',
            lastName: 'Khaleefa',
          },
        ],
        clockEvents: [],
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
