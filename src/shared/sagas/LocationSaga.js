import { call, put, select } from 'redux-saga/effects';
import { PermissionsAndroid, Platform } from 'react-native';
import ErrorHandlerRedux from '@next/schedule/lib/redux/ErrorHandlerRedux';
import { selectIsLocationsOn } from '../../shared/redux/featureflags.selectors';
import { ILocationService } from './location.service';
import LocationRedux, { selectPermissions } from '../redux/location';

export function* getPermissions() {
  try {
    let hasPermission = true;
    // Supports Android's new permission model. For Android older devices,
    // it's always on.
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      hasPermission = yield call(PermissionsAndroid.check, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (!hasPermission) {
        const status = yield call(PermissionsAndroid.request, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        hasPermission = status === PermissionsAndroid.RESULTS.GRANTED;
      }
    }
    yield put(LocationRedux.successGetPermissions(hasPermission));
  } catch (error) {
    yield put(ErrorHandlerRedux.addError(`Failed to get location permissions: ${error.message}`, error));
    yield put(LocationRedux.errorGetPermissions(error.message));
  }
}

export function* getCurrentLocation(locationService: ILocationService) {
  // check feature flag
  const locationFeatureOn = yield select(selectIsLocationsOn);
  if (locationFeatureOn) {
    // check permissions
    let hasPermission = yield select(selectPermissions);
    if (hasPermission === null) {
      // permissions not set, set them
      yield call(getPermissions);
      hasPermission = yield select(selectPermissions);
    }
    // check permissions
    if (hasPermission) {
      try {
        // get location
        const location = yield call(locationService.getUserLocation);
        yield put(LocationRedux.successGetLocation(location));
        return location;
      } catch (error) {
        yield put(ErrorHandlerRedux.addError(`Failed to get location: ${error.message}`, error));
        yield put(LocationRedux.errorGetLocation(error.message));
      }
    } else {
      yield put(LocationRedux.successGetLocation(null));
    }
  }
  return null;
}
