import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { ClockEventState } from '../types/ClockEventRedux.types';

const { Types, Creators } = createActions({
  requestClockIn: ['clockEvent'],
  requestClockOut: ['clockEvent'],
  successClockEvent: ['clockEvent'],
  errorClockEvent: ['error'],
}, {
  prefix: 'clockevents/',
});

export const ClockEventTypes = Types;
export default Creators;

const INITIAL_STATE: ClockEventState = Immutable.from({
  clockEvent: null,
  loading: false,
  error: null,
});

// ------------------------ reducer functions
const onRequest = (state, { clockEvent }) => state.merge({ loading: true, error: null, clockEvent });

const onSuccess = (state, { clockEvent }) => state.merge({ loading: false, error: null, clockEvent });

const onFailure = (state, { error }) => state.merge({ loading: false, error: String(error) });

// ------------------------ bind reducers to actions
export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_CLOCK_IN]: onRequest,
  [Types.REQUEST_CLOCK_OUT]: onRequest,
  [Types.SUCCESS_CLOCK_EVENT]: onSuccess,
  [Types.ERROR_CLOCK_EVENT]: onFailure,
});

// ------------------------ selectors
export const selectLoading = ({ clockevents } : { clockevents: ClockEventState }): boolean => clockevents.loading;
