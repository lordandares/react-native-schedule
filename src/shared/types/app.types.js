// @flow
import type { IScheduleService } from '@next/schedule/types/schedule.types';
import type { ITimekeepingService } from '@next/schedule/types/timekeeping.types';
import type { IManagementService } from '@next/schedule/types/management.types';
import type { IAuthService } from '@next/auth/types/auth.types';
import type { ITaskService } from '@next/schedule/types/task.types';
import { IFeatureFlagClientFactory } from '../featureFlags/featureflags.types';
import type { ILocationService } from '../sagas/location.service';

export type AppServices = {
  managementService: IManagementService,
  timekeepingService: ITimekeepingService,
  scheduleService: IScheduleService,
  authService: IAuthService,
  featureFlagClientFactory: IFeatureFlagClientFactory,
  locationService: ILocationService,
  workService: any,
  taskService: ITaskService,
}
