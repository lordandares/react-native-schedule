import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ShiftDetailComponent from './components/ShiftDetailComponent/ShiftDetailComponent';
import * as appNavigationActions from '../../shared/redux/appNavigation';
import * as scheduleActions from '../../shared/redux/schedule';
import * as scheduleThunksActions from '../../shared/redux/schedule.thunks';
import clockEventActions from '../../shared/redux/clockevents';
import * as managementActions from '../../shared/redux/management.thunks';

const currentUser = state => state.auth.user;

const mapStateToProps = state => ({
  scheduleState: state.schedule,
  authUser: currentUser(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...scheduleActions,
      ...scheduleThunksActions,
      ...appNavigationActions,
      ...clockEventActions,
      ...managementActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShiftDetailComponent);
