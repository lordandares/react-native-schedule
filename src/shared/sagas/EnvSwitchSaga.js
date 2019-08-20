// @flow
import type { Saga } from 'redux-saga';
import { call, put, select, all } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';
import ErrorHandlerRedux from '@next/schedule/lib/redux/ErrorHandlerRedux';

import * as CONFIG from '../config/config';
import type { AppServices } from '../types/app.types';
import EnvSwitchRedux, { getEnvironment, ENV_PROD, ENV_TEST, ENV_DEV } from '../redux/EnvSwitchRedux';
import { getUnassignedShifts, getSites } from '../redux/schedule.thunks';
import { getUsers } from '../redux/management.thunks';

// eslint-disable-next-line
export function* switchEnv(
  {
    scheduleService, authService, timekeepingService, managementService, workService, taskService,
  }: AppServices,
  trackError,
  action: any,
): Saga<any> {
  const { type } = action;
  let { env = ENV_PROD } = action;

  if (type === REHYDRATE) {
    const persistedEnv = yield select(getEnvironment);
    if (persistedEnv) env = persistedEnv;
  }

  try {
    let environment = '';
    let OPENID_CONFIG = '';

    switch (env) {
      case ENV_TEST:
        environment = 'TEST';
        OPENID_CONFIG = CONFIG.OPENID_CONFIG_TEST;
        break;
      case ENV_DEV:
        environment = 'DEV';
        OPENID_CONFIG = CONFIG.OPENID_CONFIG_DEV;
        break;
      case ENV_PROD:
        environment = 'PROD';
        OPENID_CONFIG = CONFIG.OPENID_CONFIG_PROD;
        break;
      default: {
        trackError(Error(`Received corrupted environment variable: "${env}"`));
        environment = 'PROD';
        env = ENV_PROD;
        OPENID_CONFIG = CONFIG.OPENID_CONFIG_PROD;
      }
    }

    yield call(scheduleService.switchApiEndpoints, {
      url: CONFIG[`NEXT_SCHEDULING_API_URL_${environment}`],
    });
    yield call(managementService.switchApiEndpoints, {
      url: CONFIG[`NEXT_MANAGEMENT_API_URL_${environment}`],
    });
    yield call(timekeepingService.switchApiEndpoints, {
      url: CONFIG[`NEXT_TIMEKEEPING_API_URL_${environment}`],
    });
    yield call(workService.switchApiEndpoints, {
      url: CONFIG[`NEXT_WORKTICKETS_API_URL_${environment}`],
    });
    yield call(taskService.switchApiEndpoints, {
      url: CONFIG[`NEXT_TASKS_API_URL_${environment}`],
    });

    // Do logout manually
    // yield put(AuthRedux.requestLogoutUser());
    yield call(authService.switchConfig, OPENID_CONFIG, { forceLogout: false });

    yield put(EnvSwitchRedux.successEnvSwitch(env));
  } catch (error) {
    yield put(ErrorHandlerRedux.addError(`Failed to switch the environment: ${error.message}`, error));
    yield put(EnvSwitchRedux.errorEnvSwitch(error.message));
  }
}

export function* getData() {
  // refresh stuff
  yield all([put(getUsers()), put(getUnassignedShifts()), put(getSites())]);
}
