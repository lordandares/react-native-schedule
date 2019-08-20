// @flow
import moment from 'moment-timezone';
import type { Tenant } from '@next/schedule/types/schedule.types';
import type { Shift, User, Site } from './schedule.types';

export type ScheduleState = {
  unassignedShifts: Shift[],
  assignedShifts: Shift[],
  users: User[],
  isRefreshing: boolean,
  selectedDate: moment,
  selectedShift?: Shift,
  selectedUser?: User,
  sites?: Site[],
  loading: boolean,
};

export type ShiftState = {
  assignedUserID: string,
};

export type TenantAction = {
  errorMessage: ?string,
  type: string,
  value: ?Tenant
};

export type TenantState = {
  fetching: boolean,
  value: Tenant,
  errorMessage: string,
  users: User[]
};
