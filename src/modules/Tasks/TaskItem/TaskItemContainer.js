// @flow
import React from 'react';
import { withStyles } from 'react-with-styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { taskItemStyles } from './view/TaskItem.styles';
import TaskItem from './view/TaskItem';
import { TaskItemController } from '../TaskItem/controller/TaskItemController';
import actionCreators, { selectTask, selectItem } from '../../../shared/redux/task';
import { TaskItemContainerProps } from './TaskItem.types';
import { getAppBarStyle } from '../../../shared/navigation/getAppBarStyle';
import theme from '../../../shared/theme';

const taskItemContainer = (props: TaskItemContainerProps) => {
  const {
    componentId, stateItem, task, setItem, saveItem,
  } = props;

  const topBarOptions = getAppBarStyle(theme);
  topBarOptions.topBar.title.text = stateItem.title;
  Navigation.mergeOptions(componentId, topBarOptions);

  const TaskItemWithStyles = withStyles(taskItemStyles)(TaskItem);
  const taskActionCreators = { setItem, saveItem };
  const taskItemController = new TaskItemController(stateItem, task, taskActionCreators);

  return <TaskItemWithStyles viewModel={taskItemController} componentId={componentId} />;
};

const mapStateToProps = (state, ownProps) => ({
  stateItem: selectItem(state, ownProps.item),
  task: selectTask(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(taskItemContainer);
