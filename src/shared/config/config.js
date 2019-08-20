// @flow
import { Platform, YellowBox } from 'react-native';
import type { IAuthServiceConfig } from '@next/auth/types/auth.types';
import { B2C_POLICY_PLACEHOLDER } from '@next/auth/lib/services/GenericAuthServiceMobile';


YellowBox.ignoreWarnings([
  'Requested foreground ripple, but it is not available',
]);

export const PLATFORM = Platform.OS;
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

export const NEXT_SENTRY_URL: string =
  'https://5c5c57265e624dc49803c40ea9651a35:890ed46d00ec44018ccbda19ddcf1b19@sentry.io/294678';

export const LAUNCHDARKLY_CLIENT_KEY_TEST: string = 'mob-d1259753-31c9-48e6-a41d-28580774d24f';
export const LAUNCHDARKLY_CLIENT_KEY_PROD: string = 'mob-4e57eb1d-50b3-4d1e-9049-375d356ea97b';

// Scheduling API
//
export const NEXT_SCHEDULING_API_URL_DEV: string = 'https://api-dev.teamsoftware.com/next/scheduling/api';

export const NEXT_SCHEDULING_API_URL_TEST: string = 'https://api-test.teamsoftware.com/next/scheduling/api';

export const NEXT_SCHEDULING_API_URL_PROD: string = 'https://api.myteamsoftware.com/next/scheduling/api';

// MANAGEMENT API
//
export const NEXT_MANAGEMENT_API_URL_DEV: string = 'https://api-dev.teamsoftware.com/next/management/api';

export const NEXT_MANAGEMENT_API_URL_TEST: string = 'https://api-test.teamsoftware.com/next/management/api';

export const NEXT_MANAGEMENT_API_URL_PROD: string = 'https://api.myteamsoftware.com/next/management/api';

// Timekeeping API
//
export const NEXT_TIMEKEEPING_API_URL_DEV: string = 'https://api-dev.teamsoftware.com/next/Timekeeping/api';

export const NEXT_TIMEKEEPING_API_URL_TEST: string = 'https://api-test.teamsoftware.com/next/Timekeeping/api';

export const NEXT_TIMEKEEPING_API_URL_PROD: string = 'https://api.myteamsoftware.com/next/Timekeeping/api';

// Worktickets API
//
export const NEXT_WORKTICKETS_API_URL_DEV: string = 'https://api-dev.teamsoftware.com/next/worktickets/api';

export const NEXT_WORKTICKETS_API_URL_TEST: string = 'https://api-test.teamsoftware.com/next/worktickets/api';

export const NEXT_WORKTICKETS_API_URL_PROD: string = 'https://api.myteamsoftware.com/next/worktickets/api';

// Tasks API
//
export const NEXT_TASKS_API_URL_DEV: string = 'https://api-dev.teamsoftware.com/next/tasks/api';

export const NEXT_TASKS_API_URL_TEST: string = 'https://api-test.teamsoftware.com/next/tasks/api';

export const NEXT_TASKS_API_URL_PROD: string = 'https://api.myteamsoftware.com/next/tasks/api';

// Azure B2C config
export const OPENID_CONFIG_DEV: IAuthServiceConfig = {
  clientId: '68f09440-1912-42ca-8b6a-e1528b2b2687',
  redirectUri: 'com.nextteamsoftware://us.teamsoftwareinc.next/auth', // Lower case!
  // eslint-disable-next-line max-len
  issuerRoot: `https://teamsoftwaredev.b2clogin.com/teamsoftwaredev.onmicrosoft.com/${B2C_POLICY_PLACEHOLDER}/oauth2/v2.0/`,
  scopes: ['openid', 'offline_access', 'https://teamsoftwaredev.onmicrosoft.com/webclient/next_api'],
  loginPolicy: 'B2C_1A_signin_ropc_dev',
  registrationPolicy: 'B2C_1A_signup_dev',
  forgotPasswordPolicy: 'B2C_1A_forgot_password_dev',
  authorityRoot: null,
  platform: PLATFORM,
};

export const OPENID_CONFIG_TEST: IAuthServiceConfig = {
  clientId: '68f09440-1912-42ca-8b6a-e1528b2b2687',
  redirectUri: 'com.nextteamsoftware://us.teamsoftwareinc.next/auth', // Lower case!
  // eslint-disable-next-line
  issuerRoot: `https://teamsoftwaredev.b2clogin.com/teamsoftwaredev.onmicrosoft.com/${B2C_POLICY_PLACEHOLDER}/oauth2/v2.0/`,
  scopes: ['openid', 'offline_access', 'https://teamsoftwaredev.onmicrosoft.com/webclient/next_api'],
  loginPolicy: 'B2C_1A_signin_ropc_test',
  registrationPolicy: 'B2C_1A_signup_test',
  forgotPasswordPolicy: 'B2C_1A_forgot_password_test',
  authorityRoot: null,
  platform: PLATFORM,
};

// Azure B2C PROD config
export const OPENID_CONFIG_PROD: IAuthServiceConfig = {
  clientId: 'f2a02cbd-cc39-411a-8ff6-84ce78651d35',
  redirectUri: 'com.nextteamsoftware://us.teamsoftwareinc.next/auth', // Lower case!
  // eslint-disable-next-line
  issuerRoot: `https://teamsoftwareclients.b2clogin.com/teamsoftwareclients.onmicrosoft.com/${B2C_POLICY_PLACEHOLDER}/oauth2/v2.0/`,
  scopes: ['openid', 'offline_access', 'https://teamsoftwareclients.onmicrosoft.com/webclient/next_api'],
  loginPolicy: 'B2C_1A_signin_ropc_prod',
  registrationPolicy: 'B2C_1A_signup_prod',
  forgotPasswordPolicy: 'B2C_1A_forgot_password_prod',
  authorityRoot: null,
  platform: PLATFORM,
};

