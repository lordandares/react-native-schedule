import {
  TEST_FLAG,
  MOBILE_TASKS,
  LOCATIONS,

  PREVENT_NO_SUBSCRIPTION_LOGIN,
  CREATE_MOBILE_INSPECTIONS,
  CREATE_MOBILE_SHIFTS,
  DATE_TIME_FORMAT,
} from '../featureFlags/flagList';

export const selectIsTestFlagOn =
  ({ featureFlags }: { featureFlags: any }): boolean => featureFlags.flags[TEST_FLAG];

export const selectFeatureFlagEnvironment =
  ({ featureFlags }: { featureFlags: any }): boolean => featureFlags.environment;

export const selectIsTasksOn =
  ({ featureFlags }: { featureFlags: any }): boolean => featureFlags.flags[MOBILE_TASKS];

export const selectIsLocationsOn =
  ({ featureFlags }: { featureFlags: any }): boolean => featureFlags.flags[LOCATIONS];

export const selectIsPreventNoSubscriptionLogin =
  ({ featureFlags }: { featureFlags: any }): boolean => featureFlags.flags[PREVENT_NO_SUBSCRIPTION_LOGIN];

export const selectIsCreateMobileInspectionsOn =
  ({ featureFlags }: { featureFlags: any }): boolean => featureFlags.flags[CREATE_MOBILE_INSPECTIONS];

export const selectIsCreateShiftBtnOn =
  ({ featureFlags }: { featureFlags: any }): boolean => featureFlags.flags[CREATE_MOBILE_SHIFTS];
export const selectIsDateTimeOn =
  ({ featureFlags }: { featureFlags: any }): boolean => featureFlags.flags[DATE_TIME_FORMAT];
