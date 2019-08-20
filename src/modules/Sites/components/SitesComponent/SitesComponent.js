// @flow
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import type { Site } from '../../../../shared/types/schedule.types';
import SitesComponentProps from './SitesComponent.types';
import { getAppBarStyle } from '../../../../shared/navigation/getAppBarStyle';
import theme from '../../../../shared/theme';
import SiteList from '../../SiteList/SiteListContainer';

class SitesComponent extends Component<SitesComponentProps> {
  static options = getAppBarStyle(theme);

  componentDidMount() {
    this.props.getSites();
  }

  onSiteSelected = (site: Site) => {
    this.props.setSelectedSite(site);
  };

  render() {
    return (
      <SiteList
        callback={this.onSiteSelected}
        navigate={(site: Site) => {
          Navigation.push(this.props.componentId, {
            component: {
              name: 'SiteShifts',
              passProps: {
                timeFormat: this.props.tenant.timeFormat,
                shortDateFormat: this.props.tenant.shortDateFormat,
                requestTenant: this.props.requestTenant,
                currentUser: this.props.currentUser,
              },
              options: {
                topBar: {
                  title: { text: site.name },
                },
              },
            },
          });
        }}
      />
    );
  }
}

export default SitesComponent;
