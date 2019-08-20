import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SiteShiftsComponent from './components/SiteShiftsComponent/SiteShiftsComponent';
import * as scheduleActions from '../../shared/redux/schedule';
import * as scheduleThunksActions from '../../shared/redux/schedule.thunks';
import * as timekeepingActions from '../../shared/redux/timekeeping.thunks';
import * as managementActions from '../../shared/redux/management.thunks';
import * as appNavigationActions from '../../shared/redux/appNavigation';
import { selectIsCreateShiftBtnOn } from '../../shared/redux/featureflags.selectors';

const currentUser = state => state.auth.user;

const mapStateToProps = state => ({
  scheduleState: state.schedule,
  currentUser: currentUser(state),
  canSeeAddBtnInSiteShiftsComp: selectIsCreateShiftBtnOn(state),
  tenant: state.tenant,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    ...scheduleActions,
    ...scheduleThunksActions,
    ...appNavigationActions,
    ...timekeepingActions,
    ...managementActions,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SiteShiftsComponent);
