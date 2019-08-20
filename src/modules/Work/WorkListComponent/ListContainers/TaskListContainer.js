// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import WorkListComponent from '../WorkListComponent';
import actionCreators, { selectLoading, selectTasks } from '../../../../shared/redux/task';
import { selectIsTasksOn } from '../../../../shared/redux/featureflags.selectors';
import taskItemContainer from '../../../Tasks/TaskListItem/TaskListItemContainer';

const mapStateToProps = (state, ownProps) => ({
  loading: selectLoading(state),
  workItems: selectTasks(state),
  isEnabled: selectIsTasksOn(state),
  navigableComponentId: ownProps.navigableComponentId,
  renderChild: taskItemContainer,
  tenant: state.tenant,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestWorkItems: actionCreators.requestTasks,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(WorkListComponent);
