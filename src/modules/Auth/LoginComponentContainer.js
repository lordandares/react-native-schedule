import { connect } from 'react-redux';

import AuthRedux, {
  getIsUserLoggedIn,
  getUserDisplayName,
  getAuthErrorMessage,
  getIsAuthFetching,
} from '@next/auth/lib/redux/Auth';
import { bindActionCreators } from 'redux';

import getUserInManagement from '../../shared/utils/login/getUserInManagement';
import LoginComponent from './components/LoginComponentRopc/LoginComponentRopc';
import EnvSwitchRedux, { getEnvironment } from '../../shared/redux/EnvSwitchRedux';
import {
  selectIsTestFlagOn,
  selectFeatureFlagEnvironment,
  selectIsPreventNoSubscriptionLogin,
} from '../../shared/redux/featureflags.selectors';
import AnalyticsRedux from '../../shared/redux/analytics';
import * as appNavigationActions from '../../shared/redux/appNavigation';

const mapStateToProps = state => ({
  userLoggedIn: getIsUserLoggedIn(state),
  userDisplayName: getUserDisplayName(state),
  authErrorMessage: getAuthErrorMessage(state),
  loading: getIsAuthFetching(state),
  environment: getEnvironment(state),
  userInManagement: getUserInManagement(state),
  testFlag: selectIsTestFlagOn(state),
  preventNoSubscriptionLoginFlag: selectIsPreventNoSubscriptionLogin(state),
  featureFlagEnvironment: selectFeatureFlagEnvironment(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    ...appNavigationActions,
    trackEvent: AnalyticsRedux.trackEvent,
    switchEnvironment: EnvSwitchRedux.requestEnvSwitch,
    logout: AuthRedux.requestLogoutUser,
    login: AuthRedux.requestLoginUser,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
