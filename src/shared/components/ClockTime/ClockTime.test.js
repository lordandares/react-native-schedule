import React from 'react';
import { shallow } from 'enzyme';
import ClockTime from './ClockTime';

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

const listStyles = {
  containerItem: '',
  separateItem: '',
};

describe('ClockTime', () => {
  it('should format eventTime to "hh:mm A"', () => {
    const eventTime = '2018-07-24T10:56:00Z';
    const eventTimeFormatted = '05:56 AM';
    const clockEvent = { eventTime };
    const siteTimeZone = 'America/Chicago';
    const clockTime = shallow(<ClockTime
      clockEvent={clockEvent}
      siteTimeZone={siteTimeZone}
      listStyles={listStyles}
    />).dive();
    expect(clockTime.instance().getFormattedDate(eventTime)).toBe(eventTimeFormatted);
  });

  describe('onDateChange', () => {
    const eventTime = '2018-07-24T10:56:00Z';
    const newDate = '10:11 AM';
    const clockEvent = { eventTime };
    const siteTimeZone = 'America/Chicago';
    const onDateChange = jest.fn();
    const clockTime = shallow(<ClockTime
      clockEvent={clockEvent}
      siteTimeZone={siteTimeZone}
      listStyles={listStyles}
      onDateChange={onDateChange}
    />).dive();
    const datePicker = clockTime.find('DatePicker');
    datePicker.props().onDateChange(newDate);
    it('should call onDateChange with date and clockEvent', () => {
      expect(onDateChange).toHaveBeenCalledWith(newDate, clockEvent);
    });
  });
});
