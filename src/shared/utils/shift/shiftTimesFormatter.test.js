import moment from 'moment-timezone';
import formatStartEndShift from './shiftTimesFormatter';

describe('shift/shiftTimesFormatter', () => {
  it('should return a formatted subtitle with the default timezone (UTC)', () => {
    const startTime: Date = moment('2018-01-01T02:00:00Z').toDate(); // January 1 2018, 2AM
    const endTime: Date = moment('2018-01-01T05:00:00Z').toDate(); // January 1 2018, 5AM
    const siteTimeZone: string = '';
    const startDate = moment(startTime).format('ddd, MMM D');
    const timeToStart = moment(startTime).format('LT');
    const timeToEnd = moment(endTime).format('LT');
    const expected: string = `${startDate} ${timeToStart} - ${timeToEnd} ${moment
      .tz(siteTimeZone)
      .format('z')} `;

    const formattedSubtitle: string = formatStartEndShift(
      startTime,
      endTime,
      siteTimeZone,
      true,
    );

    expect(formattedSubtitle).toEqual(expected);
  });

  it('should return a formatted subtitle with the New York timezone', () => {
    const startTime: Date = moment('2018-01-01T02:00:00Z').toDate(); // January 1 2018, 2AM
    const endTime: Date = moment('2018-01-01T05:00:00Z').toDate(); // January 1 2018, 5AM
    const siteTimeZone: string = 'America/New_York';
    const startDate = moment(startTime).format('ddd, MMM D');
    const timeToStart = moment(startTime).format('LT');
    const timeToEnd = moment(endTime).format('LT');
    const expected: string = `${startDate} ${timeToStart} - ${timeToEnd} ${moment.tz(siteTimeZone).format('z')} `;

    const formattedSubtitle: string = formatStartEndShift(
      startTime,
      endTime,
      siteTimeZone,
      true,
    );

    expect(formattedSubtitle).toEqual(expected);
  });

  it('should return a formatted shift card time with the default timezone', () => {
    const startTime: Date = moment('2018-01-01T02:00:00Z').toDate(); // January 1 2018, 2AM
    const endTime: Date = moment('2018-01-01T05:00:00Z').toDate(); // January 1 2018, 5AM
    const siteTimeZone: string = '';
    const timeToStart = moment(startTime).format('LT');
    const timeToEnd = moment(endTime).format('LT');
    const expected: string = `${timeToStart} - ${timeToEnd} ${moment.tz(siteTimeZone).format('z')} `;

    const formattedSubtitle: string = formatStartEndShift(
      startTime,
      endTime,
      siteTimeZone,
      false,
    );

    expect(formattedSubtitle).toEqual(expected);
  });

  it('should return a formatted shift card time with the New York timezone', () => {
    const startTime: Date = moment('2018-01-01T02:00:00Z').toDate(); // January 1 2018, 2AM
    const endTime: Date = moment('2018-01-01T05:00:00Z').toDate(); // January 1 2018, 5AM
    const siteTimeZone: string = 'America/New_York';
    const timeToStart = moment(startTime).format('LT');
    const timeToEnd = moment(endTime).format('LT');
    const expected: string = `${timeToStart} - ${timeToEnd} ${moment.tz(siteTimeZone).format('z')} `;

    const formattedSubtitle: string = formatStartEndShift(
      startTime,
      endTime,
      siteTimeZone,
      false,
    );

    expect(formattedSubtitle).toEqual(expected);
  });
});
