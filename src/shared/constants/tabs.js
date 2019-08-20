// @flow
// DO NOT CHANGE THE IDs SINCE THEY ARE BEING HARDCODED IN ANALYTICS
import COMMON from './common';
import i18n from '../i18n/i18next';

export const SCHEDULE_TABS = {
  UNASSIGNED: { id: 'Unassigned', label: i18n.translate(COMMON.UNASSIGNED).toUpperCase(), index: 0 },
  EXCEPTIONS: { id: 'Exceptions', label: i18n.translate(COMMON.EXCEPTIONS).toUpperCase(), index: 1 },
  MY_SHIFTS: { id: 'MyShifts', label: i18n.translate(COMMON.MY_SHIFTS).toUpperCase(), index: 2 },
  OFFERED_SHIFTS: { id: 'OfferedShifts', label: i18n.translate(COMMON.OFFERED).toUpperCase(), index: 3 },
};

export const WORK_TABS = {
  WORK_TICKETS: { id: 'WorkTickets', label: i18n.translate(COMMON.WORK_TIKETS), index: 0 },
  TASKS: { id: 'Tasks', label: i18n.translate(COMMON.TASKS), index: 1 },
};

export const APP_TABS = {
  AUTH: { id: 'Auth', label: i18n.translate(COMMON.AUTH) },
  HOME: { index: 0, id: 'Home', label: i18n.translate(COMMON.HOME) },
  SCHEDULE: {
    index: 1, id: i18n.translate(COMMON.SCHEDULE), label: 'Schedule', innerTabs: SCHEDULE_TABS,
  },
  SITES: { index: 2, id: 'Sites', label: i18n.translate(COMMON.SITES) },
  WORK: {
    index: 3, id: 'Work', label: i18n.translate(COMMON.WORK), innerTabs: WORK_TABS,
  },
};
