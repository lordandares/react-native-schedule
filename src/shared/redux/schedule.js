// @flow
import moment from 'moment-timezone';
import _ from 'lodash';

import type { ScheduleState } from '../types/reduxState.types';
import type { Shift, ShiftClockEvent, User, Site } from '../types/schedule.types';
import shiftSortAscending from '../utils/shift/shiftSortAscending';
import {
  updateShiftsClockEvents,
  updateSingleShiftClockEvent,
  replaceShiftInList,
} from './helpers/schedule.redux.helpers';

export const REQUEST_UPDATE_REPEATING_SHIFT = 'schedule/REQUEST_UPDATE_REPEATING_SHIFT';
export const ERROR_UPDATE_REPEATING_SHIFT = 'schedule/ERROR_UPDATE_REPEATING_SHIFT';
export const GET_UNASSIGNED_SHIFTS = 'Schedule/GET_UNASSIGNED_SHIFTS';
export const GET_ASSIGNED_SHIFTS = 'Schedule/GET_ASSIGNED_SHIFTS';

export const GET_USERS = 'Schedule/GET_USERS';
export const REQUEST_GET_USERS = 'Schedule/REQUEST_GET_USERS';
export const ERROR_GET_USERS = 'Schedule/ERROR_GET_USERS';
export const SET_USERS_SEARCH_TERM = 'Schedule/SET_USERS_SEARCH_TERM';

export const SET_FILTERED_USERS = 'Schedule/SET_FILTERED_USERS';
export const SET_SELECTED_DATE = 'Schedule/SET_SELECTED_DATE';
export const SET_SELECTED_DATE_ON_SITES = 'Schedule/SET_SELECTED_DATE_ON_SITES';
export const SET_SELECTED_SHIFT = 'Schedule/SET_SELECTED_SHIFT';
export const SET_SELECTED_SITE = 'Schedule/SET_SELECTED_SITE';
export const GET_SHIFT = 'Schedule/GET_SHIFT';
export const REQUEST_GET_SHIFT = 'Schedule/REQUEST_GET_SHIFT';
export const SUCCESS_GET_SHIFT = 'Schedule/SUCCESS_GET_SHIFT';
export const ERROR_GET_SHIFT = 'Schedule/ERROR_GET_SHIFT';
export const GET_SHIFTS = 'Schedule/GET_SHIFTS';
export const REQUEST_GET_SHIFTS = 'Schedule/REQUEST_GET_SHIFTS';
export const SUCCESS_GET_SHIFTS = 'Schedule/SUCCESS_GET_SHIFTS';
export const GET_EXCEPTIONS_SHIFTS = 'Schedule/GET_EXCEPTIONS_SHIFTSexport ';
export const ERROR_GET_EXCEPTIONS_SHIFTS = 'Schedule/ERROR_GET_EXCEPTIONS_SHIFTS';
export const REQUEST_GET_EXCEPTIONS_SHIFTS = 'Schedule/REQUEST_GET_EXCEPTIONS_SHIFTS';
export const SUCCESS_GET_EXCEPTIONS_SHIFTS = 'Schedule/SUCCESS_GET_EXCEPTIONS_SHIFTS';
export const ERROR_GET_SHIFTS = 'Schedule/ERROR_GET_SHIFTS';
export const SET_SHIFT_SELECTED_USERS = 'Schedule/SET_SHIFT_SELECTED_USERS';
export const REQUEST_UPDATE_SHIFT = 'Schedule/REQUEST_UPDATE_SHIFT';
export const SUCCESS_UPDATE_SHIFT = 'Schedule/SUCCESS_UPDATE_SHIFT';
export const REQUEST_UPDATE_SHIFT_CLOCK_EVENTS = 'Schedule/REQUEST_UPDATE_SHIFT_CLOCK_EVENTS';
export const SUCCESS_UPDATE_SHIFT_CLOCK_EVENT = 'Schedule/SUCCESS_UPDATE_SHIFT_CLOCK_EVENT';
export const SUCCESS_UPDATE_SHIFT_CLOCK_EVENTS = 'Schedule/SUCCESS_UPDATE_SHIFT_CLOCK_EVENTS';
export const ERROR_UPDATE_SHIFT = 'Schedule/ERROR_UPDATE_SHIFT';
export const SHOW_LOADING = 'Schedule/SHOW_LOADING';
export const HIDE_LOADING = 'Schedule/HIDE_LOADING';
export const SHOW_REFRESHING_INDICATOR = 'Schedule/SHOW_REFRESHING_INDICATOR';
export const HIDE_REFRESHING_INDICATOR = 'Schedule/HIDE_REFRESHING_INDICATOR';

export const REQUEST_GET_OFFERED_SHIFTS = 'Schedule/REQUEST_GET_OFFERED_SHIFTS';
export const SUCCESS_GET_OFFERED_SHIFTS = 'Schedule/SUCCESS_GET_OFFERED_SHIFTS';
export const ERROR_GET_OFFERED_SHIFTS = 'Schedule/ERROR_GET_OFFERED_SHIFTS';
export const REQUEST_ACCEPT_OFFERED_SHIFT = 'Schedule/REQUEST_ACCEPT_OFFERED_SHIFT';
export const SUCCESS_ACCEPT_OFFERED_SHIFT = 'Schedule/SUCCESS_ACCEPT_OFFERED_SHIFT';
export const ERROR_ACCEPT_OFFERED_SHIFT = 'Schedule/ERROR_ACCEPT_OFFERED_SHIFT';

export const REQUEST_GET_SITES = 'Schedule/REQUEST_GET_SITES';
export const GET_SITES = 'Schedule/GET_SITES';
export const ERROR_GET_SITES = 'Schedule/ERROR_GET_SITES';

export const showLoading = (): any => ({ type: SHOW_LOADING });
export const hideLoading = (): any => ({ type: HIDE_LOADING });

export const showRefreshingIndicator = (): any => ({ type: SHOW_REFRESHING_INDICATOR });
export const hideRefreshingIndicator = (): any => ({ type: HIDE_REFRESHING_INDICATOR });

export function setUsersSearchTerm(term: string) {
  return (dispatch: Function, getState: Function) => {
    dispatch({ type: SET_USERS_SEARCH_TERM, payload: term });
    const { users } = getState().schedule;
    const filteredUsers = users.filter(user =>
      _.includes(_.toLower(`${user.firstName} ${user.lastName}`), _.toLower(_.trim(term))));
    dispatch({ type: SET_FILTERED_USERS, payload: filteredUsers });
  };
}

export const setSelectedSite: Function = (site: Site): any => ({
  type: SET_SELECTED_SITE,
  payload: site,
});

export const requestGetShifts: Function = (): any => ({
  type: REQUEST_GET_SHIFTS,
});

export const successGetShifts: Function = (response: any): any => ({
  type: SUCCESS_GET_SHIFTS,
  payload: response,
});

export const errorGetShifts: Function = (error: any): any => ({
  type: ERROR_GET_SHIFTS,
  payload: error,
});

export const requestGetShift: Function = (): any => ({
  type: REQUEST_GET_SHIFT,
});

export const successGetShift: Function = (response: any): any => ({
  type: SUCCESS_GET_SHIFT,
  payload: response,
});

export const errorGetShift: Function = (error: any): any => ({
  type: ERROR_GET_SHIFT,
  payload: error,
});

export const setSelectedShift = (shift: Shift): any => ({
  type: SET_SELECTED_SHIFT,
  payload: shift,
});

export const setShiftSelectedUsers: Function = (selectedUsers: User[]): any => ({
  type: SET_SHIFT_SELECTED_USERS,
  payload: selectedUsers,
});

export const requestUpdateShift: Function = (): any => ({
  type: REQUEST_UPDATE_SHIFT,
});

export const successUpdateShift: Function = (response: any, prevShift: Shift): any => ({
  type: SUCCESS_UPDATE_SHIFT,
  prevShift,
});

export const errorUpdateShift: Function = (error: any): any => ({
  type: ERROR_UPDATE_SHIFT,
  payload: error,
});

export const requestUpdateRepeatingShift: Function = (): any => ({
  type: REQUEST_UPDATE_REPEATING_SHIFT,
});

export const successUpdateRepeatingShift: Function = (response: any, prevShift: Shift): any => ({
  type: SUCCESS_UPDATE_SHIFT,
  prevShift,
});

export const errorUpdateRepeatingShift: Function = (error: any): any => ({
  type: ERROR_UPDATE_REPEATING_SHIFT,
  payload: error,
});

export const requestGetExceptions: Function = (): any => ({
  type: REQUEST_GET_EXCEPTIONS_SHIFTS,
});

export const successGetExceptions: Function = (response: any): any => ({
  type: SUCCESS_GET_EXCEPTIONS_SHIFTS,
  payload: response,
});

export const errorGetExceptions: Function = (error: any): any => ({
  type: ERROR_GET_EXCEPTIONS_SHIFTS,
  payload: error,
});

export const requestGetOfferedShifts: Function = (): any => ({
  type: REQUEST_GET_OFFERED_SHIFTS,
});

export const successGetOfferedShifts: Function = (response: any): any => ({
  type: SUCCESS_GET_OFFERED_SHIFTS,
  payload: response,
});

export const errorGetOfferedShifts: Function = (error: any): any => ({
  type: ERROR_GET_OFFERED_SHIFTS,
  payload: error,
});

export const requestAcceptOfferedShift: Function = (shiftId: string): any => ({
  type: REQUEST_ACCEPT_OFFERED_SHIFT,
  shiftId,
});

export const successAcceptOfferedShift: Function = (response: any): any => ({
  type: SUCCESS_ACCEPT_OFFERED_SHIFT,
  payload: response,
});

export const errorAcceptOfferedShift: Function = (error: any): any => ({
  type: ERROR_ACCEPT_OFFERED_SHIFT,
  payload: error,
});

const initialState: ScheduleState = {
  unassignedShifts: [],
  assignedShifts: [],
  users: [],
  usersSearchTerm: '',
  filteredUsers: [],
  shifts: [],
  isRefreshing: false,
  selectedDate: moment(),
  sites: [],
  selectedDateOnSites: { start: moment().startOf('day'), end: moment().startOf('day') },
  justThisShift: true,
  exceptionsShifts: [],
  offeredShifts: [],
  selectedSite: {},
  selectedShift: {},
  loading: true,
  loadingGetShifts: false,
  loadingExceptions: false,
  loadingGetShift: false,
  loadingOfferedShifts: false,
};

export default (state: ScheduleState = initialState, action: any): ScheduleState => {
  switch (action.type) {
    case GET_UNASSIGNED_SHIFTS:
      return {
        ...state,
        unassignedShifts: action.payload,
      };

    case GET_ASSIGNED_SHIFTS:
      return {
        ...state,
        assignedShifts: action.payload,
      };

    case REQUEST_GET_SHIFTS:
      return {
        ...state,
        loadingGetShifts: true,
      };

    case ERROR_GET_SHIFTS:
      return {
        ...state,
        loadingGetShifts: false,
      };

    case REQUEST_GET_OFFERED_SHIFTS:
      return {
        ...state,
        loadingOfferedShifts: true,
      };

    case ERROR_GET_OFFERED_SHIFTS:
      return {
        ...state,
        loadingOfferedShifts: false,
      };

    case SUCCESS_GET_OFFERED_SHIFTS:
      return {
        ...state,
        offeredShifts: action.payload,
        loadingOfferedShifts: false,
      };

    case REQUEST_ACCEPT_OFFERED_SHIFT:
      return {
        ...state,
        loadingOfferedShifts: true,
      };

    case ERROR_ACCEPT_OFFERED_SHIFT:
      return {
        ...state,
        loadingOfferedShifts: false,
      };

    case SUCCESS_ACCEPT_OFFERED_SHIFT: {
      const offeredShifts = state.offeredShifts.slice();
      const acceptedShiftIndex = offeredShifts.findIndex(s => s.id === action.payload.id);
      offeredShifts.splice(acceptedShiftIndex, 1);
      const assignedShifts = state.assignedShifts.slice();
      assignedShifts.push(action.payload);
      assignedShifts.sort(shiftSortAscending);
      return {
        ...state,
        offeredShifts,
        assignedShifts,
        loadingOfferedShifts: false,
      };
    }

    case SUCCESS_GET_SHIFTS:
      return {
        ...state,
        shifts: action.payload,
        loadingGetShifts: false,
      };

    case REQUEST_GET_EXCEPTIONS_SHIFTS:
      return {
        ...state,
        loadingExceptions: true,
      };

    case ERROR_GET_EXCEPTIONS_SHIFTS:
      return {
        ...state,
        loadingExceptions: false,
      };

    case SUCCESS_GET_EXCEPTIONS_SHIFTS:
      return {
        ...state,
        exceptionsShifts: action.payload,
        loadingExceptions: false,
      };

    case REQUEST_GET_SHIFT:
      return {
        ...state,
        loadingGetShift: true,
      };

    case ERROR_GET_SHIFT:
      return {
        ...state,
        loadingGetShift: false,
      };

    case SUCCESS_GET_SHIFT: {
      const shift = action.payload;
      const assignedShifts = replaceShiftInList(state.assignedShifts, shift);
      const unassignedShifts = replaceShiftInList(state.unassignedShifts, shift);
      const shiftHasExceptions = shift.clockExceptions && shift.clockExceptions.length > -1;
      const shiftIndex = state.exceptionsShifts.findIndex(s => s.id === shift.id);
      const shiftInExceptionsShifts = shiftIndex > -1;
      let exceptionsShifts = state.exceptionsShifts.slice();
      if (shiftHasExceptions && shiftInExceptionsShifts) {
        exceptionsShifts = replaceShiftInList(state.exceptionsShifts, shift);
      } else if (shiftHasExceptions) {
        // add to exceptionShifts
        exceptionsShifts.push(shift);
        exceptionsShifts.sort(shiftSortAscending);
      } else if (shiftInExceptionsShifts) {
        // remove from exceptionShifts
        exceptionsShifts.splice(shiftIndex, 1);
      }
      return {
        ...state,
        selectedShift: shift,
        assignedShifts,
        unassignedShifts,
        exceptionsShifts,
        loadingGetShift: false,
      };
    }

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        usersLoading: false,
      };

    case REQUEST_GET_USERS:
      return {
        ...state,
        usersLoading: true,
      };

    case ERROR_GET_USERS:
      return {
        ...state,
        usersLoading: false,
      };

    case SET_FILTERED_USERS:
      return {
        ...state,
        filteredUsers: action.payload,
      };

    case SET_USERS_SEARCH_TERM:
      return {
        ...state,
        usersSearchTerm: action.payload,
      };

    case SET_SELECTED_SITE:
      return {
        ...state,
        selectedSite: action.payload,
      };

    case SET_SELECTED_DATE:
      return {
        ...state,
        selectedDate: action.payload,
      };
    case SET_SELECTED_DATE_ON_SITES:
      return {
        ...state,
        selectedDateOnSites: action.payload,
      };
    case SET_SELECTED_SHIFT:
      return {
        ...state,
        selectedShift: action.payload,
      };
    case SET_SHIFT_SELECTED_USERS:
      return {
        ...state,
        selectedShift: {
          ...state.selectedShift,
          users: action.payload,
        },
      };
    case SUCCESS_UPDATE_SHIFT: {
      return state;
    }
    case SUCCESS_UPDATE_SHIFT_CLOCK_EVENT: {
      const assignedShifts = state.assignedShifts.slice();
      const clockEvent = { ...action.payload };
      let shiftToUpdate = assignedShifts.find(el => el.id === clockEvent.shiftId);
      if (!shiftToUpdate) {
        return state;
      }
      // Map ClockEvent to ShiftClockEvent
      const shiftClockEvent: ShiftClockEvent = {
        id: clockEvent.id,
        eventTime: clockEvent.eventTime,
        eventType: clockEvent.eventType,
        userId: clockEvent.userId,
      };

      // Add event to shift
      shiftToUpdate = { ...shiftToUpdate, clockEvents: [...shiftToUpdate.clockEvents, shiftClockEvent] };
      // Replace shift with updated version, sort, and update assigned shifts in schedule state
      const newAssignedShifts = assignedShifts.filter(el => el.id !== clockEvent.shiftId);
      newAssignedShifts.push(shiftToUpdate);
      newAssignedShifts.sort(shiftSortAscending);
      return {
        ...state,
        assignedShifts: newAssignedShifts,
        selectedShift: shiftToUpdate,
      };
    }
    case SUCCESS_UPDATE_SHIFT_CLOCK_EVENTS: {
      // This is generally applied to the selectedShift
      const clockEvents = action.payload;
      // No clock events have been updated
      if (clockEvents.length < 1) return state;

      let {
        selectedShift, assignedShifts, exceptionsShifts, unassignedShifts,
      } = state;

      assignedShifts = updateShiftsClockEvents(assignedShifts, clockEvents);
      exceptionsShifts = updateShiftsClockEvents(exceptionsShifts, clockEvents);
      unassignedShifts = updateShiftsClockEvents(unassignedShifts, clockEvents);
      selectedShift = updateSingleShiftClockEvent(selectedShift, clockEvents);

      return {
        ...state,
        assignedShifts,
        exceptionShifts: exceptionsShifts,
        unassignedShifts,
        selectedShift,
      };
    }
    case REQUEST_GET_SITES:
      return {
        ...state,
        sites: action.payload,
        sitesLoading: true,
      };
    case GET_SITES:
      return {
        ...state,
        sites: action.payload,
        sitesLoading: false,
      };
    case ERROR_GET_SITES:
      return {
        ...state,
        sites: [],
        sitesLoading: false,
      };
    case SHOW_LOADING:
      return {
        ...state,
        loading: true,
      };
    case HIDE_LOADING:
      return {
        ...state,
        loading: false,
      };
    case SHOW_REFRESHING_INDICATOR:
      return {
        ...state,
        isRefreshing: true,
        loading: false,
        loadingGetShifts: false,
      };
    case HIDE_REFRESHING_INDICATOR:
      return {
        ...state,
        isRefreshing: false,
        loading: false,
        loadingGetShifts: false,
      };
    default:
      return state;
  }
};
