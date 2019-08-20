// @flow

export type User = {
  id?: string,
  firstName?: string,
  lastName?: string,
  userRole?: string,
};

export const shiftTypeValue: Object = {
  fixed: { name: 'fixed', value: 1 },
  repeating: { name: 'repeating', value: 2 },
  flexFixed: { name: 'flexFixed', value: 3 },
  flexRepeating: { name: 'flexRepeating', value: 4 },
};

export const ClockEventTypes = {
  ClockIn: 'clockin',
  ClockOut: 'clockout',
};

export type ShiftClockEvent = {
  id: string,
  eventTime: Date,
  eventType: string,
  userId: string,
};

export type ShiftClockException = {
  code: number,
  exception: string,
};

export type ShiftDayCoverage = {
  dayOfWeek: number, // moment's isoWeekday where 1 = Monday, 7 = Sunday
  users: User[],
};

export type ShiftRecurrence = {
  shiftId: string,
  recurrencePattern: string,
  start: Date,
  end: Date,
  Users: User[],
};

export type RepeatingCoverage = {
  dayOfWeek: number,
  users: User[],
};

export type Shift = {
  id?: string,
  siteName?: string,
  start?: Date,
  end?: Date,
  users?: User[],
  tenantId?: string,
  customerId?: string,
  siteId?: string,
  serviceId?: string,
  serviceName?: string,
  siteTimeZone?: string,
  instructions?: string,
  hours?: number,
  clockEvents?: ShiftClockEvent[],
  clockExceptions?: ShiftClockException[],
  shiftType?: number,
  coverage?: ShiftDayCoverage[],
  repeatingShiftId?: string,
  shiftRecurrences?: ShiftRecurrence[],
  recurrenceId?: string,
  repeatingStartDate?: Date,
  repeatingEndDate?: Date,
  repeatingCoverage?: RepeatingCoverage[],
  repeatingShiftExceptions?: string[],
  budgetedHours?: number,
};

export type ReturnMessage<T> = {
  payload: T[],
  message: string,
  errors: string[],
};

export type Site = {
  id: string,
  tenantId: string,
  customerId: string,
  customerName: string,
  name: string,
  timeZoneOffset: number,
  timeZone: string,
};

export type Service = {
  id: string,
  tenantId: string,
  customerId: string,
  siteId: string,
  name: string,
};
