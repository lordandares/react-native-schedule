
// @flow
import type { Saga } from 'redux-saga';
import { call, select } from 'redux-saga/effects';
import { Sentry } from 'react-native-sentry';
import type { TrackError } from '@next/schedule/types/errorHandler.types';
import {
  RNAPPAUTH_ERROR_CLOSED_BROWSER,
  RNAPPAUTH_ERROR_CLOSED_BROWSER_IOS,
} from '@next/auth/lib/services/AppAuthServiceMobile';
import { getCurrentUser, getUserTenantId } from '@next/auth/lib/redux/Auth';


// For logging specific mobile app exceptions
export function* logException(trackError: TrackError, action: any): Saga<any> {
  try {
    const { type, errorMessage = 'unknown' } = action;
    const error = (errorMessage instanceof Error) ? String(errorMessage.message) : String(errorMessage);

    // TODO: could pass a pure Error object
    if (error.includes(RNAPPAUTH_ERROR_CLOSED_BROWSER) ||
      error.includes(RNAPPAUTH_ERROR_CLOSED_BROWSER_IOS)) {
      // User cancelled the browser - ignore
      return;
    }

    const msg = `Error on action ${type}: ${error}`;
    yield call(trackError, Error(msg), msg);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }
}

export function* setEnvironment(action: any): Saga<any> {
  const { env } = action;
  yield call(Sentry.setTagsContext, { environment: env });
}

export function* updateContext(): Saga<any> {
  const user = yield select(getCurrentUser);
  if (user) {
    const tenantId = yield select(getUserTenantId);
    Sentry.setUserContext({
      userID: user.userId,
      email: user.email,
    });
    Sentry.setExtraContext({
      userRole: user.userRole,
      companyId: user.companyId,
      tenantId,
    });
  }
}
