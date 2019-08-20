import { call, put, select } from 'redux-saga/effects';
import { getUserTenantId } from '@next/auth/lib/redux/Auth';
import ErrorHandlerRedux from '@next/schedule/lib/redux/ErrorHandlerRedux';
import { IScheduleService } from '@next/schedule/types/schedule.types';
import {
  requestGetShift, successGetShift, errorGetShift,
  successAcceptOfferedShift, errorAcceptOfferedShift,
} from '../redux/schedule';

export function* getShift(scheduleService: IScheduleService, shiftId: string) {
  try {
    yield put(requestGetShift());
    const tenantId = getUserTenantId(yield select());
    const shift = yield call(scheduleService.getShift, tenantId, shiftId);
    yield put(successGetShift(shift));
  } catch (error) {
    yield put(errorGetShift(error.message));
    yield put(ErrorHandlerRedux.addError(`Error GetShift: ${error.message}`, error));
  }
}

export function* acceptOfferedShift(scheduleService: IScheduleService, { shiftId }) {
  try {
    const shift = yield call(scheduleService.acceptOfferedShift, shiftId);
    yield put(successAcceptOfferedShift(shift));
  } catch (error) {
    yield put(errorAcceptOfferedShift(error.message));
    yield put(ErrorHandlerRedux.addError(`Error accepting offered shift: ${error.message}`, error));
  }
}
