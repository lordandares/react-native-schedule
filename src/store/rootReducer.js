import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import { reducer as auth } from '@next/auth/lib/redux/Auth';
import { reducer as errors } from '@next/schedule/lib/redux/ErrorHandlerRedux';
import { reducer as featureFlags } from '@next/schedule/lib/redux/FeatureFlagsRedux';
import { reducer as environment } from '../shared/redux/EnvSwitchRedux';
import { reducer as user } from '../shared/redux/user';
import { reducer as clockevents } from '../shared/redux/clockevents';
import { reducer as location } from '../shared/redux/location';
import { reducer as workTicket } from '../shared/redux/workTicket';
import { reducer as task } from '../shared/redux/task';
import { reducer as tenant } from '../shared/redux/tenant';


import schedule from '../shared/redux/schedule';
import appNavigation from '../shared/redux/appNavigation';

const rootReducer = combineReducers({
  form,
  schedule,
  appNavigation,
  user,
  workTicket,
  clockevents,
  location,
  task,
  tenant,

  // !!! Do not change namespace from next-libs
  auth,
  environment,
  errors,
  featureFlags,
});

export default rootReducer;
