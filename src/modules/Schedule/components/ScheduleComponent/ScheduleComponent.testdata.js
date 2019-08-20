// @flow
import moment from 'moment-timezone';
import type { Shift, User } from '../../../../shared/types/schedule.types';
import { shiftTypeValue } from '../../../../shared/types/schedule.types';

export default class ScheduleComponentTestData {
  static getTestUsers(): User[] {
    return [
      {
        id: 'fake-user-id-1',
        firstName: 'User1',
        lastName: 'Teamster',
        userRole: 'User',
      },
      {
        id: 'fake-user-id-2',
        firstName: 'User2',
        lastName: 'Teamster',
        userRole: 'User',
      },
      {
        id: 'fake-user-id-3',
        firstName: 'User3',
        lastName: 'Teamster',
        userRole: 'Admin',
      },
    ];
  }

  static getRepeatingShift(): Shift {
    return {
      siteName: 'n',
      start: new Date('1995-12-17T03:24:00'),
      end: new Date('1995-12-17T03:24:00'),
      serviceName: 's',
      shiftType: shiftTypeValue.repeating.value,
    };
  }

  static getAssignedShiftsForToday(): Shift[] {
    return [
      {
        id: 'shift-id-3',
        siteName: '',
        start: moment()
          .hour(8)
          .toDate(),
        end: moment()
          .hour(9)
          .toDate(),
        users: [
          {
            id: 'user-id-1',
            firstName: 'Denise',
            lastName: 'Rodman',
            userRole: '',
          },
          {
            id: 'user-id-2',
            firstName: 'Horace',
            lastName: 'Grant',
            userRole: '',
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
          .hour(8)
          .toDate(),
        end: moment()
          .hour(9)
          .toDate(),
        users: [
          {
            id: 'user-id-3',
            firstName: 'Wiz',
            lastName: 'Khaleefa',
            userRole: '',
          },
        ],
        clockEvents: [],
        shiftType: shiftTypeValue.fixed.value,
        tenantId: '',
        customerId: '',
        siteId: '',
        serviceId: '',
        serviceName: '',
        instructions: '',
      },
    ];
  }

  static getExceptions(): Shift[] {
    return [
      {
        id: '2',
        siteName: 'Deliveron',
        start: moment()
          .utc()
          .hour(7)
          .add(-1, 'd')
          .toDate(),
        end: moment()
          .utc()
          .hour(9)
          .add(-1, 'd')
          .toDate(),
        users: [
          {
            firstName: 'Brian',
            id: '3b1e207e-086b-4283-a66b-085c566004cb',
            lastName: 'Cary',
            payRate: 13.89,
          },
        ],
        tenantId: '',
        customerId: '',
        siteId: '',
        serviceId: '',
        serviceName: 'General Service',
        instructions: '',
        clockEvents: [],
        hours: 2,
        coverage: [],
        shiftType: 1,
      },
      {
        id: '1',
        siteName: 'TEAM Software',
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
            firstName: 'Brian',
            id: '3b1e207e-086b-4283-a66b-085c566004cb',
            lastName: 'Cary',
            payRate: 13.89,
          },
        ],
        tenantId: '',
        customerId: '',
        siteId: '1',
        serviceId: '',
        serviceName: 'General Service',
        instructions: '',
        clockEvents: [],
        hours: 1,
        coverage: [],
        shiftType: 1,
      },
    ];
  }

  static getException(): Shift[] {
    return [
      {
        id: '1',
        siteName: 'TEAM Software',
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
            firstName: 'Brian',
            id: '3b1e207e-086b-4283-a66b-085c566004cb',
            lastName: 'Cary',
            payRate: 13.89,
          },
        ],
        tenantId: '',
        customerId: '',
        siteId: '1',
        serviceId: '',
        serviceName: 'General Service',
        instructions: '',
        clockEvents: [],
        hours: 1,
        coverage: [],
        shiftType: 1,
      },
    ];
  }

  static getOfferedShifts(): Shift[] {
    return [
      {
        id: 'offered-shift-id-1',
        siteName: '',
        start: moment()
          .hour(8)
          .toDate(),
        end: moment()
          .hour(9)
          .toDate(),
        users: [],
        isOffered: true,
        offeredUsers: [
          'user-id-1',
          'user-id-2',
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
        id: 'offered-shift-id-2',
        siteName: '',
        start: moment()
          .hour(8)
          .toDate(),
        end: moment()
          .hour(9)
          .toDate(),
        users: [],
        isOffered: true,
        offeredUsers: [
          'user-id-1',
          'user-id-2',
        ],
        clockEvents: [],
        shiftType: shiftTypeValue.fixed.value,
        tenantId: '',
        customerId: '',
        siteId: '',
        serviceId: '',
        serviceName: '',
        instructions: '',
      },
    ];
  }
}
