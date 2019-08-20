// @flow
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';

import { ErrorHandlerTypes } from '@next/schedule/lib/redux/ErrorHandlerRedux';

import { getShift, acceptOfferedShift } from './ScheduleSaga';
import {
  REQUEST_GET_SHIFT, ERROR_GET_SHIFT, SUCCESS_GET_SHIFT,
  REQUEST_ACCEPT_OFFERED_SHIFT, ERROR_ACCEPT_OFFERED_SHIFT, SUCCESS_ACCEPT_OFFERED_SHIFT,
} from '../redux/schedule';

const shiftId = 'shift-id';
const shift = {
  id: shiftId,
};

const storeState = {
  auth: {
    user: {
      companyId: 'tenant-id',
    },
  },
};

describe('Schedule Saga', () => {
  const scheduleService = {
    getShift: jest.fn(),
    acceptOfferedShift: jest.fn(),
  };
  const error = new Error('error!');

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getShift Saga', () => {
    it('just works', () => expectSaga(getShift, scheduleService, shiftId)
      .withState(storeState)
      .provide([
        [matchers.call.fn(scheduleService.getShift), shift],
      ])
      .put.like({
        action: {
          type: REQUEST_GET_SHIFT,
        },
      })
      .put.like({
        action: {
          type: SUCCESS_GET_SHIFT,
        },
      })
      .dispatch({
        type: REQUEST_GET_SHIFT,
        shiftId,
      })
      .run());

    it('throws received error', () => expectSaga(getShift, scheduleService, shiftId)
      .provide([
        [matchers.call.fn(scheduleService.get), throwError(error)],
      ])
      .put.like({
        action: {
          type: ErrorHandlerTypes.ADD_ERROR,
        },
      })
      .put.like({
        action: {
          type: ERROR_GET_SHIFT,
        },
      })
      .dispatch({
        type: REQUEST_GET_SHIFT,
      })
      .run());
  });

  describe('acceptOfferedShift Saga', () => {
    it('just works', () => expectSaga(acceptOfferedShift, scheduleService, shiftId)
      .withState(storeState)
      .provide([
        [matchers.call.fn(scheduleService.acceptOfferedShift), shift],
      ])
      .put.like({
        action: {
          type: SUCCESS_ACCEPT_OFFERED_SHIFT,
        },
      })
      .dispatch({
        type: REQUEST_ACCEPT_OFFERED_SHIFT,
        shiftId,
      })
      .run());

    it('throws received error', () => expectSaga(acceptOfferedShift, scheduleService, shiftId)
      .provide([
        [matchers.call.fn(scheduleService.acceptOfferedShift), throwError(error)],
      ])
      .put.like({
        action: {
          type: ErrorHandlerTypes.ADD_ERROR,
        },
      })
      .put.like({
        action: {
          type: ERROR_ACCEPT_OFFERED_SHIFT,
        },
      })
      .dispatch({
        type: REQUEST_ACCEPT_OFFERED_SHIFT,
      })
      .run());
  });
});
