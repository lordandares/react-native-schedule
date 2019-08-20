import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import type { EnvSwitchState } from '../types/EnvSwitchRedux.types';

export const ENV_DEV = 'dev';
export const ENV_TEST = 'test';
export const ENV_PROD = 'prod';

const { Types, Creators } = createActions({
  requestEnvSwitch: ['env'],
  successEnvSwitch: ['env'],
  errorEnvSwitch: ['error'],
});

export const EnvSwitchTypes = Types;
export default Creators;

export const INITIAL_STATE: EnvSwitchState = Immutable.from({
  env: ENV_PROD,
  fetching: false,
  error: null,
});

// ------------------------ reducer functions
export const request = state => state.merge({ fetching: true, error: null });

export const success = (state, { env }) => state.merge({ fetching: false, error: null, env });

export const failure = (state, { error }) => state.merge({ fetching: false, error: String(error) });

// ------------------------ bind reducers to actions
export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_ENV_SWITCH]: request,
  [Types.SUCCESS_ENV_SWITCH]: success,
  [Types.ERROR_ENV_SWITCH]: failure,
});

// ------------------------ selectors
export const getEnvironment = envState => envState.environment.env;
