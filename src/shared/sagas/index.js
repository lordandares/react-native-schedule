// @flow
/* eslint-disable import/first */

import { all, takeLatest, fork } from 'redux-saga/effects';
import type { AppServices } from '../types/app.types';
import type { TrackError, NotifyUserError } from '@next/schedule/types/errorHandler.types';

/* ------------- Action Types ------------- */
import { AuthTypes } from '@next/auth/lib/redux/Auth';
import { EnvSwitchTypes } from '../redux/EnvSwitchRedux';
import { LocationTypes } from '../redux/location';
import { ClockEventTypes } from '../redux/clockevents';
import { AnalyticsTypes } from '../redux/analytics';
import { REHYDRATE } from 'redux-persist';
import { appNavigationTypes } from '../redux/appNavigation';
import { REQUEST_ACCEPT_OFFERED_SHIFT } from '../redux/schedule';
import { WorkTicketTypes } from '../redux/workTicket';
import { TaskTypes } from '../redux/task';
import { UserTypes } from '../redux/user';
import { TenantActionTypes } from '../redux/tenant';
import { STARTUP_ACTION } from '../redux/startup';

/* ------------- Sagas ------------- */
import * as AuthSaga from '@next/auth/lib/sagas/AuthSaga';
import * as ErrorHandlerSaga from '@next/schedule/lib/sagas/ErrorHandlerSaga';
import * as EnvSwitchSaga from './EnvSwitchSaga';
import * as UserSaga from './UserSaga';
import * as ErrorTrackingSaga from './ErrorTrackingSaga';
import * as FeatureFlagSaga from './FeatureFlagSaga';
import * as LocationSaga from './LocationSaga';
import * as ScheduleSaga from './ScheduleSaga';
import * as ClockEventSaga from './ClockEventSaga';
import * as ScreenControllerSaga from './ScreenControllerSaga';
import * as AnalyticsSaga from './AnalyticsSaga';
import * as WorkTicketSaga from './WorkTicketSaga';
import * as TaskSaga from './TaskSaga';
import * as TenantSaga from './TenantSaga';
import StartupSaga from './StartupSaga';

/* ------------- Services ------------- */
import AppCenterAnalytics from 'appcenter-analytics';
import Snackbar from 'react-native-snackbar';
import { Sentry } from 'react-native-sentry';

// ErrorTracker wrapper
const trackError: TrackError = (error: Error, errorHuman: ?string): void => {
  if (!__DEV__) {
    if (errorHuman) {
      Sentry.captureBreadcrumb({
        message: errorHuman,
        category: 'api',
        level: 'error',
      });
    }
    Sentry.captureException(error);
  } else {
    // eslint-disable-next-line no-console
    console.tron.reportError(error);
  }
};

// User notification wrapper
const notifyUserError: NotifyUserError = (errorMsg: string): void => {
  Snackbar.show({
    title: errorMsg,
  });
};

const analyticsServices = { AppCenterAnalytics };

// Initializing and wiring services
// eslint-disable-next-line function-paren-newline
export default function createRootSaga(
  {
    authService,
    timekeepingService,
    managementService,
    scheduleService,
    workService,
    featureFlagClientFactory,
    locationService,
    taskService,
  }: AppServices): Function {
  return function* rootSaga() {
    yield all([
      // Error Handler
      fork(ErrorHandlerSaga.handleErrors, notifyUserError, trackError),
      fork(ScreenControllerSaga.watchScreenChanges),

      takeLatest(STARTUP_ACTION, StartupSaga),

      // Authentication
      takeLatest(EnvSwitchTypes.SUCCESS_ENV_SWITCH, AuthSaga.syncUser, authService),
      takeLatest([AuthTypes.REQUEST_LOGIN_USER], AuthSaga.loginUser, authService, {}),

      // Tenant
      takeLatest(
        [TenantActionTypes.REQUEST_TENANT],
        TenantSaga.getTenant,
        managementService,
      ),

      takeLatest([AuthTypes.REQUEST_REGISTER_USER], AuthSaga.registerUser, authService, {}),
      // we need to modify the user resource before log out. we call auth logout from UserSaga
      takeLatest([AuthTypes.REQUEST_LOGOUT_USER], UserSaga.handleLogout, managementService, authService, trackError),

      // User
      takeLatest([AuthTypes.SUCCESS_LOGIN_USER], UserSaga.getUser, managementService),
      takeLatest([AuthTypes.SUCCESS_LOGIN_USER], UserSaga.associateDeviceOnLogin, managementService),
      takeLatest([AuthTypes.SUCCESS_LOGIN_USER], FeatureFlagSaga.identify),

      takeLatest([UserTypes.REQUEST_USERS], UserSaga.getUsers, managementService),

      // Error Tracking for specific actions
      takeLatest(
        [
          AuthTypes.ERROR_REGISTER_USER,
          AuthTypes.ERROR_LOGIN_USER,
          AuthTypes.ERROR_LOGOUT_USER,
          AuthTypes.ERROR_SYNC_USER,
        ],
        ErrorTrackingSaga.logException,
        trackError,
      ),
      takeLatest(EnvSwitchTypes.SUCCESS_ENV_SWITCH, ErrorTrackingSaga.setEnvironment),
      takeLatest(EnvSwitchTypes.SUCCESS_ENV_SWITCH, FeatureFlagSaga.init, featureFlagClientFactory, trackError),
      takeLatest(EnvSwitchTypes.SUCCESS_ENV_SWITCH, AnalyticsSaga.enableAnalytics, analyticsServices),

      takeLatest(
        [
          AuthTypes.SUCCESS_SYNC_USER,
          AuthTypes.ERROR_SYNC_USER,
          AuthTypes.SUCCESS_LOGIN_USER,
          AuthTypes.SUCCESS_LOGOUT_USER,
          AuthTypes.ERROR_LOGOUT_USER,
        ],
        ScreenControllerSaga.startApp,
      ),
      takeLatest([AuthTypes.SUCCESS_SYNC_USER, AuthTypes.SUCCESS_LOGIN_USER], ErrorTrackingSaga.updateContext),

      // Env Switch
      // takeLatest([AuthTypes.SUCCESS_LOGIN_USER], EnvSwitchSaga.getData),

      takeLatest(
        [REHYDRATE, EnvSwitchTypes.REQUEST_ENV_SWITCH],
        EnvSwitchSaga.switchEnv,
        {
          authService,
          scheduleService,
          timekeepingService,
          managementService,
          workService,
          taskService,
        },
        trackError,
      ),

      // Location
      takeLatest(LocationTypes.REQUEST_GET_PERMISSIONS, LocationSaga.getPermissions),
      takeLatest(LocationTypes.REQUEST_GET_LOCATION, LocationSaga.getCurrentLocation, locationService),

      // Clock Event
      takeLatest(
        ClockEventTypes.REQUEST_CLOCK_IN,
        ClockEventSaga.clockIn,
        LocationSaga.getCurrentLocation,
        ScheduleSaga.getShift,
        locationService,
        scheduleService,
        timekeepingService,
      ),
      takeLatest(
        ClockEventTypes.REQUEST_CLOCK_OUT,
        ClockEventSaga.clockOut,
        LocationSaga.getCurrentLocation,
        ScheduleSaga.getShift,
        locationService,
        scheduleService,
        timekeepingService,
      ),

      takeLatest(
        REQUEST_ACCEPT_OFFERED_SHIFT,
        ScheduleSaga.acceptOfferedShift,
        scheduleService,
      ),

      // Work Tickets
      takeLatest(
        WorkTicketTypes.REQUEST_WORK_TICKETS,
        WorkTicketSaga.getWorkTickets,
        workService,
      ),

      takeLatest(
        WorkTicketTypes.REQUEST_UPDATE_WORK_TICKET,
        WorkTicketSaga.updateWorkTicket,
        workService,
      ),

      // Tasks
      takeLatest(
        TaskTypes.REQUEST_TASKS,
        TaskSaga.getTasks,
        taskService,
      ),

      takeLatest(
        TaskTypes.REQUEST_CREATE_TASK,
        TaskSaga.createTask,
        taskService,
      ),

      takeLatest(
        TaskTypes.REQUEST_UPDATE_TASK,
        TaskSaga.updateTask,
        taskService,
      ),

      takeLatest(
        TaskTypes.REQUEST_COMPLETE_TASK,
        TaskSaga.completeTask,
        taskService,
      ),

      takeLatest(
        TaskTypes.REQUEST_UPDATE_TASK_AREA,
        TaskSaga.updateArea,
        taskService,
      ),

      takeLatest(
        TaskTypes.REQUEST_UPDATE_TASK_ITEM,
        TaskSaga.updateItem,
        taskService,
      ),

      takeLatest(
        [
          AnalyticsTypes.TRACK_EVENT,
          AuthTypes.REQUEST_LOGOUT_USER,
          AuthTypes.REQUEST_LOGIN_USER,
          appNavigationTypes.SCREEN_CHANGED,
        ],
        AnalyticsSaga.trackEvent,
        analyticsServices,
      ),
    ]);
  };
}
