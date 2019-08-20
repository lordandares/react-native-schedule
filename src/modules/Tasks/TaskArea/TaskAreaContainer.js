// @flow
import React from 'react';
import { Navigation } from 'react-native-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '../../../shared/withStyles';

import actionCreators, { selectArea, selectTask } from '../../../shared/redux/task';
import theme from '../../../shared/theme';
import { TaskAreaController } from './controller/TaskAreaController';
import { TaskAreaView } from './view/TaskAreaView';
import { taskAreaViewStyles } from './view/TaskAreaView.styles';
import { getAppBarStyle } from '../../../shared/navigation/getAppBarStyle';
import type { ITaskAreaActions } from './TaskArea.types';

const taskAreaContainer = (navProps: any) => {
  const {
    componentId, area, task, requestUpdateTaskArea,
  } = navProps;

  const topBarOptions = getAppBarStyle(theme);
  topBarOptions.topBar.title.text = area.title;
  Navigation.mergeOptions(componentId, topBarOptions);

  const taskAreaActions: ITaskAreaActions = { requestUpdateTaskArea };
  const taskAreaController = new TaskAreaController(area, task, taskAreaActions, Navigation, componentId);
  const TaskAreaViewWithStyles = withStyles(taskAreaViewStyles)(TaskAreaView);

  return <TaskAreaViewWithStyles viewModel={taskAreaController} componentId={componentId} />;
};

const mapStateToProps = state => ({
  area: selectArea(state),
  task: selectTask(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export const TaskAreaContainer = connect(mapStateToProps, mapDispatchToProps)(taskAreaContainer);
