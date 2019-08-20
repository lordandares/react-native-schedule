export const formatToShortDate = (dateFormat) => {
  const monthIndex = dateFormat.indexOf('MM');
  const dayIndex = dateFormat.indexOf('DD');
  if (monthIndex !== -1 && dayIndex !== -1 && monthIndex < dayIndex) {
    return 'MMM D';
  }
  return 'D MMM';
};

export const formatToLongDate = (dateFormat) => {
  const dayMonth = formatToShortDate(dateFormat);
  const yearIndex = dateFormat.indexOf('YYYY');
  if (yearIndex !== -1 && yearIndex === 0) {
    return `YYYY ${dayMonth}`;
  }
  return `${dayMonth} YYYY`;
};
