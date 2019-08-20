// @flow
import moment from 'moment-timezone';
import type { WorkTicket } from '@next/schedule/types/workTicket.types';
import type { Shift } from '../types/schedule.types';
import { shiftTypeValue, ClockEventTypes } from '../types/schedule.types';

class TestData {
  static getSomeUnassignedShiftsForToday(): Shift[] {
    return [
      {
        id: 'shift-id-1',
        siteName: '',
        start: moment()
          .hour(8)
          .toDate(),
        end: moment()
          .hour(9)
          .toDate(),
        users: [],
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
        id: 'shift-id-2',
        siteName: '',
        start: moment()
          .hour(8)
          .toDate(),
        end: moment()
          .hour(9)
          .toDate(),
        users: [],
        tenantId: '',
        customerId: '',
        siteId: '',
        serviceId: '',
        serviceName: '',
        instructions: '',
        shiftType: shiftTypeValue.fixed.value,
        clockEvents: [],
      },
    ];
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
    ];
  }

  static getShifts(): Shift[] {
    return [
      {
        id: '1',
        siteName: 'TEAM Software',
        start: moment()
          .hour(8)
          .toDate(),
        end: moment()
          .hour(9)
          .toDate(),
        users: [],
        tenantId: '',
        customerId: '',
        siteId: '1',
        serviceId: '',
        serviceName: '',
        instructions: '',
        clockEvents: [],
        hours: 1,
        coverage: [],
        shiftType: 1,
      },
      {
        id: '2',
        siteName: 'Deliveron',
        start: moment()
          .hour(7)
          .toDate(),
        end: moment()
          .hour(9)
          .toDate(),
        users: [],
        tenantId: '',
        customerId: '',
        siteId: '',
        serviceId: '',
        serviceName: '',
        instructions: '',
        clockEvents: [],
        hours: 2,
        coverage: [],
        shiftType: 1,
      },
      {
        id: '3',
        siteName: 'Quest Center',
        start: moment()
          .hour(6)
          .toDate(),
        end: moment()
          .hour(9)
          .toDate(),
        users: [],
        tenantId: '',
        customerId: '',
        siteId: '',
        serviceId: '',
        serviceName: '',
        instructions: '',
        clockEvents: [],
        hours: 3,
        coverage: [],
        shiftType: 1,
      },
      {
        id: '4',
        siteName: 'Millard West',
        start: moment()
          .hour(5)
          .toDate(),
        end: moment()
          .hour(9)
          .toDate(),
        users: [],
        tenantId: '',
        customerId: '',
        siteId: '',
        serviceId: '',
        serviceName: '',
        instructions: '',
        clockEvents: [],
        hours: 4,
        coverage: [],
        shiftType: 1,
      },
      {
        id: '5',
        siteName: 'Travel and Transport',
        start: moment()
          .hour(4)
          .toDate(),
        end: moment()
          .hour(9)
          .toDate(),
        users: [],
        tenantId: '',
        customerId: '',
        siteId: '',
        serviceId: '',
        serviceName: '',
        instructions: '',
        clockEvents: [],
        hours: 5,
        coverage: [],
        shiftType: 1,
      },
    ];
  }

  static getRepeatingShift(): Shift[] {
    return [
      {
        id: '1',
        siteName: 'Repeating Shift',
        start: moment()
          .startOf('day')
          .hour(3)
          .toDate(),
        end: moment()
          .startOf('day')
          .hour(16)
          .toDate(),
        users: [],
        tenantId: '',
        customerId: '',
        siteId: '',
        serviceId: '',
        serviceName: '',
        instructions: '',
        clockEvents: [],
        hours: 1,
        repeatingCoverage: [
          { DayOfTheWeek: 1, users: [] },
          { DayOfTheWeek: 2, users: [] },
          { DayOfTheWeek: 3, users: [] },
          { DayOfTheWeek: 4, users: [] },
          { DayOfTheWeek: 5, users: [] },
          { DayOfTheWeek: 6, users: [] },
          { DayOfTheWeek: 7, users: [] },
        ],
        shiftType: 2,
      },
      {
        id: '2',
        siteName: 'Repeating Shift with Recurrence Exception',
        start: moment()
          .startOf('day')
          .hour(3)
          .toDate(),
        end: moment()
          .startOf('day')
          .hour(16)
          .toDate(),
        users: [],
        tenantId: '',
        customerId: '',
        siteId: '',
        serviceId: '',
        serviceName: '',
        instructions: '',
        clockEvents: [],
        hours: 1,
        repeatingCoverage: [
          { DayOfTheWeek: 1, users: [] },
          { DayOfTheWeek: 2, users: [] },
          { DayOfTheWeek: 3, users: [] },
          { DayOfTheWeek: 4, users: [] },
          { DayOfTheWeek: 5, users: [] },
          { DayOfTheWeek: 6, users: [] },
          { DayOfTheWeek: 7, users: [] },
        ],
        shiftType: 2,
        recurrenceExceptionCount: 3,
      },
      {
        id: '3',
        siteName: 'Repeating Shift with Recurrence Exceptions',
        start: moment()
          .startOf('day')
          .hour(3)
          .toDate(),
        end: moment()
          .startOf('day')
          .hour(16)
          .toDate(),
        users: [],
        tenantId: '',
        customerId: '',
        siteId: '',
        serviceId: '',
        serviceName: '',
        instructions: '',
        clockEvents: [],
        hours: 1,
        repeatingCoverage: [
          { DayOfTheWeek: 1, users: [] },
          { DayOfTheWeek: 2, users: [] },
          { DayOfTheWeek: 3, users: [] },
          { DayOfTheWeek: 4, users: [] },
          { DayOfTheWeek: 5, users: [] },
          { DayOfTheWeek: 6, users: [] },
          { DayOfTheWeek: 7, users: [] },
        ],
        shiftType: 2,
        recurrenceExceptionCount: 1,
      },
    ];
  }

  static getShiftClockEvents() {
    return {
      id: '1',
      siteName: 'TEAM Software',
      start: moment()
        .hour(8)
        .toDate(),
      end: moment()
        .hour(9)
        .toDate(),
      users: [],
      tenantId: '',
      customerId: '',
      siteId: '1',
      serviceId: '',
      serviceName: '',
      instructions: '',
      hours: 1,
      coverage: [],
      shiftType: 1,
      siteTimeZone: 'America/Chicago',
      clockEvents: [
        {
          id: '1',
          eventTime: moment().toDate(),
          eventType: 'clockin',
          userId: 'awesome-user-id-1',
        },
        {
          id: '2',
          eventTime: moment().toDate(),
          eventType: 'clockout',
          userId: 'terrible-user-id-2',
        },
      ],
    };
  }

  static getShiftOnlyClockIn() {
    return {
      id: '1',
      siteName: 'TEAM Software',
      start: moment()
        .hour(8)
        .minutes(0)
        .seconds(0)
        .millisecond(0),
      end: moment()
        .hour(13)
        .minutes(0)
        .seconds(0)
        .millisecond(0),
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
      siteId: '1',
      serviceId: '',
      serviceName: '',
      instructions: '',
      hours: 1,
      coverage: [],
      shiftType: 1,
      siteTimeZone: 'America/Chicago',
      clockEvents: [
        {
          eventTime: moment()
            .hour(8)
            .minutes(0)
            .seconds(0)
            .millisecond(0),
          eventType: ClockEventTypes.ClockIn,
          id: 'de5533f9-a5f2-45d9-a7e3-8e73d0560944',
          shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
          userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
        },
      ],
    };
  }

  static getShiftNoClockIn() {
    return {
      id: '1',
      siteName: 'TEAM Software',
      start: moment()
        .hour(8)
        .minutes(0)
        .seconds(0)
        .millisecond(0),
      end: moment()
        .hour(13)
        .minutes(0)
        .seconds(0)
        .millisecond(0),
      users: [],
      tenantId: '',
      customerId: '',
      siteId: '1',
      serviceId: '',
      serviceName: '',
      instructions: '',
      hours: 1,
      coverage: [],
      shiftType: 1,
      siteTimeZone: 'America/Chicago',
      clockEvents: [],
      clockExceptions: [
        {
          exception: 'No Clock In',
        },
      ],
    };
  }

  static getShiftOnlyClockOut() {
    return {
      id: '1',
      siteName: 'TEAM Software',
      start: moment()
        .hour(8)
        .minutes(0)
        .seconds(0)
        .millisecond(0),
      end: moment()
        .hour(13)
        .minutes(0)
        .seconds(0)
        .millisecond(0),
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
      siteId: '1',
      serviceId: '',
      serviceName: '',
      instructions: '',
      hours: 1,
      coverage: [],
      shiftType: 1,
      siteTimeZone: 'America/Chicago',
      clockEvents: [
        {
          eventTime: moment()
            .hour(8)
            .minutes(0)
            .seconds(0)
            .millisecond(0),
          eventType: ClockEventTypes.ClockOut,
          id: 'de5533f9-a5f2-45d9-a7e3-8e73d0560944',
          shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
          userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
        },
      ],
    };
  }

  static getShiftOnePairClockEvent() {
    return {
      id: '1',
      siteName: 'TEAM Software',
      start: moment()
        .hour(8)
        .minutes(0)
        .seconds(0)
        .millisecond(0),
      end: moment()
        .hour(13)
        .minutes(0)
        .seconds(0)
        .millisecond(0),
      users: [],
      tenantId: '',
      customerId: '',
      siteId: '1',
      serviceId: '',
      serviceName: '',
      instructions: '',
      hours: 1,
      coverage: [],
      shiftType: 1,
      siteTimeZone: 'America/Chicago',
      clockEvents: [
        {
          eventTime: moment()
            .hour(8)
            .minutes(0)
            .seconds(0)
            .millisecond(0),
          eventType: ClockEventTypes.ClockIn,
          id: 'de5533f9-a5f2-45d9-a7e3-8e73d0560944',
          shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
          userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
        },
        {
          eventTime: moment()
            .hour(9)
            .minutes(0)
            .seconds(0)
            .millisecond(0),
          eventType: ClockEventTypes.ClockOut,
          id: '4a94eede-01c5-49d0-ad5d-ab2703b39b7b',
          shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
          userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
        },
      ],
    };
  }

  static getShiftMultipleClockEvents() {
    return {
      id: '1',
      siteName: 'TEAM Software',
      start: moment()
        .hour(8)
        .minutes(0)
        .seconds(0)
        .millisecond(0),
      end: moment()
        .hour(13)
        .minutes(0)
        .seconds(0)
        .millisecond(0),
      users: [],
      tenantId: '',
      customerId: '',
      siteId: '1',
      serviceId: '',
      serviceName: '',
      instructions: '',
      hours: 1,
      coverage: [],
      shiftType: 1,
      siteTimeZone: 'America/Chicago',
      clockEvents: [
        {
          eventTime: moment()
            .hour(8)
            .minutes(0)
            .seconds(0)
            .millisecond(0)
            .format(),
          eventType: ClockEventTypes.ClockIn,
          id: 'de5533f9-a5f2-45d9-a7e3-8e73d0560944',
          shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
          userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
        },
        {
          eventTime: moment()
            .hour(9)
            .minutes(0)
            .seconds(0)
            .millisecond(0)
            .format(),
          eventType: ClockEventTypes.ClockOut,
          id: '4a94eede-01c5-49d0-ad5d-ab2703b39b7b',
          shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
          userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
        },
        {
          eventTime: moment()
            .hour(10)
            .minutes(0)
            .seconds(0)
            .millisecond(0)
            .format(),
          eventType: ClockEventTypes.ClockIn,
          id: 'fa6f06cf-9411-4313-b4b7-5ab713aca0df',
          shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
          userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
        },
        {
          eventTime: moment()
            .hour(11)
            .minutes(0)
            .seconds(0)
            .millisecond(0)
            .format(),
          eventType: ClockEventTypes.ClockOut,
          id: '99cb60ae-8258-4dbe-a54b-a3a95cc48e26',
          shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
          userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
        },
      ],
    };
  }

  static getShiftOddClockEvents() {
    return {
      id: '1',
      siteName: 'TEAM Software',
      start: moment()
        .hour(8)
        .minutes(0)
        .seconds(0)
        .millisecond(0),
      end: moment()
        .hour(13)
        .minutes(0)
        .seconds(0)
        .millisecond(0),
      users: [],
      tenantId: '',
      customerId: '',
      siteId: '1',
      serviceId: '',
      serviceName: '',
      instructions: '',
      hours: 1,
      coverage: [],
      shiftType: 1,
      siteTimeZone: 'America/Chicago',
      clockEvents: [
        {
          eventTime: moment()
            .hour(8)
            .minutes(0)
            .seconds(0)
            .millisecond(0),
          eventType: ClockEventTypes.ClockIn,
          id: 'de5533f9-a5f2-45d9-a7e3-8e73d0560944',
          shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
          userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
        },
        {
          eventTime: moment()
            .hour(9)
            .minutes(0)
            .seconds(0)
            .millisecond(0),
          eventType: ClockEventTypes.ClockOut,
          id: '4a94eede-01c5-49d0-ad5d-ab2703b39b7b',
          shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
          userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
        },
        {
          eventTime: moment()
            .hour(10)
            .minutes(0)
            .seconds(0)
            .millisecond(0),
          eventType: ClockEventTypes.ClockIn,
          id: 'fa6f06cf-9411-4313-b4b7-5ab713aca0df',
          shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
          userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
        },
        {
          eventTime: moment()
            .hour(11)
            .minutes(0)
            .seconds(0)
            .millisecond(0),
          eventType: ClockEventTypes.ClockOut,
          id: '99cb60ae-8258-4dbe-a54b-a3a95cc48e26',
          shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
          userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
        },
        {
          eventTime: moment()
            .hour(12)
            .minutes(0)
            .seconds(0)
            .millisecond(0),
          eventType: ClockEventTypes.ClockIn,
          id: '99cb60ae-8258-4dbe-a54b-a3a95cc48e26',
          shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
          userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
        },
      ],
    };
  }

  static getShiftRoundedUpClockEvents() {
    return [
      {
        id: '1',
        siteName: 'TEAM Software',
        start: moment()
          .hour(8)
          .minutes(0)
          .seconds(0)
          .millisecond(0),
        end: moment()
          .hour(13)
          .minutes(0)
          .seconds(0)
          .millisecond(0),
        users: [],
        tenantId: '',
        customerId: '',
        siteId: '1',
        serviceId: '',
        serviceName: '',
        instructions: '',
        hours: 1,
        coverage: [],
        shiftType: 1,
        siteTimeZone: 'America/Chicago',
        clockEvents: [
          {
            eventTime: moment()
              .hour(8)
              .minutes(0)
              .seconds(0)
              .millisecond(0),
            eventType: ClockEventTypes.ClockIn,
            id: 'de5533f9-a5f2-45d9-a7e3-8e73d0560944',
            shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
            userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
          },
          {
            eventTime: moment()
              .hour(10)
              .minutes(34),
            eventType: ClockEventTypes.ClockOut,
            id: '4a94eede-01c5-49d0-ad5d-ab2703b39b7b',
            shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
            userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
          },
        ],
      },
      {
        id: '2',
        siteName: 'TEAM Software',
        start: moment()
          .hour(8)
          .minutes(0)
          .seconds(0)
          .millisecond(0),
        end: moment()
          .hour(13)
          .minutes(0)
          .seconds(0)
          .millisecond(0),
        users: [],
        tenantId: '',
        customerId: '',
        siteId: '1',
        serviceId: '',
        serviceName: '',
        instructions: '',
        hours: 1,
        coverage: [],
        shiftType: 1,
        siteTimeZone: 'America/Chicago',
        clockEvents: [
          {
            eventTime: moment()
              .hour(8)
              .minutes(0)
              .seconds(0)
              .millisecond(0),
            eventType: ClockEventTypes.ClockIn,
            id: 'de5533f9-a5f2-45d9-a7e3-8e73d0560944',
            shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
            userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
          },
          {
            eventTime: moment()
              .hour(10)
              .minutes(32),
            eventType: ClockEventTypes.ClockOut,
            id: '4a94eede-01c5-49d0-ad5d-ab2703b39b7b',
            shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
            userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
          },
        ],
      },
    ];
  }

  static getShiftMoreHoursWorkedClockEvents() {
    return {
      id: '1',
      siteName: 'TEAM Software',
      start: moment()
        .hour(8)
        .minutes(0)
        .seconds(0)
        .millisecond(0),
      end: moment()
        .hour(13)
        .minutes(0)
        .seconds(0)
        .millisecond(0),
      users: [],
      tenantId: '',
      customerId: '',
      siteId: '1',
      serviceId: '',
      serviceName: '',
      instructions: '',
      hours: 1,
      coverage: [],
      shiftType: 1,
      siteTimeZone: 'America/Chicago',
      clockEvents: [
        {
          eventTime: moment()
            .hour(8)
            .minutes(0)
            .seconds(0)
            .millisecond(0),
          eventType: ClockEventTypes.ClockIn,
          id: 'de5533f9-a5f2-45d9-a7e3-8e73d0560944',
          shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
          userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
        },
        {
          eventTime: moment()
            .hour(18)
            .minutes(0)
            .seconds(0)
            .millisecond(0),
          eventType: ClockEventTypes.ClockOut,
          id: '4a94eede-01c5-49d0-ad5d-ab2703b39b7b',
          shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
          userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
        },
      ],
    };
  }

  static getShiftFixedClockEvents() {
    return {
      id: '1',
      siteName: 'TEAM Software',
      start: moment('01/01/2001')
        .hour(8)
        .minutes(0)
        .seconds(0)
        .millisecond(0),
      end: moment('01/01/2001')
        .hour(13)
        .minutes(0)
        .seconds(0)
        .millisecond(0),
      users: [],
      tenantId: '',
      customerId: '',
      siteId: '1',
      serviceId: '',
      serviceName: '',
      instructions: '',
      hours: 1,
      coverage: [],
      shiftType: 1,
      siteTimeZone: 'America/Chicago',
      clockEvents: [
        {
          eventTime: moment('01/01/2001')
            .hour(8)
            .minutes(0)
            .seconds(0)
            .millisecond(0)
            .format(),
          eventType: ClockEventTypes.ClockIn,
          id: 'de5533f9-a5f2-45d9-a7e3-8e73d0560944',
          shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
          userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
        },
        {
          eventTime: moment('01/01/2001')
            .hour(18)
            .minutes(0)
            .seconds(0)
            .millisecond(0)
            .format(),
          eventType: ClockEventTypes.ClockOut,
          id: '4a94eede-01c5-49d0-ad5d-ab2703b39b7b',
          shiftId: '079192e7-7311-44c8-a952-90559ccf54b5_2018-05-21T15:00:00Z',
          userId: 'e12d02f0-2970-4e8a-8f99-6b522ede8c21',
        },
      ],
    };
  }

  static getClockEvents() {
    return [
      {
        id: '1',
        eventTime: moment().toDate(),
        eventType: ClockEventTypes.ClockIn,
        userId: 'awesome-user-id-1',
      },
      {
        id: '2',
        eventTime: moment().toDate(),
        eventType: ClockEventTypes.ClockOut,
        userId: 'terrible-user-id-2',
      },
    ];
  }

  static getClockEventsNoClockIn() {
    return [
      {
        id: '2',
        eventTime: moment().toDate(),
        eventType: ClockEventTypes.ClockOut,
        userId: 'terrible-user-id-2',
      },
    ];
  }

  static getWorkList(): WorkTicket[] {
    return [
      {
        id: '82ca5237-068f-4977-9613-9648826d883f',
        tenantId: '3f6e5fae-e515-4ae7-82ab-897d7728458f',
        title: 'Work title 1',
        dueDate: moment(),
        instructions: 'Instructions 1',
        workTicketStatus: {
          status: 'Open',
          modified: moment(),
          modifiedBy: 'User test',
        },
      },
      {
        id: 'ebd137df-5d0e-40e0-8034-933c2817e568',
        tenantId: '3f6e5fae-e515-4ae7-82ab-897d7728458f',
        title: 'Work title 2',
        dueDate: moment().add(1, 'd'),
        instructions: 'Instructions 2',
        workTicketStatus: {
          status: 'Open',
          modified: moment(),
          modifiedBy: 'User test',
        },
      },
      {
        id: 'efc2b4d8-a43c-4e57-9a5d-52d5e7cabac4',
        tenantId: '3f6e5fae-e515-4ae7-82ab-897d7728458f',
        title: 'Work title 3',
        dueDate: moment().add(2, 'd'),
        instructions: 'Instructions 3',
        workTicketStatus: {
          status: 'Open',
          modified: moment(),
          modifiedBy: 'User test',
        },
      },
    ];
  }

  static getClosedWorkList(): WorkTicket[] {
    return [
      {
        id: '82ca5237-068f-4977-9613-9648826d883f',
        tenantId: '3f6e5fae-e515-4ae7-82ab-897d7728458f',
        title: 'Closed Work title 1',
        dueDate: moment(),
        instructions: 'Instructions 1',
        workTicketStatus: {
          status: 'Closed',
          modified: moment(),
          modifiedBy: 'User test 1',
        },
      },
      {
        id: '82ca5237-068f-4977-9613-9648826d884f',
        tenantId: '3f6e5fae-e515-4ae7-82ab-897d7728458f',
        title: 'Closed Work title 2',
        dueDate: moment(),
        instructions: 'Instructions 2',
        workTicketStatus: {
          status: 'Closed',
          modified: moment(),
          modifiedBy: 'User test 2',
        },
      },
    ];
  }
}

export default TestData;
