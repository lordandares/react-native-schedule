import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentUser } from '@next/auth/lib/redux/Auth';

import SitesComponent from './components/SitesComponent/SitesComponent';
import * as scheduleActions from '../../shared/redux/schedule';
import * as scheduleThunksActions from '../../shared/redux/schedule.thunks';
import * as timekeepingActions from '../../shared/redux/timekeeping.thunks';
import * as managementActions from '../../shared/redux/management.thunks';
import * as appNavigationActions from '../../shared/redux/appNavigation';
import { sitesSelector } from '../../shared/redux/sites.selectors';
import TenantRedux from '../../shared/redux/tenant';

const mapStateToProps =
  state => (
    {
      sites: sitesSelector(state),
      sitesLoading: Boolean(state.schedule.sitesLoading),
      tenant: state.tenant,
      currentUser: getCurrentUser(state),
    }
  );

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    ...scheduleActions,
    ...scheduleThunksActions,
    ...appNavigationActions,
    ...timekeepingActions,
    ...managementActions,
    requestTenant: TenantRedux.requestTenant,
  }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(SitesComponent);
