// @flow
import type { Saga } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { Platform } from 'react-native';

import type { AuthUser } from '@next/auth/types/auth.types';
import type { FeatureFlagUser, IFeatureFlagClientFactory } from '../featureFlags/featureflags.types';
import featureFlagAction from '../../../../libs/js/next-schedule/src/redux/FeatureFlagsRedux';
import { IFeatureFlagClient } from '../featureFlags/featureflags.types';
import { LAUNCHDARKLY_CLIENT_KEY_PROD, LAUNCHDARKLY_CLIENT_KEY_TEST } from '../config/config';
import { ENV_PROD, ENV_TEST, ENV_DEV } from '../redux/EnvSwitchRedux';

let featureFlagClient: IFeatureFlagClient;

function getFeatureFlagKey(env: string, trackError: Function): string {
  switch (env) {
    case ENV_TEST:
    case ENV_DEV:
      return LAUNCHDARKLY_CLIENT_KEY_TEST;
    case ENV_PROD:
      return LAUNCHDARKLY_CLIENT_KEY_PROD;
    default:
      trackError(new Error(`getFeatureFlagKey received an invalid environment key: '${env}'`));
      return LAUNCHDARKLY_CLIENT_KEY_PROD;
  }
}

function mapAuthToFeatureFlagUser(currentUser: AuthUser): FeatureFlagUser {
  return {
    key: currentUser.userId || 'no-auth-user-id',
    firstName: currentUser.given_name || '',
    lastName: currentUser.family_name || '',
    name: `${currentUser.given_name || ''} ${currentUser.family_name || ''}`,
    email: currentUser.email || '',
    tenantId: currentUser.companyId,
    custom: {
      company: currentUser.companyName,
      userRole: currentUser.userRole,
      platform: Platform.OS,
    },
    anonymous: false,
  };
}

export function* init(factory: IFeatureFlagClientFactory, trackError: Function, action: any): Saga<any> {
  if (featureFlagClient) {
    // LaunchDarkly does not allow changing environments after it is initialized
    return;
  }
  const { env } = action;

  const featureFlagKey = getFeatureFlagKey(env, trackError);
  featureFlagClient = factory.getFeatureFlagClient(featureFlagKey);

  let resolver = null;

  let promise = new Promise((resolve) => {
    resolver = resolve;
  });
  let flags = null;

  featureFlagClient.subscribeToChanges((newFlags) => {
    flags = newFlags;
    resolver();
    promise = promise.then(() =>
      new Promise((resolve) => {
        resolver = resolve;
      }));
  });

  while (true) {
    yield promise;
    yield put(featureFlagAction.successGetFeatureFlags(flags));
  }
}

// eslint-disable-next-line require-yield
export function* identify(action: any): Saga<any> {
  const { user } = action;
  featureFlagClient.identifyUser(mapAuthToFeatureFlagUser(user));
}
