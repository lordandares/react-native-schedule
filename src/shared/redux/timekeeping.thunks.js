import type { ClockEvent } from '@next/schedule/types/timekeeping.types';
import ErrorHandlerRedux from '@next/schedule/lib/redux/ErrorHandlerRedux';
import type { APIResponse } from '@next/schedule/types/generic.types';
import type { AppServices } from '../types/app.types';
import {
  showLoading,
  SUCCESS_UPDATE_SHIFT_CLOCK_EVENTS,
  hideLoading,
  REQUEST_UPDATE_SHIFT_CLOCK_EVENTS,
} from './schedule';

export function editClockEvents(shiftId: string, clockEvents: ClockEvent[]) {
  return async (dispatch: Function, getState: Function, { timekeepingService }: AppServices) => {
    try {
      dispatch({ type: REQUEST_UPDATE_SHIFT_CLOCK_EVENTS, shiftId, clockEvents });
      dispatch(showLoading());
      const res: APIResponse<string> = await timekeepingService.editClockEvents(shiftId, clockEvents);
      if (res && res.ok) {
        dispatch({ type: SUCCESS_UPDATE_SHIFT_CLOCK_EVENTS, payload: res.data });
      } else {
        throw new Error(`${res.problem}: ${JSON.stringify(res.data)}`);
      }
    } catch (error) {
      dispatch(ErrorHandlerRedux.addError('Failed to update clock events. Please try again.', error));
    } finally {
      dispatch(hideLoading());
    }
  };
}
