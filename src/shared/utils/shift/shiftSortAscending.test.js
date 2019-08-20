import moment from 'moment-timezone';
import { Shift } from '../../types/schedule.types';
import shiftSortAscending from './shiftSortAscending';

describe('shift/nameHelpers', () => {
  it('should sort shifts Ascending based on start date with 2 shifts', () => {
    const shifts: Shift[] = [
      {
        start: moment('2018-01-01T02:00:00Z').toDate(), // January 1 2018, 2AM
        end: moment('2018-01-01T05:00:00Z').toDate(), // January 1 2018, 5AM
      },
      {
        start: moment('2018-01-01T01:00:00Z').toDate(), // January 1 2018, 1AM
        end: moment('2018-01-01T05:00:00Z').toDate(), // January 1 2018, 5AM
      },
    ];
    shifts.sort(shiftSortAscending);
    expect(shifts[0].start).toEqual(moment('2018-01-01T01:00:00Z').toDate());
  });

  it('should sort shifts Ascending based on start date with 3 shifts', () => {
    const shifts: Shift[] = [
      {
        id: '1',
        start: moment('2018-01-01T02:00:00Z').toDate(), // January 1 2018, 2AM
        end: moment('2018-01-01T05:00:00Z').toDate(), // January 1 2018, 5AM
      },
      {
        id: '2',
        start: moment('2018-01-01T01:00:00Z').toDate(), // January 1 2018, 1AM
        end: moment('2018-01-01T05:00:00Z').toDate(), // January 1 2018, 5AM
      },
      {
        id: '3',
        start: moment('2018-01-01T00:00:00Z').toDate(), // January 1 2018, 12AM
        end: moment('2018-01-01T05:00:00Z').toDate(), // January 1 2018, 5AM
      },
    ];
    shifts.sort(shiftSortAscending);
    expect(shifts[0].id + shifts[1].id + shifts[2].id).toEqual('321');
  });

  it('should sort shifts Ascending based on start date, secondary on hours when start is the same', () => {
    const shifts: Shift[] = [
      {
        id: '1',
        start: moment('2018-01-01T02:00:00Z').toDate(), // January 1 2018, 2AM
        end: moment('2018-01-01T05:00:00Z').toDate(), // January 1 2018, 5AM
        hours: 3,
      },
      {
        id: '2',
        start: moment('2018-01-01T01:00:00Z').toDate(), // January 1 2018, 1AM
        end: moment('2018-01-01T08:00:00Z').toDate(), // January 1 2018, 8AM
        hours: 7,
      },
      {
        id: '3',
        start: moment('2018-01-01T01:00:00Z').toDate(), // January 1 2018, 1AM
        end: moment('2018-01-01T05:00:00Z').toDate(), // January 1 2018, 5AM
        hours: 4,
      },
    ];
    shifts.sort(shiftSortAscending);
    expect(shifts[0].id + shifts[1].id + shifts[2].id).toEqual('321');
  });

  it('should sort shifts Ascending based on start date' +
    'secondary on hours when start is the same with 4 shifts', () => {
    const shifts: Shift[] = [
      {
        id: '1',
        start: moment('2018-01-01T02:00:00Z').toDate(), // January 1 2018, 2AM
        end: moment('2018-01-01T05:00:00Z').toDate(), // January 1 2018, 5AM
        hours: 3,
      },
      {
        id: '2',
        start: moment('2018-01-01T01:00:00Z').toDate(), // January 1 2018, 1AM
        end: moment('2018-01-01T08:00:00Z').toDate(), // January 1 2018, 8AM
        hours: 7,
      },
      {
        id: '3',
        start: moment('2018-01-01T01:00:00Z').toDate(), // January 1 2018, 1AM
        end: moment('2018-01-01T05:00:00Z').toDate(), // January 1 2018, 5AM
        hours: 4,
      },
      {
        id: '4',
        start: moment('2018-01-01T02:00:00Z').toDate(), // January 1 2018, 2AM
        end: moment('2018-01-01T04:00:00Z').toDate(), // January 1 2018, 4AM
        hours: 2,
      },
    ];
    shifts.sort(shiftSortAscending);
    expect(shifts[0].id + shifts[1].id + shifts[2].id + shifts[3].id).toEqual('3241');
  });
});
