// @flow
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Navigation } from 'react-native-navigation';
import { withStyles } from '../../../shared/withStyles';
import { getAppBarStyle } from '../../../shared/navigation/getAppBarStyle';
import theme from '../../../shared/theme';
import SiteListController from './controller/SiteListController';
import SiteListStyles from './view/SiteList.styles';
import SiteList from './view/SiteList';
import { getSites } from '../../../shared/redux/schedule.thunks';
import { sitesSelector } from '../../../shared/redux/sites.selectors';
import type { SiteListContainerProps } from './SiteList.types';

const createSiteListContainer = (props: SiteListContainerProps) => {
  const topBarOptions = getAppBarStyle(theme);
  Navigation.mergeOptions(props.componentId, topBarOptions);

  const nav = props.navigate || (() => Navigation.pop(props.componentId));
  const CreateSiteListWithStyles = withStyles(SiteListStyles)(SiteList);
  const controller = new SiteListController(props.sites, props.onSelected, props.getSites, props.loading, nav);
  return <CreateSiteListWithStyles viewModel={controller} />;
};

const mapStateToProps = (state, ownProps) => ({
  componentId: ownProps.componentId,
  loading: Boolean(state.schedule.sitesLoading),
  onSelected: ownProps.callback,
  sites: sitesSelector(state),
  navigate: ownProps.navigate,
});

const mapDispatchToProps = dispatch => bindActionCreators({ getSites }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(createSiteListContainer);
