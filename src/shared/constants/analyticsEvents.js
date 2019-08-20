export const EVENT_GROUP_SCREEN = 'Screen/';

const EVENT_GROUP_AUTH = 'Auth/';
const EVENT_GROUP_PRESS = 'Press/';
const EVENT_GROUP_SHIFT = 'Shift/';
const EVENT_GROUP_TK = 'Timekeeping/';

const AnalyticsEvents = {
  // Auth
  LOGGED_IN: `${EVENT_GROUP_AUTH}Login`,
  LOGGED_OUT: `${EVENT_GROUP_AUTH}Logout`,

  // On Press
  PRESS_SETTINGS_COG: `${EVENT_GROUP_PRESS}SettingsCog`,

  // Shifts
  ASSIGN_UNASSIGNED_SHIFT: `${EVENT_GROUP_SHIFT}AssignUnassigned`,
  ASSIGN_ASSIGNED_SHIFT: `${EVENT_GROUP_SHIFT}AssignAssigned`,
  SET_INSTRUCTIONS: `${EVENT_GROUP_SHIFT}SetInstructions`,

  // Timekeeping
  SET_TIMEKEEPING_EVENT: `${EVENT_GROUP_TK}SetTimekeepingEvent`,
};

export default AnalyticsEvents;

