// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentUser } from '@next/auth/lib/redux/Auth';

import WorkComponent from './WorkComponent/WorkComponent';
import * as appNavigationActions from '../../shared/redux/appNavigation';
import tasksRedux from '../../shared/redux/task';
import { APP_TABS } from '../../shared/constants/tabs';
import { selectIsCreateMobileInspectionsOn } from '../../shared/redux/featureflags.selectors';

const mapStateToProps = state => ({
  activeInnerTab: appNavigationActions.getActiveInnerTabIdxFor(APP_TABS.WORK)(state),
  createInspectionsEnabled: selectIsCreateMobileInspectionsOn(state),
  currentUser: getCurrentUser(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...appNavigationActions,
      createTask: tasksRedux.requestCreateTask,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(WorkComponent);
