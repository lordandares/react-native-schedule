import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCurrentUser } from '@next/auth/lib/redux/Auth';

import ScheduleComponent from './components/ScheduleComponent/ScheduleComponent';
import * as scheduleActions from '../../shared/redux/schedule';
import * as scheduleThunksActions from '../../shared/redux/schedule.thunks';
import clockEventActions, { selectLoading } from '../../shared/redux/clockevents';
import * as managementActions from '../../shared/redux/management.thunks';
import * as appNavigationActions from '../../shared/redux/appNavigation';
import { APP_TABS } from '../../shared/constants/tabs';
import { selectIsCreateShiftBtnOn } from '../../shared/redux/featureflags.selectors';
import TenantRedux from '../../shared/redux/tenant';

const mapStateToProps = state => ({
  scheduleState: state.schedule,
  currentUser: getCurrentUser(state),
  activeInnerTab: appNavigationActions.getActiveInnerTabIdxFor(APP_TABS.SCHEDULE)(state),
  clockEventsLoading: selectLoading(state),
  canSeeAddBtnInScheduleComp: selectIsCreateShiftBtnOn(state),
  tenant: state.tenant,
});

const mapDispatchToProps = dispatch =>
  ({
    ...bindActionCreators(
      {
        ...scheduleActions,
        ...scheduleThunksActions,
        ...appNavigationActions,
        ...clockEventActions,
        ...managementActions,
        requestTenant: TenantRedux.requestTenant,
      },
      dispatch,
    ),
  });

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleComponent);
