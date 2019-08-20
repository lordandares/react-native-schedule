// @flow
import React from 'react';
import { bindActionCreators } from 'redux';
import type { Task } from '@next/schedule/types/task.types';
import { Navigation } from 'react-native-navigation';

import { withStyles } from '../../../shared/withStyles';
import TaskListItemView from './view/TaskListItemView';
import actionCreators from '../../../shared/redux/task';
import taskComponentStyles from './view/TaskListItemView.styles';
import { TaskListItemController } from './controller/TaskListItemController';
import type { ITaskActionCreators } from '../../../shared/types/TaskRedux.types';
import { storeDispatch } from '../../../index';

const TaskListItemContainer = (task: Task, navigableComponentId: string) => {
  const taskActionCreators: ITaskActionCreators = bindActionCreators(actionCreators, storeDispatch);
  const taskDetailController = new TaskListItemController(task, navigableComponentId, taskActionCreators, Navigation);
  const TaskItemViewWithStyles = withStyles(taskComponentStyles)(TaskListItemView);
  return <TaskItemViewWithStyles viewModel={taskDetailController} />;
};

export default TaskListItemContainer;
