// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navigation } from 'react-native-navigation';
import { withNamespaces } from 'react-i18next';
import { getCurrentUser } from '@next/auth/lib/redux/Auth';

import { CreateTaskController } from './controller/CreateTaskController';
import { CreateTaskView } from './view/CreateTaskView';
import { withStyles } from '../../../shared/withStyles';
import { CreateTaskStyles } from './CreateTask.styles';
import { getAppBarStyle } from '../../../shared/navigation/getAppBarStyle';
import taskActionCreators from '../../../shared/redux/task';
import userActionCreators, { selectLoading, selectUsers } from '../../../shared/redux/user';
import theme from '../../../shared/theme';
import type { ICreateTaskNavigation } from './CreateTask.types';
import type { ICoverageListParams } from '../../../shared/components/CoverageList/CoverageList.types';
import CreateTaskNavigation from './CreateTaskNavigation';

const createTaskContainer = ({
  componentId, companyId, requestCreateTask, tenant,
}) => {
  const navOptions = getAppBarStyle(theme);
  Navigation.mergeOptions(componentId, navOptions);

  const { requestUsers } = userActionCreators;
  const coverageParams: ICoverageListParams = { selectUsers, selectLoading, requestUsers };
  const { shortDateFormat } = tenant;

  const createTaskNavigation: ICreateTaskNavigation = new CreateTaskNavigation(Navigation, componentId, coverageParams);
  const controller = new CreateTaskController(companyId, requestCreateTask, createTaskNavigation, shortDateFormat);
  const CreateTaskViewWithStyles = withStyles(CreateTaskStyles)(CreateTaskView);
  const CreateTaskViewWithStylesTranslation = withNamespaces()(CreateTaskViewWithStyles);
  return <CreateTaskViewWithStylesTranslation viewModel={controller} shortDateFormat={shortDateFormat} />;
};

const mapStateToProps = (state, ownProps) => ({
  componentId: ownProps.componentId,
  companyId: getCurrentUser(state).companyId,
  tenant: state.tenant,
});

const actionCreators = {
  requestCreateTask: taskActionCreators.requestCreateTask,
  setSelectedSite: taskActionCreators.setSelectedSite,
};
const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export const CreateTaskContainer = connect(mapStateToProps, mapDispatchToProps)(createTaskContainer);
