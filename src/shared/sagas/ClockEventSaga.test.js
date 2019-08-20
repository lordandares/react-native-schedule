// @flow
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';

import { ErrorHandlerTypes } from '@next/schedule/lib/redux/ErrorHandlerRedux';

import { clockIn, clockOut } from './ClockEventSaga';
import { ClockEventTypes } from '../redux/clockevents';

const location = {
  mocked: true,
  timestamp: 12345,
  coords: {
    accuracy: 5,
    longitude: -122.084,
    latitude: 37.423,
  },
};

const shift = {
  id: 'shift-id',
};

const clockEvent = {
  eventTime: new Date(),
  userId: 'user-id',
  siteId: 'site-id',
  serviceId: 'service-id',
  shiftId: 'shift-id',
};

const clockEventWithLocation = {
  ...clockEvent,
  location: {
    type: 'Point',
    coordinates: [location.coords.longitude, location.coords.latitude],
    properties: {
      accuracy: location.coords.accuracy,
      mocked: location.mocked,
    },
  },
};

const storeState = {
  auth: {
    user: {
      companyId: 'tenant-id',
    },
  },
};

describe('Clock Event Saga', () => {
  const getCurrentLocation = jest.fn();
  const getShift = jest.fn();
  const locationService = {
    getUserLocation: jest.fn(),
  };
  const scheduleService = {
    getShift: jest.fn(),
  };
  const timekeepingService = {
    doClockIn: jest.fn(),
    doClockOut: jest.fn(),
  };
  const error = new Error('error!');

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('clockIn Saga', () => {
    it('just works', () => expectSaga(
      clockIn, getCurrentLocation, getShift,
      locationService, scheduleService, timekeepingService, { clockEvent },
    )
      .withState(storeState)
      .provide([
        [matchers.call.fn(getCurrentLocation), location],
        [matchers.call.fn(getShift), shift],
        [matchers.call.fn(timekeepingService.doClockIn), clockEventWithLocation],
      ])
      .put.like({
        action: {
          type: ClockEventTypes.SUCCESS_CLOCK_EVENT,
        },
      })
      .dispatch({
        type: ClockEventTypes.REQUEST_CLOCK_IN,
        clockEvent,
      })
      .run());

    it('throws received error', () => expectSaga(
      clockIn, getCurrentLocation, getShift,
      locationService, scheduleService, timekeepingService, { clockEvent },
    )
      .provide([
        [matchers.call.fn(getCurrentLocation), throwError(error)],
      ])
      .put.like({
        action: {
          type: ErrorHandlerTypes.ADD_ERROR,
        },
      })
      .put.like({
        action: {
          type: ClockEventTypes.ERROR_CLOCK_EVENT,
        },
      })
      .dispatch({
        type: ClockEventTypes.REQUEST_CLOCK_IN,
      })
      .run());
  });

  describe('clockOut saga', () => {
    it('just works', () => expectSaga(
      clockOut, getCurrentLocation, getShift,
      locationService, scheduleService, timekeepingService, { clockEvent },
    )
      .withState(storeState)
      .provide([
        [matchers.call.fn(getCurrentLocation), location],
        [matchers.call.fn(getShift), shift],
        [matchers.call.fn(timekeepingService.doClockOut), clockEventWithLocation],
      ])
      .put.like({
        action: {
          type: ClockEventTypes.SUCCESS_CLOCK_EVENT,
        },
      })
      .dispatch({
        type: ClockEventTypes.REQUEST_CLOCK_OUT,
        clockEvent,
      })
      .run());

    it('throws received error', () => expectSaga(
      clockOut, getCurrentLocation, getShift,
      locationService, scheduleService, timekeepingService, { clockEvent },
    )
      .provide([
        [matchers.call.fn(getCurrentLocation), throwError(error)],
      ])
      .put.like({
        action: {
          type: ErrorHandlerTypes.ADD_ERROR,
        },
      })
      .put.like({
        action: {
          type: ClockEventTypes.ERROR_CLOCK_EVENT,
        },
      })
      .dispatch({
        type: ClockEventTypes.REQUEST_CLOCK_IN,
      })
      .run());
  });
});
