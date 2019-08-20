// @flow
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as matchers from 'redux-saga-test-plan/matchers';
import { select } from 'redux-saga/effects';
import { ErrorHandlerTypes } from '@next/schedule/lib/redux/ErrorHandlerRedux';

import { selectIsLocationsOn } from '../../shared/redux/featureflags.selectors';
import { getPermissions, getCurrentLocation } from './LocationSaga';
import { LocationTypes, selectPermissions } from '../redux/location';

const location = {
  mocked: true,
  timestamp: 12345,
  coords: {
    accuracy: 5,
    longitude: -122.084,
    latitude: 37.423,
  },
};

describe('getPermissions saga', () => {
  it('just works', () => expectSaga(getPermissions)
    .put({
      type: LocationTypes.SUCCESS_GET_PERMISSIONS,
      hasPermission: true,
    })
    .dispatch({
      type: LocationTypes.REQUEST_GET_PERMISSIONS,
    })
    .run());
});

describe('getCurrentLocation saga', () => {
  const locationService = {
    getUserLocation: jest.fn(),
  };
  const error = new Error('error!');

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('just works', () => expectSaga(getCurrentLocation, locationService)
    .provide([
      [select(selectIsLocationsOn), true],
      [select(selectPermissions), true],
      [matchers.call.fn(locationService.getUserLocation), location],
    ])
    .put({
      type: LocationTypes.SUCCESS_GET_LOCATION,
      location,
    })
    .dispatch({
      type: LocationTypes.REQUEST_GET_LOCATION,
    })
    .run());

  it('throws received error', () => expectSaga(getCurrentLocation, locationService)
    .provide([
      [select(selectIsLocationsOn), true],
      [select(selectPermissions), true],
      [matchers.call.fn(locationService.getUserLocation), throwError(error)],
    ])
    .put.like({
      action: {
        type: ErrorHandlerTypes.ADD_ERROR,
      },
    })
    .put.like({
      action: {
        type: LocationTypes.ERROR_GET_LOCATION,
      },
    })
    .dispatch({
      type: LocationTypes.REQUEST_GET_LOCATION,
    })
    .run());
});
