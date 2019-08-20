// @flow
import type { User } from '@next/schedule/types/schedule.types';

export type UserState = {
  value: User,
  users: User[],
  fetching: boolean,
  errorMessage: string,
  merge: (state: Object) => UserState,
};
export type UserAction = {
  user: User,
  users: User[],
  errorMessage: string,
};
