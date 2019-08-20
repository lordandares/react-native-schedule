import moment from 'moment-timezone';
import type { Shift } from '../../../../shared/types/schedule.types';

class SiteShiftComponentTestData {
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
          .utc()
          .hour(7)
          .toDate(),
        end: moment()
          .utc()
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
          .utc()
          .add(1, 'd')
          .hour(6)
          .toDate(),
        end: moment()
          .utc()
          .add(1, 'd')
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
          .utc()
          .add(2, 'd')
          .hour(5)
          .toDate(),
        end: moment()
          .utc()
          .add(2, 'd')
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
          .utc()
          .add(3, 'd')
          .hour(4)
          .toDate(),
        end: moment()
          .utc()
          .add(3, 'd')
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

  static getShiftsOnSameDay(): Shift[] {
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

  static getShiftsToday(): Shift[] {
    return [
      {
        id: '1',
        siteName: 'TEAM Software',
        start: moment(),
        end: moment().hour(9).toDate(),
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
          .utc()
          .hour(7)
          .toDate(),
        end: moment()
          .utc()
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
    ];
  }

  static getShiftsTomorrow(): Shift[] {
    return [
      {
        id: '1',
        siteName: 'TEAM Software',
        start: moment().add(1, 'd'),
        end: moment()
          .add(1, 'd')
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
    ];
  }

  static getShifts4daysFromNow(): Shift[] {
    return [
      {
        id: '1',
        siteName: 'TEAM Software',
        start: moment()
          .add(4, 'd')
          .toDate(),
        end: moment()
          .add(4, 'd')
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
    ];
  }

  static getShiftsWithoutTomorrow(): Shift[] {
    return [
      {
        id: '1',
        siteName: 'TEAM Software',
        start: moment(),
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
        siteName: 'TEAM Software',
        start: moment.utc().add(4, 'd'),
        end: moment()
          .add(1, 'd')
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
    ];
  }
}

export default SiteShiftComponentTestData;
