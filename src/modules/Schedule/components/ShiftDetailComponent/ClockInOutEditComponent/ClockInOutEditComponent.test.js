/* eslint-disable max-lines */
import React from 'react';
import { shallow } from 'enzyme';
import ClockInOutEditComponent from './ClockInOutEditComponent';
import TestData from '../../../../../shared/testUtils/TestData';
import { formatEventTime, getEventType } from '../../../../../shared/utils/clockInOut/clockInOutFormatter';
import AnalyticsEvents from '../../../../../shared/constants/analyticsEvents';

const mockDismissModal = jest.fn();

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

jest.mock('react-native-navigation', () => ({
  Navigation: {
    events: () => ({
      bindComponent: jest.fn(),
    }),
    mergeOptions: jest.fn(),
    push: jest.fn(),
    dismissModal: jest.fn(() => mockDismissModal()),
  },
}));

jest.mock('react-i18next', () => ({
  withNamespaces: () => (lComponent) => {
    const loginComponent = lComponent;
    loginComponent.defaultProps = { ...lComponent.defaultProps, t: key => key };
    return loginComponent;
  },
  reactI18nextModule: jest.fn(),
}));

describe('ClockInOutEditComponent', () => {
  const timezone = 'America/Chicago';

  it('renders properly with null shift', () => {
    shallow(<ClockInOutEditComponent shift={null} />);
  });

  it('renders properly a shift with clockEvents', () => {
    const shift = TestData.getShiftClockEvents();
    shallow(<ClockInOutEditComponent shift={shift} />).dive();
  });

  // it('renders the correct amount of clockEvents', () => {
  //   const shift = TestData.getShiftClockEvents();
  //   const expected = shift.clockEvents.length;
  //   const container = shallow(<ClockInOutEditComponent shift={shift} />).dive();
  //   const result = container.find({ className: 'clockEvent' });
  //   const actual = result.length;
  //   expect(actual).toBe(expected);
  // });

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

    const actual = getEventType(clockEvent.eventType);
    const expected = 'Clock in ';
    expect(actual).toBe(expected);
  });

  it('gets the event type verbiage for clockout', () => {
    const clockEvent = TestData.getClockEvents()[0];
    clockEvent.eventType = 'clockout';

    const actual = getEventType(clockEvent.eventType);
    const expected = 'Clock out';
    expect(actual).toBe(expected);
  });

  it('gets the event type verbiage as blank for an invalid event type', () => {
    const clockEvent = TestData.getClockEvents()[0];
    clockEvent.eventType = 'invalid-type-in-here';

    const actual = getEventType(clockEvent.eventType);
    const expected = '';
    expect(actual).toBe(expected);
  });

  it('gets the event type as blank for a null event type', () => {
    const clockEvent = TestData.getClockEvents()[0];
    clockEvent.eventType = null;

    const actual = getEventType(clockEvent.eventType);
    const expected = '';
    expect(actual).toBe(expected);
  });

  it('should show the time display with a shift with a clock out ', () => {
    const shift = TestData.getShiftOnlyClockOut();
    const component = shallow(<ClockInOutEditComponent shift={shift} />).dive();

    const displayTime = '0 / 5 COMMON.HRS';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();

    expect(time).toBe(displayTime);
  });

  it('should show the time display with a shift with a clock in ', () => {
    const shift = TestData.getShiftOnlyClockIn();
    const component = shallow(<ClockInOutEditComponent shift={shift} />).dive();

    const displayTime = '0 / 5 COMMON.HRS';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();

    expect(time).toBe(displayTime);
  });

  it('should show the time display with a shift with a pair clock in - clock out', () => {
    const shift = TestData.getShiftOnePairClockEvent();
    const component = shallow(<ClockInOutEditComponent shift={shift} />).dive();

    const displayTime = '1 / 5 COMMON.HRS';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();

    expect(time).toBe(displayTime);
  });

  it('should show the time display with a shift with multiples pairs clock in - clock out', () => {
    const shift = TestData.getShiftMultipleClockEvents();
    const component = shallow(<ClockInOutEditComponent shift={shift} />).dive();

    const displayTime = '2 / 5 COMMON.HRS';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();
    expect(time).toBe(displayTime);
  });

  it('should show the time display with a shift with odd pairs clock in - clock out', () => {
    const shift = TestData.getShiftOddClockEvents();
    const component = shallow(<ClockInOutEditComponent shift={shift} />).dive();

    const displayTime = '2 / 5 COMMON.HRS';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();
    expect(time).toBe(displayTime);
  });

  it('should round up the time 2.6 when the sum gives 2.566', () => {
    const shift = TestData.getShiftRoundedUpClockEvents()[0];
    const component = shallow(<ClockInOutEditComponent shift={shift} />).dive();

    const displayTime = '2.6 / 5 COMMON.HRS';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();
    expect(time).toBe(displayTime);
  });

  it('should round up the time 2.6 when the sum gives 2.5333', () => {
    const shift = TestData.getShiftRoundedUpClockEvents()[1];
    const component = shallow(<ClockInOutEditComponent shift={shift} />).dive();

    const displayTime = '2.6 / 5 COMMON.HRS';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();
    expect(time).toBe(displayTime);
  });

  it('should display the text with the styledRed - total actual hours > scheduled shift duration ', () => {
    const shift = TestData.getShiftMoreHoursWorkedClockEvents();
    const component = shallow(<ClockInOutEditComponent shift={shift} />).dive();

    const styles = component
      .find({ id: 'display-hours' })
      .dive()
      .props().style;
    expect(styles.length).toBe(2);
  });

  it('should update clockEvents on the state onDateChange', () => {
    const newTimeInShiftTimezone = '07:56 AM';
    const newDateTimeInUTC = '2001-01-01T13:56:00Z';
    const clockEvent = TestData.getShiftFixedClockEvents().clockEvents[0];
    const shift = TestData.getShiftFixedClockEvents();
    const component = shallow(<ClockInOutEditComponent shift={shift} />).dive();
    component.instance().onDateChange(newTimeInShiftTimezone, clockEvent);
    expect(component.state().clockEvents[0].eventTime).toBe(newDateTimeInUTC);
  });

  it('should call props.editClockEvents on save', () => {
    const editClockEvents = jest.fn();
    const trackEvent = jest.fn();
    const shift = TestData.getShiftMultipleClockEvents();
    const component = shallow(<ClockInOutEditComponent
      trackEvent={trackEvent}
      shift={shift}
      editClockEvents={editClockEvents}
    />).dive();
    component.find({ id: 'save' }).simulate('press');
    const patchClockEvents = component.state().clockEvents.map(event => ({
      id: event.id,
      eventTime: event.eventTime,
    }));
    expect(editClockEvents).toHaveBeenCalledWith(shift.id, patchClockEvents);
    expect(trackEvent).toHaveBeenCalledTimes(1);
    expect(trackEvent).toHaveBeenCalledWith(AnalyticsEvents.SET_TIMEKEEPING_EVENT);
  });

  it('should call Navigation.dismissModal when pressing close button', () => {
    const shift = TestData.getShiftMultipleClockEvents();
    const component = shallow(<ClockInOutEditComponent shift={shift} />).dive();
    const event = {
      buttonId: 'close',
    };
    component.instance().navigationButtonPressed(event);
    expect(mockDismissModal).toHaveBeenCalled();
  });
});
