import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ShiftInstructionsComponent from './components/ShiftInstructionsComponent/ShiftInstructionsComponent';
import * as scheduleActions from '../../shared/redux/schedule';
import * as scheduleThunksActions from '../../shared/redux/schedule.thunks';
import * as timekeepingActions from '../../shared/redux/timekeeping.thunks';
import * as managementActions from '../../shared/redux/management.thunks';
import * as appNavigationActions from '../../shared/redux/appNavigation';
import AnalyticsRedux from '../../shared/redux/analytics';

const mapStateToProps = state => ({ scheduleState: state.schedule });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...scheduleActions,
      ...appNavigationActions,
      ...timekeepingActions,
      ...managementActions,
      ...scheduleThunksActions,
      trackEvent: AnalyticsRedux.trackEvent,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ShiftInstructionsComponent);
