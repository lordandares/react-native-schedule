import { call, put, select } from 'redux-saga/effects';
import ErrorHandlerRedux from '@next/schedule/lib/redux/ErrorHandlerRedux';
import { IScheduleService } from '@next/schedule/types/schedule.types';
import { ITimekeepingService, ClockEvent } from '@next/schedule/types/timekeeping.types';
import { getUserTenantId } from '@next/auth/lib/redux/Auth';
import { Saga } from 'redux-saga';
import { ILocationService } from './location.service';
import ClockEventsRedux from '../redux/clockevents';

export function* clockIn(
  getCurrentLocation: Saga,
  getShift: Saga,
  locationService: ILocationService,
  scheduleService: IScheduleService,
  timekeepingService: ITimekeepingService,
  { clockEvent },
) {
  try {
    let record = clockEvent;
    // get location
    const location = yield call(getCurrentLocation, locationService);
    // add location to clock event
    if (location) {
      record = {
        ...record,
        location: {
          type: 'Point',
          coordinates: [location.coords.longitude, location.coords.latitude],
          properties: {
            accuracy: location.coords.accuracy,
            mocked: location.mocked,
          },
        },
      };
    }
    // doClockIn
    const tenantId = getUserTenantId(yield select());
    const event: ClockEvent = yield call(timekeepingService.doClockIn, tenantId, record);
    yield put(ClockEventsRedux.successClockEvent(record));
    yield call(getShift, scheduleService, event.shiftId);
  } catch (error) {
    yield put(ErrorHandlerRedux.addError(`Error Clocking In: ${error.message}`, error));
    yield put(ClockEventsRedux.errorClockEvent(error.message));
  }
}

export function* clockOut(
  getCurrentLocation: Saga,
  getShift: Saga,
  locationService: ILocationService,
  scheduleService: IScheduleService,
  timekeepingService: ITimekeepingService,
  { clockEvent },
) {
  try {
    let record = clockEvent;
    // get location
    const location = yield call(getCurrentLocation, locationService);
    // add location to clock event
    if (location) {
      record = {
        ...record,
        location: {
          type: 'Point',
          coordinates: [location.coords.longitude, location.coords.latitude],
          properties: {
            accuracy: location.coords.accuracy,
            mocked: location.mocked,
          },
        },
      };
    }
    // doClockOut
    const tenantId = getUserTenantId(yield select());
    const event: ClockEvent = yield call(timekeepingService.doClockOut, tenantId, record);
    yield put(ClockEventsRedux.successClockEvent(record));
    yield call(getShift, scheduleService, event.shiftId);
  } catch (error) {
    yield put(ErrorHandlerRedux.addError(`Error Clocking In: ${error.message}`, error));
    yield put(ClockEventsRedux.errorClockEvent(error.message));
  }
}
