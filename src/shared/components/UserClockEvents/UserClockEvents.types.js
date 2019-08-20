import type { ShiftClockEvent } from '../../types/schedule.types';

export type UserClockEventsProps = {
  clockEvents: ShiftClockEvent[],
  styles: any,
  siteTimeZone: string,
};
