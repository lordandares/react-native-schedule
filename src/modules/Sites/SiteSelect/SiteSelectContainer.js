import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '../../../shared/withStyles';
import type { SiteSelectContainerProps } from './SiteSelect.types';
import SiteSelectStyles from './view/SiteSelect.styles';
import SiteSelect from './view/SiteSelect';
import { SiteSelectController } from './controller/SiteSelectController';

export const SiteSelectContainer = (props: SiteSelectContainerProps) => {
  const SiteSelectWithStyles = withStyles(SiteSelectStyles)(SiteSelect);
  const controller = new SiteSelectController(props.site, props.onPress);
  return <SiteSelectWithStyles viewModel={controller} />;
};

const mapStateToProps = (state, ownProps) => ({
  selectedSite: ownProps.selectedSite,
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SiteSelectContainer);
