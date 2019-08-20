
import { call, put, select, take } from 'redux-saga/effects';
import ErrorHandlerRedux from '@next/schedule/lib/redux/ErrorHandlerRedux';
import { getCurrentUser, AuthTypes, getUserTenantId } from '@next/auth/lib/redux/Auth';

import { getEnvironment } from '../redux/EnvSwitchRedux';
import { getCurrentScreen, appNavigationTypes, getActiveTab, getActiveInnerTab } from '../redux/appNavigation';
import { AnalyticsTypes } from '../redux/analytics';
import AnalyticsEvents, { EVENT_GROUP_SCREEN } from '../constants/analyticsEvents';


export function* enableAnalytics({ AppCenterAnalytics }) {
  try {
    const enabled = yield call(AppCenterAnalytics.isEnabled);
    if (!enabled) yield call(AppCenterAnalytics.setEnabled, true);
  } catch (error) {
    yield put(ErrorHandlerRedux.addError(`Error while enabling mobile analytics: ${error.message}`, error));
  }
}

export function* trackEvent({ AppCenterAnalytics }, action) {
  try {
    // Don't track in local development mode
    if (__DEV__) return;

    // AppCenter contraints:
    // Max 200 distinct event names.
    // Max 256 characters per event name
    // Max 125 characters per event property name and property value.
    let eventName;
    const screen = String(yield select(getCurrentScreen));
    const env = __DEV__ ? 'local-dev' : String(yield select(getEnvironment));

    // Process triggers
    switch (action.type) {
      case AnalyticsTypes.TRACK_EVENT:
        // eslint-disable-next-line prefer-destructuring
        eventName = action.eventName;
        break;
      case AuthTypes.REQUEST_LOGIN_USER: {
        // Only track if login was successful
        const loginResult = yield take([AuthTypes.SUCCESS_LOGIN_USER, AuthTypes.ERROR_LOGIN_USER]);
        if (loginResult.type === AuthTypes.ERROR_LOGIN_USER) return;
        eventName = AnalyticsEvents.LOGGED_IN;
        break;
      }
      case AuthTypes.REQUEST_LOGOUT_USER:
        eventName = AnalyticsEvents.LOGGED_OUT;
        break;
      case appNavigationTypes.SCREEN_CHANGED:
        eventName = EVENT_GROUP_SCREEN + action.screenName;
        break;
      default:
        throw new Error(`Unknown action type: ${action.type}`);
    }

    // Setup props
    const user = yield select(getCurrentUser);
    const tenantId = String(yield select(getUserTenantId));
    const email = user ? String(user.email) : 'NOT-LOGGED-IN';
    const tab = yield select(getActiveTab);
    const tabId = tab ? String(tab.id) : '';
    const innerTab = yield select(getActiveInnerTab);
    const innerTabId = innerTab ? String(innerTab.id) : '';

    // Call Analytics services
    yield call(
      AppCenterAnalytics.trackEvent,
      String(eventName),
      {
        environment: env,
        username: email,
        screen,
        tab: tabId,
        innerTab: innerTabId,
        tenantId,
      },
    );
  } catch (error) {
    yield put(ErrorHandlerRedux.addError(`Failed to track an analytics event: ${error.message}`, error));
  }
}

