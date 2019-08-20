import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ClockInOutEditComponent from './components/ShiftDetailComponent/ClockInOutEditComponent/ClockInOutEditComponent';
import * as appNavigationActions from '../../shared/redux/appNavigation';
import * as scheduleActions from '../../shared/redux/schedule';
import * as scheduleThunksActions from '../../shared/redux/schedule.thunks';
import * as timekeepingActions from '../../shared/redux/timekeeping.thunks';
import * as managementActions from '../../shared/redux/management.thunks';
import AnalyticsRedux from '../../shared/redux/analytics';

const mapStateToProps = state => ({ shift: state.schedule.selectedShift, loading: state.schedule.loading });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...scheduleActions,
      ...scheduleThunksActions,
      ...appNavigationActions,
      ...timekeepingActions,
      ...managementActions,
      trackEvent: AnalyticsRedux.trackEvent,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ClockInOutEditComponent);
