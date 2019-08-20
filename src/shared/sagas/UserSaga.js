// @flow
import { Saga } from 'redux-saga';
import { Platform } from 'react-native';
import * as AppCenter from 'appcenter';
import type { IManagementApi, User } from '@next/schedule/types/management.types';
import type { AuthUser, IAuthService } from '@next/auth/types/auth.types';
import { getCurrentUser } from '@next/auth/lib/redux/Auth';
import { put, call, select, take } from 'redux-saga/effects';
import * as AuthSaga from '@next/auth/lib/sagas/AuthSaga';
import UserActions, { getUser as getUserFromStore, UserTypes } from '../redux/user';

export function* getUser(managementService: IManagementApi): Saga<User> {
  try {
    const authUser: AuthUser = yield select(getCurrentUser);
    const user: User = yield call(managementService.getUser, authUser.userId);
    yield put(UserActions.successUser(user));
  } catch (err) {
    yield put(UserActions.errorUser(err.message || err));
  }
}

export function* updateUser(managementService: IManagementApi, action: any): Saga<User> {
  try {
    const user: User = yield call(managementService.updateUser, action.payload);
    yield put(UserActions.successUser(user));
    return user;
  } catch (err) {
    yield put(UserActions.errorUser(err.message || err));
    return null;
  }
}

export function* getUsers(managementService: IManagementApi): Saga<User[]> {
  try {
    const params = { status: 'Active' };
    const users: User[] = yield call(managementService.getFilteredUsers, params);
    yield put(UserActions.successUsers(users));
  } catch (err) {
    yield put(UserActions.errorUsers(err.message || err));
  }
}

export function* associateDevice(managementService: IManagementApi, action: any): Saga<User> {
  try {
    const { user } = action;
    user.devices = user.devices || [];
    const installId = yield call(AppCenter.getInstallId);
    const installPlatform = Platform.OS;

    const device = {
      userId: user.id,
      tenantId: user.tenantId,
      deviceId: installId,
      devicePlatform: installPlatform,
    };

    if (user.devices.find(d => d.deviceId === device.deviceId) === undefined) {
      user.devices.push(device);
      const updatedUser = yield call(updateUser, managementService, { payload: user });
      if (updatedUser) yield put(UserActions.successUser(updatedUser));
    }
  } catch (err) {
    yield put(UserActions.errorUser(err.message || err));
  }
}

export function* associateDeviceOnLogin(managementService: IManagementApi): Saga<User> {
  try {
    const action = yield take(UserTypes.SUCCESS_USER);
    yield call(associateDevice, managementService, action);
  } catch (err) {
    yield put(UserActions.errorUser(err.message || err));
  }
}

function* disAssociateDevice(managementService: IManagementApi, authService: IAuthService, trackError) {
  try {
    const token = yield call(authService.getAccessToken);
    const user: User = yield select(getUserFromStore);
    const installId = yield call(AppCenter.getInstallId);
    if (user.devices) {
      user.devices = user.devices.filter(d => d.deviceId !== installId);
      yield call(managementService.disAssociateDevice, user, token);
    }
  } catch (err) {
    trackError(err);
    yield put(UserActions.errorUser(err.message || err));
  } finally {
    yield call(AuthSaga.logoutUser, authService);
  }
}

export function* handleLogout(managementService: IManagementApi, authService: IAuthService, trackError): Saga<User> {
  yield call(disAssociateDevice, managementService, authService, trackError);
}
