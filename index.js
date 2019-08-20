/* eslint-disable no-unused-vars */

import { Sentry } from 'react-native-sentry';
import { NEXT_SENTRY_URL } from './src/shared/config/config';
import App from './src';

if (!__DEV__) {
  Sentry.config(NEXT_SENTRY_URL).install();
}

App();
