/* eslint-disable max-lines */
import React from 'react';
import { shallow } from 'enzyme';
import MockDate from 'mockdate';

import UserClockEvents from './UserClockEvents';
import TestData from '../../testUtils/TestData';
import { formatEventTime, getEventTypeVerbiage } from '../../utils/clockInOut/clockInOutFormatter';
import { shiftTypeValue } from '../../types/schedule.types';


MockDate.set('2017-01-01T23:59:59');

jest.mock('react-i18next', () => ({
  withNamespaces: () => (lComponent) => {
    const loginComponent = lComponent;
    loginComponent.defaultProps = { ...lComponent.defaultProps, t: key => key };
    return loginComponent;
  },
  reactI18nextModule: jest.fn(),
}));


jest.mock('react-native-localize', () => ({
  RNLocalize: {
    language: 'en',
    languages: ['en'],
  },
  getLocales: jest.fn(() => [{ languageCode: 'en' }]),
}));

describe('UserClockEvents', () => {
  const timezone = 'America/Chicago';

  it('renders properly with null clockEvents', () => {
    shallow(<UserClockEvents clockEvents={null} />);
  });

  it('renders properly with clockEvents', () => {
    const clockEvents = TestData.getClockEvents();
    shallow(<UserClockEvents clockEvents={clockEvents} siteTimeZone={timezone} />).dive();
  });

  it('renders the correct amount of clockEvents', () => {
    const clockEvents = TestData.getClockEvents();
    const expected = clockEvents.length;
    const container = shallow(<UserClockEvents clockEvents={clockEvents} siteTimeZone={timezone} />).dive();
    const result = container.find({ className: 'clockEvent' });
    const actual = result.length;
    expect(actual).toBe(expected);
  });

  it('formats the time as blank when null', () => {
    const clockEvent = TestData.getClockEvents()[0];
    clockEvent.eventTime = null;

    const actual = formatEventTime(clockEvent.eventTime, timezone);
    const expected = '';
    expect(actual).toBe(expected);
  });

  it('gets the event type verbiage for clockin', () => {
    const clockEvent = TestData.getClockEvents()[0];
    clockEvent.eventType = 'clockin';

    const actual = getEventTypeVerbiage(clockEvent.eventType);
    const expected = 'In ';
    expect(actual).toBe(expected);
  });

  it('gets the event type verbiage for clockout', () => {
    const clockEvent = TestData.getClockEvents()[0];
    clockEvent.eventType = 'clockout';

    const actual = getEventTypeVerbiage(clockEvent.eventType);
    const expected = 'Out';
    expect(actual).toBe(expected);
  });

  it('gets the event type verbiage as blank for an invalid event type', () => {
    const clockEvent = TestData.getClockEvents()[0];
    clockEvent.eventType = 'invalid-type-in-here';

    const actual = getEventTypeVerbiage(clockEvent.eventType);
    const expected = '';
    expect(actual).toBe(expected);
  });

  it('gets the event type verbiage as blank for a null event type', () => {
    const clockEvent = TestData.getClockEvents()[0];
    clockEvent.eventType = null;

    const actual = getEventTypeVerbiage(clockEvent.eventType);
    const expected = '';
    expect(actual).toBe(expected);
  });

  it('should show the time display with a shift with a clock out ', () => {
    const shift = TestData.getShiftOnlyClockOut();
    const component = shallow(<UserClockEvents
      clockEvents={shift.clockEvents}
      siteTimeZone={shift.siteTimeZone}
      shiftStart={shift.start}
      shiftEnd={shift.end}
    />).dive();

    const displayTime = '0 / 5 hrs';

    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();

    expect(time).toBe(displayTime);
  });

  it('should show the time display with a shift with a clock in ', () => {
    const shift = TestData.getShiftOnlyClockIn();
    const component = shallow(<UserClockEvents
      clockEvents={shift.clockEvents}
      siteTimeZone={shift.siteTimeZone}
      shiftStart={shift.start}
      shiftEnd={shift.end}
    />).dive();

    const displayTime = '0 / 5 hrs';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();

    expect(time).toBe(displayTime);
  });

  it('should show the budgeted hours if its a Flex Repeating Type ', () => {
    const shift = TestData.getShiftOnlyClockIn();
    const shiftDuration = 6;
    const component = shallow(<UserClockEvents
      clockEvents={shift.clockEvents}
      siteTimeZone={shift.siteTimeZone}
      shiftStart={shift.start}
      shiftEnd={shift.end}
      shiftType={shiftTypeValue.flexRepeating.value}
      shiftDuration={shiftDuration}
    />).dive();

    const displayTime = `0 / ${shiftDuration} hrs`;
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();

    expect(time).toBe(displayTime);
  });


  it('should show the budgeted hours if its a Flex Fixed Type ', () => {
    const shift = TestData.getShiftOnlyClockIn();
    const shiftDuration = 6;
    const component = shallow(<UserClockEvents
      clockEvents={shift.clockEvents}
      siteTimeZone={shift.siteTimeZone}
      shiftStart={shift.start}
      shiftEnd={shift.end}
      shiftType={shiftTypeValue.flexFixed.value}
      shiftDuration={shiftDuration}
    />).dive();

    const displayTime = `0 / ${shiftDuration} hrs`;
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();

    expect(time).toBe(displayTime);
  });

  it('should not show the budgeted hours if its a Fixed Type ', () => {
    const shift = TestData.getShiftOnlyClockIn();
    const shiftDuration = 6;
    const component = shallow(<UserClockEvents
      clockEvents={shift.clockEvents}
      siteTimeZone={shift.siteTimeZone}
      shiftStart={shift.start}
      shiftEnd={shift.end}
      shiftType={shiftTypeValue.fixed.value}
      shiftDuration={shiftDuration}
    />).dive();

    const displayTime = '0 / 5 hrs';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();

    expect(time).toBe(displayTime);
  });


  it('should not show the budgeted hours if its a Repeating Type ', () => {
    const shift = TestData.getShiftOnlyClockIn();
    const shiftDuration = 6;
    const component = shallow(<UserClockEvents
      clockEvents={shift.clockEvents}
      siteTimeZone={shift.siteTimeZone}
      shiftStart={shift.start}
      shiftEnd={shift.end}
      shiftType={shiftTypeValue.repeating.value}
      shiftDuration={shiftDuration}
    />).dive();

    const displayTime = '0 / 5 hrs';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();

    expect(time).toBe(displayTime);
  });

  it('should show the time display with a shift with a pair clock in - clock out', () => {
    const shift = TestData.getShiftOnePairClockEvent();
    const shiftDuration = 4;
    const component = shallow(<UserClockEvents
      clockEvents={shift.clockEvents}
      siteTimeZone={shift.siteTimeZone}
      shiftStart={shift.start}
      shiftEnd={shift.end}
      shiftDuration={shiftDuration}
    />).dive();

    const displayTime = '1 / 5 hrs';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();

    expect(time).toBe(displayTime);
  });

  it('should show the time display with a shift with multiples pairs clock in - clock out', () => {
    const shift = TestData.getShiftMultipleClockEvents();
    const component = shallow(<UserClockEvents
      clockEvents={shift.clockEvents}
      siteTimeZone={shift.siteTimeZone}
      shiftStart={shift.start}
      shiftEnd={shift.end}
    />).dive();

    const displayTime = '2 / 5 hrs';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();

    expect(time).toBe(displayTime);
  });

  it('should show the time display with a shift with odd pairs clock in - clock out', () => {
    const shift = TestData.getShiftOddClockEvents();
    const component = shallow(<UserClockEvents
      clockEvents={shift.clockEvents}
      siteTimeZone={shift.siteTimeZone}
      shiftStart={shift.start}
      shiftEnd={shift.end}
    />).dive();

    const displayTime = '2 / 5 hrs';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();

    expect(time).toBe(displayTime);
  });

  it('should round up the time 2.6 when the sum gives 2.566', () => {
    const shift = TestData.getShiftRoundedUpClockEvents()[0];
    const component = shallow(<UserClockEvents
      clockEvents={shift.clockEvents}
      siteTimeZone={shift.siteTimeZone}
      shiftStart={shift.start}
      shiftEnd={shift.end}
    />).dive();

    const displayTime = '2.6 / 5 hrs';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();
    expect(time).toBe(displayTime);
  });

  it('should round up the time 2.6 when the sum gives 2.5333', () => {
    const shift = TestData.getShiftRoundedUpClockEvents()[1];
    const component = shallow(<UserClockEvents
      clockEvents={shift.clockEvents}
      siteTimeZone={shift.siteTimeZone}
      shiftStart={shift.start}
      shiftEnd={shift.end}
    />).dive();

    const displayTime = '2.6 / 5 hrs';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();
    expect(time).toBe(displayTime);
  });

  it('should display the text with the styledRed - total actual hours > scheduled shift duration ', () => {
    const shift = TestData.getShiftMoreHoursWorkedClockEvents();
    const component = shallow(<UserClockEvents
      clockEvents={shift.clockEvents}
      siteTimeZone={shift.siteTimeZone}
      shiftStart={shift.start}
      shiftEnd={shift.end}
    />).dive();

    const styles = component
      .find({ id: 'display-hours' })
      .dive()
      .props().style;
    expect(styles.length).toBe(2);
  });

  it('should display exceptions', () => {
    const shift = TestData.getShiftNoClockIn();
    const component = shallow(<UserClockEvents
      clockEvents={shift.clockEvents}
      exceptions={shift.clockExceptions}
      siteTimeZone={shift.siteTimeZone}
      shiftStart={shift.start}
      shiftEnd={shift.end}
    />).dive();

    const exceptions = component
      .find({ id: 'exceptions-text' });
    expect(exceptions.length).toBe(1);
  });
});
