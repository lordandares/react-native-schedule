// @flow
import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce';

import type { UserState, UserAction } from '../types/UserRedux.types';

type ImmutableObj = Immutable.ImmutableObject;

const { Types, Creators } = createActions({
  requestUser: {},
  updateUser: ['payload'],
  successUser: ['user'],
  errorUser: ['errorMessage'],
  requestUsers: {},
  successUsers: ['users'],
  errorUsers: ['errorMessage'],
});
export const UserTypes = Types;
export default Creators;

const INITIAL_STATE: ImmutableObj<UserState> = Immutable.from({
  value: undefined,
  users: [],
  fetching: false,
  error: false,
  errorMessage: '',
});

export const onRequestUser = (state: UserState): UserState =>
  state.merge({
    fetching: true,
    value: null,
    error: false,
    errorMessage: null,
  });

export const onUpdateUser = (state: UserState): UserState =>
  state.merge({
    fetching: true,
    error: false,
    errorMessage: null,
  });

export const onSuccessUser = (state: UserState, { user }: UserAction): UserState =>
  state.merge({
    fetching: false,
    error: false,
    value: user,
  });

export const onRequestUsers = (state: UserState): UserState =>
  state.merge({
    fetching: true,
    error: false,
  });

export const onSuccessUsers = (state: UserState, { users }: UserAction) =>
  state.merge({
    fetching: false,
    users,
  });

export const onFailure = (state: UserState, { errorMessage }: UserAction) => {
  const message = errorMessage instanceof Error ? errorMessage.message : String(errorMessage);
  return state.merge({
    fetching: false,
    error: true,
    errorMessage: message,
    value: null,
    users: [],
  });
};

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_USER]: onRequestUser,
  [Types.UPDATE_USER]: onUpdateUser,
  [Types.SUCCESS_USER]: onSuccessUser,
  [Types.ERROR_USER]: onFailure,
  [Types.REQUEST_USERS]: onRequestUsers,
  [Types.SUCCESS_USERS]: onSuccessUsers,
  [Types.ERROR_USERS]: onFailure,
});

export const getUser = (state: any) => Immutable.asMutable(state.user.value, { deep: true });
export const selectLoading = ({ user: { fetching } }: Object) => fetching;
export const selectUsers = ({ user: { users } }: Object) => users;
