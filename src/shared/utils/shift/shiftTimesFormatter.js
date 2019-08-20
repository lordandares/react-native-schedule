import moment from 'moment-timezone';

const formatStartEndShift = (
  start: Date,
  end: Date,
  timezone: string,
  isSubtitle: boolean,
  format: string,
  shortDateFormat: string,
) => {
  const timeFormat = format || 'LT';
  const dateFormat = shortDateFormat || 'MMM D';

  const startDate = moment(start).format(`ddd, ${dateFormat}`);
  const startTime = moment(start).format(timeFormat);
  const endTime = moment(end).format(timeFormat);
  return isSubtitle
    ? `${startDate} ${startTime} - ${endTime} ${moment.tz(timezone).format('z')} `
    : `${startTime} - ${endTime} ${moment.tz(timezone).format('z')} `;
};

export default formatStartEndShift;
