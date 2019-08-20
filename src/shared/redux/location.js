import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { LocationState } from '../types/LocationRedux.types';

const { Types, Creators } = createActions({
  requestGetPermissions: null,
  successGetPermissions: ['hasPermission'],
  errorGetPermissions: ['error'],
  requestGetLocation: null,
  successGetLocation: ['location'],
  errorGetLocation: ['error'],
}, {
  prefix: 'location/',
});

export const LocationTypes = Types;
export default Creators;

export const INITIAL_STATE: LocationState = Immutable.from({
  hasPermission: null,
  location: null,
  fetching: false,
  error: null,
});

// ------------------------ reducer functions
export const request = state => state.merge({ fetching: true, error: null });

export const successPermissions = (state, { hasPermission }) =>
  state.merge({ fetching: false, error: null, hasPermission });

export const successLocation = (state, { location }) => state.merge({ fetching: false, error: null, location });

export const failure = (state, { error }) => state.merge({ fetching: false, error: String(error) });

// ------------------------ bind reducers to actions
export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_GET_PERMISSIONS]: request,
  [Types.SUCCESS_GET_PERMISSIONS]: successPermissions,
  [Types.ERROR_GET_PERMISSIONS]: failure,
  [Types.REQUEST_GET_LOCATION]: request,
  [Types.SUCCESS_GET_LOCATION]: successLocation,
  [Types.ERROR_GET_LOCATION]: failure,
});

// ------------------------ selectors
export const selectFetching = locationState => locationState.location.fetching;
export const selectPermissions = locationState => locationState.location.hasPermission;
export const selectLocation = locationState => locationState.location.location;
