// @flow
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { formatToShortDate, formatToLongDate } from '../../shared/utils/DateFormatHelper';
import type { TenantState, TenantAction } from '../../shared/types/reduxState.types';

type ImmutableObj = Immutable.ImmutableObject;

const defaultDateFormat = 'L';
const defaultTimeFormat = 'hh:mm A';
const defaultShortDateFormat = 'MM DD';
const defaultLongDateFormat = 'DD/MM/YYYY';
const twentyFourTimeFormat = 'HH:mm';

const { Types, Creators } = createActions({
  requestTenant: ['payload'],
  successTenant: ['tenant'],
  errorTenant: ['errorMessage'],
});
export const TenantActionTypes = Types;
export default Creators;

const INITIAL_STATE: ImmutableObj<TenantState> = Immutable.from({
  value: null,
  users: null,
  fetching: false,
  error: false,
  errorMessage: '',
  dateFormat: defaultDateFormat,
  shortDateFormat: defaultShortDateFormat,
  longDateFormat: defaultLongDateFormat,
  timeFormat: defaultTimeFormat,
});

const requestTenant = (state: TenantState): TenantState =>
  state.merge({
    fetching: true,
    value: null,
    error: false,
    errorMessage: null,
  });

const successTenant = (state: TenantState, action: TenantAction): TenantState => {
  const { tenant } = action;
  return state.merge({
    fetching: false,
    error: false,
    value: tenant,
    dateFormat: tenant.dateFormat ? tenant.dateFormat : defaultDateFormat,
    shortDateFormat: tenant.dateFormat ? formatToShortDate(tenant.dateFormat) : defaultShortDateFormat,
    longDateFormat: tenant.dateFormat ? formatToLongDate(tenant.dateFormat) : defaultLongDateFormat,
    timeFormat: tenant.use24HourFormat ? twentyFourTimeFormat : defaultTimeFormat,
  });
};

const failure = (state: TenantState, action: TenantAction) => {
  let { errorMessage = '' } = action;
  errorMessage = errorMessage instanceof Error ? errorMessage.message : String(errorMessage);
  return state.merge({
    fetching: false,
    error: true,
    errorMessage,
    invitationToken: null,
  });
};


export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_TENANT]: requestTenant,
  [Types.SUCCESS_TENANT]: successTenant,
  [Types.ERROR_TENANT]: failure,
});

export const getTenant = (state: TenantState) => state.tenant.value;
