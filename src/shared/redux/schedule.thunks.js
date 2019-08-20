// These are candidates to be moved to ReduxSagas

import moment from 'moment-timezone';
import { getCurrentUser, getUserTenantId } from '@next/auth/lib/redux/Auth';
import ErrorHandlerRedux from '@next/schedule/lib/redux/ErrorHandlerRedux';
import { Sentry, SentrySeverity } from 'react-native-sentry';
import type {
  UpdateFlexFixedShiftRequest,
  UpdateFlexFixedShiftResponse, UpdateRepeatingShiftRequest,
  UpdateRepeatingShiftResponse,
} from '@next/schedule/types/schedule.types';
import updateLocalShiftLists from './updateLocalShiftLists';

import type
{
  Shift,
  ReturnMessage,
  Site,
} from '../types/schedule.types';
import shiftSortAscending from '../utils/shift/shiftSortAscending';
import {
  requestGetShifts,
  successGetShifts,
  errorGetShifts,
  REQUEST_GET_SITES,
  GET_SITES,
  ERROR_GET_SITES,
  requestGetShift,
  errorGetShift,
  successGetShift,
  showLoading,
  hideLoading,
  GET_ASSIGNED_SHIFTS,
  requestUpdateShift,
  successUpdateShift,
  errorUpdateShift,
  requestUpdateRepeatingShift,
  GET_UNASSIGNED_SHIFTS,
  successUpdateRepeatingShift,
  errorUpdateRepeatingShift,
  requestGetExceptions,
  successGetExceptions,
  errorGetExceptions,
  SET_SELECTED_DATE,
  SET_SELECTED_DATE_ON_SITES,
  requestGetOfferedShifts,
  successGetOfferedShifts,
  errorGetOfferedShifts,
} from './schedule';
import type { AppServices } from '../types/app.types';
import { OvernightShiftValidator } from '../components/SectionShiftList/OvernightShiftValidator';
import { CanClockInValidator } from '../components/ShiftListItem/CanClockInValidator';
import { CanClockOutValidator } from '../components/ShiftListItem/CanClockOutValidator';
import { selectAssignedShifts, selectSelectedShift, selectShifts, selectUnassignedShifts } from './schedule.selectors';
import { shiftTypeValue } from '../types/schedule.types';

export const setTimeZoneToShift = (shift: Shift): Shift => {
  if (moment.tz.names().includes(shift.siteTimeZone)) {
    return {
      ...shift,
      start: moment(shift.start).tz(shift.siteTimeZone),
      end: moment(shift.end).tz(shift.siteTimeZone),
    };
  }
  Sentry.captureMessage(`Error detected on Shift id: "${shift.id}", \n invalid Timezone "${shift.siteTimeZone}".`, {
    level: SentrySeverity.Warning,
  });
  return {
    ...shift,
    start: moment(shift.start),
    end: moment(shift.end),
  };
};

const setTimeZoneToShiftList = (shifts: Shift[], from: moment, to: moment): Shift[] => (from && to ?
  shifts
    .map((shift: Shift) => setTimeZoneToShift(shift))
    .filter((shift: Shift) =>
      moment(shift.start.format('YYYY-MM-DD')) >= moment(from.format('YYYY-MM-DD')) &&
      moment(shift.start.format('YYYY-MM-DD')) <= moment(to.format('YYYY-MM-DD')))
  : shifts.map((shift: Shift) => setTimeZoneToShift(shift)));

export const filterPastOfferedShifts = (shift: Shift): Shift[] => shift.end.isAfter(moment());

export function getSites() {
  return async (dispatch: Function, getState: Function, { scheduleService }: AppServices) => {
    try {
      dispatch({ type: REQUEST_GET_SITES });
      const tenantId = getUserTenantId(getState());
      const returnMessage: Site[] = await scheduleService.getSites(tenantId);
      const sites: Site[] = (returnMessage: any);
      dispatch({ type: GET_SITES, payload: sites });
    } catch (error) {
      dispatch({ type: ERROR_GET_SITES, error });
      dispatch(ErrorHandlerRedux.addError('Failed to load sites list. Please try again.', error));
    }
  };
}

export const getShifts: Function = (fromDate: ?moment, toDate: ?moment, siteId: ?string, customerId: ?string) => async (
  dispatch,
  getState,
  { scheduleService },
) => {
  dispatch(requestGetShifts());
  try {
    const tenantId = getUserTenantId(getState());
    const ret: ReturnMessage<Shift[]> = await scheduleService.getShiftsMobile(
      tenantId,
      null,
      fromDate,
      toDate,
      null,
      siteId,
      customerId,
    );
    const shifts = !ret ? [] : ret.payload;
    const filteredList: Shift[] = setTimeZoneToShiftList(shifts, fromDate, toDate);
    filteredList.sort(shiftSortAscending);
    dispatch(successGetShifts(filteredList));
  } catch (error) {
    dispatch(errorGetShifts(error));
    dispatch(ErrorHandlerRedux.addError('Failed to load shifts list. Please try again.', error));
  }
};

export const getOfferedShifts: Function = () => async (
  dispatch,
  getState,
  { scheduleService },
) => {
  dispatch(requestGetOfferedShifts());
  try {
    const tenantId = getUserTenantId(getState());
    const fromDate = moment().add(-1, 'days');
    const toDate = moment().add(60, 'days');
    const offeredUserId = getCurrentUser(getState()).userId;

    const ret: ReturnMessage<Shift[]> = await scheduleService.getShiftsMobile(
      tenantId,
      null,
      fromDate,
      toDate,
      null,
      null,
      null,
      offeredUserId,
    );
    const shifts = !ret ? [] : ret.payload;
    const upcomingOfferedShifts: Shift[] = shifts
      .map((shift: Shift) => setTimeZoneToShift(shift))
      .filter(filterPastOfferedShifts);
    upcomingOfferedShifts.sort(shiftSortAscending);
    dispatch(successGetOfferedShifts(upcomingOfferedShifts));
  } catch (error) {
    dispatch(errorGetOfferedShifts(error));
    dispatch(ErrorHandlerRedux.addError('Failed to load offered shifts list. Please try again.', error));
  }
};

export function getExceptions() {
  return async (dispatch: Function, getState: Function, { scheduleService }: AppServices) => {
    dispatch(requestGetExceptions());
    try {
      const fetchFrom = moment().day(0);
      const fetchTo = moment().day(6);

      const dateFrom: moment = moment(fetchFrom).startOf('day');
      const dateTo: moment = moment(fetchTo).endOf('day');

      const tenantId = getUserTenantId(getState());
      const currentUser = getCurrentUser(getState());
      // added return to get getExceptions as Promises
      const returnMessage: ReturnMessage<Shift[]> =
        await scheduleService.getExceptions(tenantId, dateFrom, dateTo, currentUser.userId);

      let exceptionsShiftsList: Shift[] = returnMessage;
      if (!Array.isArray(exceptionsShiftsList)) {
        exceptionsShiftsList = [];
      }
      // eslint-disable-next-line
      exceptionsShiftsList.sort((shift1: Shift, shift2: Shift) => new Date(shift1.start) - new Date(shift2.start));
      const finalList: Shift[] = setTimeZoneToShiftList(exceptionsShiftsList);
      dispatch(successGetExceptions(finalList));
      // added return to get getExceptions as Promise
      return finalList;
    } catch (error) {
      dispatch(errorGetExceptions(error));
      dispatch(ErrorHandlerRedux.addError('Failed to load exceptions. Please try again.', error));
      return false;
    }
  };
}

export const getShift: Function = (shiftId: string) => async (
  dispatch,
  getState,
  { scheduleService },
) => {
  dispatch(requestGetShift());
  try {
    const tenantId = getUserTenantId(getState());
    const ret: ReturnMessage<Shift[]> = await scheduleService.getShift(
      tenantId,
      shiftId,
    );
    const shift = !ret ? [] : ret;
    dispatch(successGetShift(shift));
  } catch (error) {
    dispatch(errorGetShift(error));
    dispatch(ErrorHandlerRedux.addError('Failed to load shift. Please try again.', error));
  }
};

export function getAssignedShifts(from: moment = moment(), to: moment = moment()) {
  return async (dispatch: Function, getState: Function, { scheduleService }) => {
    try {
      dispatch(showLoading());
      const currentUser = getCurrentUser(getState());
      const fetchFrom = moment(from).add(-1, 'd');
      const fetchTo = moment(to);
      if (!currentUser || !currentUser.userId) {
        dispatch({ type: GET_ASSIGNED_SHIFTS, payload: [] });
        return;
      }
      // we add a -15 +15 off tolerance to get the shift in the correct day for the timezones
      fetchFrom.add(-15, 'hours');
      fetchTo.add(+15, 'hours');
      const dateFrom: moment = fetchFrom.startOf('day');
      const dateTo: moment = fetchTo.endOf('day');

      const tenantId = getUserTenantId(getState());
      // added return to get a Promise
      const returnMessage: ReturnMessage<Shift[]> =
        await scheduleService.getAssignedShifts(tenantId, dateFrom, dateTo, currentUser.userId);

      const assignedShifts: Shift[] = (returnMessage.payload: any);
      const filteredAssignedShifts: Shift[] = [];
      const selectedDayStart: moment = from.startOf('day');

      for (let count = 0; count < assignedShifts.length; count += 1) {
        const shift: Shift = assignedShifts[count];

        const isOvernightShiftValidator = new OvernightShiftValidator(shift);
        const canClockInValidator = new CanClockInValidator(shift);
        const canClockOutValidator = new CanClockOutValidator(shift);

        const shiftStart: moment = moment(shift.start);

        if (shiftStart.isBefore(selectedDayStart)) {
          if (isOvernightShiftValidator.isOvernightShift(selectedDayStart)) {
            if (canClockInValidator.canClockIn() || canClockOutValidator.canClockOut()) {
              filteredAssignedShifts.push(assignedShifts[count]);
            }
          }
        } else {
          filteredAssignedShifts.push(assignedShifts[count]);
        }
      }

      filteredAssignedShifts.sort((shift1: Shift, shift2: Shift) => new Date(shift1.start) - new Date(shift2.start));
      const finalList: Shift[] = setTimeZoneToShiftList(filteredAssignedShifts, dateFrom, dateTo);
      dispatch({ type: GET_ASSIGNED_SHIFTS, payload: finalList });
      dispatch(hideLoading());
    } catch (error) {
      dispatch(ErrorHandlerRedux.addError('Failed to load assigned shifts list. Please try again.', error));
    }
  };
}

export const updateShift: Function = (shift: Shift) => async (
  dispatch: Function,
  getState: Function,
  { scheduleService }: AppServices,
): any => {
  try {
    dispatch(requestUpdateShift());
    let ret: Shift;
    if (shift.shiftType === shiftTypeValue.flexFixed.value) {
      const updateFlexRequest: UpdateFlexFixedShiftRequest = { shift };
      const response: UpdateFlexFixedShiftResponse = await scheduleService.updateFlexFixedShift(updateFlexRequest);
      ret = response.shift;
    } else {
      ret = await scheduleService.updateShift(shift);
    }
    let returnShift = ret || shift;
    returnShift = setTimeZoneToShift(returnShift);
    updateLocalShiftLists(
      selectShifts(getState()),
      selectAssignedShifts(getState()),
      selectUnassignedShifts(getState()),
      selectSelectedShift(getState()),
      returnShift,
      shift,
      getCurrentUser(getState()),
      dispatch,
    );
    // we don't have a good way to tell if an exception was fixed/created, just refresh
    dispatch(getExceptions());
    dispatch(successUpdateShift());
    return returnShift;
  } catch (error) {
    dispatch(errorUpdateShift(error));
    dispatch(ErrorHandlerRedux.addError('Failed to update shift. Please try again.', error));
    return false;
  }
};

export const updateRepeatingShift: Function =
  (updateRequest: UpdateRepeatingShiftRequest) => async (
    dispatch: Function,
    getState: Function,
    { scheduleService }: AppServices,
  ): any => {
    dispatch(requestUpdateRepeatingShift());
    try {
      let ret: UpdateRepeatingShiftResponse | UpdateFlexFixedShiftResponse;
      if (updateRequest.shift.shiftType === shiftTypeValue.flexRepeating.value) {
        ret = await scheduleService.updateFlexRepeatingShift(updateRequest);
      } else {
        const response: UpdateRepeatingShiftResponse = await scheduleService.updateRepeatingShift(updateRequest);
        ret = response.shifts;
      }
      const returnShiftList = ret || {};
      const returnShift: Shift = setTimeZoneToShift(returnShiftList[0]);
      updateLocalShiftLists(
        selectShifts(getState()),
        selectAssignedShifts(getState()),
        selectUnassignedShifts(getState()),
        selectSelectedShift(getState()),
        returnShift,
        updateRequest.shift,
        getCurrentUser(getState()),
        dispatch,
      );

      dispatch(successUpdateRepeatingShift());
      // we don't have a good way to tell if an exception was fixed/created, just refresh
      dispatch(getExceptions());
      return returnShift;
    } catch (error) {
      dispatch(errorUpdateRepeatingShift(error));
      dispatch(ErrorHandlerRedux.addError('Failed to update repeating shift. Please try again.', error));
      return false;
    }
  };

export function getUnassignedShifts(from: moment = moment(), to: moment = moment()) {
  return async (dispatch: Function, getState: Function, { scheduleService }: AppServices) => {
    try {
      dispatch(showLoading());
      const fetchFrom = moment(from);
      const fetchTo = moment(to);
      // we add a -15 +15 off tolerance to get the shift in the correct day for the timezones
      fetchFrom.add(-15, 'hours');
      fetchTo.add(+15, 'hours');
      const dateFrom: moment = fetchFrom.startOf('day');
      const dateTo: moment = fetchTo.endOf('day');

      const tenantId = getUserTenantId(getState());
      // added return to get getUnassignedShifts as Promises
      const returnMessage: ReturnMessage<Shift[]> =
        await scheduleService.getUnassignedShifts(tenantId, dateFrom, dateTo);

      const unassignedShifts: Shift[] = (returnMessage.payload: any);
      unassignedShifts.sort((shift1: Shift, shift2: Shift) => new Date(shift1.start) - new Date(shift2.start));
      const finalList: Shift[] = setTimeZoneToShiftList(unassignedShifts, from, to);
      dispatch({ type: GET_UNASSIGNED_SHIFTS, payload: finalList });
      // added return to get getUnassignedShifts as Promise
      return finalList;
    } catch (error) {
      dispatch(errorGetShifts(error));
      dispatch(ErrorHandlerRedux.addError('Failed to load unassigned shifts. Please try again.', error));
      return null;
    } finally {
      dispatch(hideLoading());
    }
  };
}

export const setSelectedDate = (selectedDate: moment) => (dispatch: Function) => {
  dispatch({ type: SET_SELECTED_DATE, payload: selectedDate });
  dispatch(getAssignedShifts(moment(selectedDate), moment(selectedDate).add(31, 'd')));
  dispatch(getUnassignedShifts(moment(selectedDate), moment(selectedDate)));
};

export const setSelectedDateOnSites =
  (selectedDateOnSites: moment, endDate: moment, site: Site) =>
    (dispatch: Function) => {
      dispatch({ type: SET_SELECTED_DATE_ON_SITES, payload: { start: selectedDateOnSites, end: endDate } });
      dispatch(getShifts(
        moment(selectedDateOnSites).startOf('day'),
        moment(endDate).endOf('day'),
        site.id,
        site.customerId,
      ));
    };
