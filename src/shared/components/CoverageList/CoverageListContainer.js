// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withNamespaces } from 'react-i18next';
import { Navigation } from 'react-native-navigation';

import theme from '../../../shared/theme';
import { withStyles } from '../../../shared/withStyles';
import { getAppBarStyle } from '../../../shared/navigation/getAppBarStyle';
import { CoverageListStyles } from './CoverageList.styles';
import { CoverageListView } from './view/CoverageListView';
import { CoverageListController } from './controller/CoverageListController';

const coverageListContainer = ({
  componentId, loading, users, requestUsers, onUserSelected,
}) => {
  const topBarOptions = getAppBarStyle(theme);
  Navigation.mergeOptions(componentId, topBarOptions);

  const navigateBack = () => Navigation.pop(componentId);
  const coverageListController = new CoverageListController(loading, users, requestUsers, onUserSelected, navigateBack);
  const CoverageListWithStyles = withStyles(CoverageListStyles)(CoverageListView);
  const CoverageListWithTranslation = withNamespaces()(CoverageListWithStyles);
  return <CoverageListWithTranslation viewModel={coverageListController} />;
};

const mapStateToProps = (state, ownProps) => ({
  loading: ownProps.selectLoading(state),
  users: ownProps.selectUsers(state),
  onUserSelected: ownProps.onUserSelected,
});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators(ownProps.requestUsers, dispatch);

export const CoverageListContainer = connect(mapStateToProps, mapDispatchToProps)(coverageListContainer);
