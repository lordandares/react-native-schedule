import moment from 'moment-timezone';
import type { Shift } from '../../types/schedule.types';

const shiftSortAscending = (a: Shift, b: Shift) => {
  const aUnix = moment(a.start).unix();
  const bUnix = moment(b.start).unix();
  if (aUnix > bUnix) {
    return 1;
  } else if (bUnix > aUnix) {
    return -1;
  }
  return a.hours - b.hours;
};

export default shiftSortAscending;
