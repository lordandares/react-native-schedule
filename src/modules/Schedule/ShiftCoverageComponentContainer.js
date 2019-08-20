import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ShiftCoverageComponent from './components/ShiftCoverageComponent/ShiftCoverageComponent';
import * as scheduleActions from '../../shared/redux/schedule';
import * as scheduleThunks from '../../shared/redux/schedule.thunks';
import * as managementActions from '../../shared/redux/management.thunks';
import * as appNavigationActions from '../../shared/redux/appNavigation';
import AnalyticsRedux from '../../shared/redux/analytics';

const currentUser = state => state.auth.user;

const mapStateToProps = state => ({
  usersLoading: state.schedule.usersLoading,
  scheduleState: state.schedule,
  currentUser: currentUser(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...scheduleActions,
      ...appNavigationActions,
      ...managementActions,
      ...scheduleThunks,
      trackEvent: AnalyticsRedux.trackEvent,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShiftCoverageComponent);
