import type { Saga } from 'redux-saga';
import { put, select, take } from 'redux-saga/effects';
import ErrorHandlerRedux from '@next/schedule/lib/redux/ErrorHandlerRedux';
import { AuthTypes } from '@next/auth/lib/redux/Auth';
import { TenantActionTypes } from '../redux/tenant';

export const getUserTenantId = state => (
  state.auth.user ? state.auth.user.companyId : undefined
);

export default function* startup(): Saga<any> {
  try {
    yield take(AuthTypes.SUCCESS_LOGIN_USER);
    const tenantId = yield select(getUserTenantId);
    if (tenantId) {
      yield put({ type: TenantActionTypes.REQUEST_TENANT, payload: tenantId });
    }
  } catch (error) {
    // TODO: Startup errors - should be handled by some general popup/notificationBar
    yield put(ErrorHandlerRedux.addError('Application startup error.', error));
  }
}
