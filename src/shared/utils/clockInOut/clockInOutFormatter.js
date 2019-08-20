import moment from 'moment-timezone';
import i18n from '../../i18n/i18next';
import COMMON from '../../constants/common';

export const getEventTypeVerbiage = (eventType: string) => {
  switch (eventType) {
    case 'clockin':
      return i18n.translate(COMMON.IN);
    case 'clockout':
      return i18n.translate(COMMON.OUT);
    default:
      return '';
  }
};

export const getEventType = (eventType: string) => {
  switch (eventType) {
    case 'clockin':
      return i18n.translate(COMMON.CLOCK_IN);
    case 'clockout':
      return i18n.translate(COMMON.CLOCK_OUT);
    default:
      return '';
  }
};

export const formatEventTime = (eventTime: Date, timezone: string, timeFormat: string) => {
  if (eventTime) {
    return moment(eventTime)
      .tz(timezone)
      .format(timeFormat || 'hh:mm A');
  }

  return '';
};
