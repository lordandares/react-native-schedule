// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { withStyles } from '../../../shared/withStyles';
import TaskDetailView from './view/TaskDetailView';
import { TaskDetailController } from './controller/TaskDetailController';
import taskComponentStyles from './view/TaskDetailView.styles';
import actionCreators, { selectTask } from '../../../shared/redux/task';
import { ITaskDetailActions } from './TaskDetail.types';
import theme from '../../../shared/theme';
import { getAppBarStyle } from '../../../shared/navigation/getAppBarStyle';

const taskDetailContainer = (navProps: any) => {
  const {
    task, componentId, setSelectedAreaId, requestCompleteTask,
  } = navProps;

  const topBarOptions = getAppBarStyle(theme);
  topBarOptions.topBar.title.text = task.title;
  Navigation.mergeOptions(componentId, topBarOptions);

  const taskActionCreators: ITaskDetailActions = { setSelectedAreaId, requestCompleteTask };
  const inspectionDetailController = new TaskDetailController(task, taskActionCreators, Navigation, componentId);
  const TaskDetailViewWithStyles = withStyles(taskComponentStyles)(TaskDetailView);
  return <TaskDetailViewWithStyles viewModel={inspectionDetailController} componentId={componentId} />;
};

const mapStateToProps = state => ({
  task: selectTask(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export const TaskDetailContainer = connect(mapStateToProps, mapDispatchToProps)(taskDetailContainer);
