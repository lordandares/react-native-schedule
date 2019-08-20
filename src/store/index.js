// @flow
import { createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import AuthRedux from '@next/auth/lib/redux/Auth';
import RNSecureKeyStore from 'react-native-secure-key-store';
import createSagaMiddleware from 'redux-saga';
import type { IAuthService } from '@next/auth/types/auth.types';
import ScheduleService from '@next/schedule/lib/services/ScheduleService';
import TimekeepingService from '@next/schedule/lib/services/TimekeepingService';
import ManagementService from '@next/schedule/lib/services/ManagementService';
import WorkService from '@next/schedule/lib/services/WorkService';
import TaskService from '@next/schedule/lib/services/TaskService';
import type { IScheduleService } from '@next/schedule/types/schedule.types';
import type { IManagementService } from '@next/schedule/types/management.types';
import type { ITimekeepingService } from '@next/schedule/types/timekeeping.types';
import type { IWorkService } from '@next/schedule/types/workTicket.types';
import type { ITaskService } from '@next/schedule/types/task.types';
import RopcAuthServiceMobile from '@next/auth/lib/services/RopcAuthServiceMobile';
import immutablePersistenceTransform from '../shared/redux/immutablePersistenceTransform';
import {
  OPENID_CONFIG_PROD,
  NEXT_SCHEDULING_API_URL_PROD,
  NEXT_MANAGEMENT_API_URL_PROD,
  NEXT_TIMEKEEPING_API_URL_PROD,
  NEXT_WORKTICKETS_API_URL_PROD,
  NEXT_TASKS_API_URL_PROD,
} from '../shared/config/config';
import rootReducer from './rootReducer';
import createRootSaga from '../shared/sagas';
import type { IFeatureFlagClientFactory } from '../shared/featureFlags/featureflags.types';
import FeatureFlagClientFactory from '../shared/featureFlags/FeatureFlagClientFactory';
import type { ILocationService } from '../shared/sagas/location.service';
import LocationService from '../shared/sagas/location.service';

export default function () {
  // Inject Reactotron - Sagas
  const sagaMonitor = console.tron ? console.tron.createSagaMonitor() : null; // eslint-disable-line no-console
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor });
  // Inject Reactotron - Redux
  // eslint-disable-next-line no-console
  const createAppropriateStore = console.tron ? console.tron.createStore : createStore;

  /* ------------- Initialize Services ------------- */

  const scheduleService: IScheduleService = new ScheduleService({ url: NEXT_SCHEDULING_API_URL_PROD });
  const managementService: IManagementService = new ManagementService({ url: NEXT_MANAGEMENT_API_URL_PROD });
  const timekeepingService: ITimekeepingService = new TimekeepingService({ url: NEXT_TIMEKEEPING_API_URL_PROD });
  const workService: IWorkService = new WorkService({ url: NEXT_WORKTICKETS_API_URL_PROD });
  const taskService: ITaskService = new TaskService({ url: NEXT_TASKS_API_URL_PROD });

  const persistConfig = {
    key: 'root',
    active: true,
    storage,
    whitelist: ['environment'],
    transforms: [immutablePersistenceTransform],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const featureFlagClientFactory: IFeatureFlagClientFactory = new FeatureFlagClientFactory();

  const locationService: ILocationService = new LocationService();

  const services = {
    timekeepingService,
    managementService,
    scheduleService,
    workService,
    featureFlagClientFactory,
    locationService,
    taskService,
  };

  /* ------------- Create Store ------------- */
  const store = createAppropriateStore(
    persistedReducer,
    applyMiddleware(sagaMiddleware, thunk.withExtraArgument(services)),
  );

  function logoutCallback(): void {
    store.dispatch(AuthRedux.requestLogoutUser());
  }

  const authService: IAuthService =
    new RopcAuthServiceMobile(OPENID_CONFIG_PROD, RNSecureKeyStore, logoutCallback);
  services.authService = authService;
  timekeepingService.authService = authService;
  managementService.authService = authService;
  scheduleService.authService = authService;
  workService.authService = authService;
  taskService.authService = authService;

  const rootSaga = createRootSaga(services);
  sagaMiddleware.run(rootSaga);
  return store;
}
