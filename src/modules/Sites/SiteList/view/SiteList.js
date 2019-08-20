// @flow
import React, { Component } from 'react';
import { FlatList, Text, View, ScrollView, RefreshControl } from 'react-native';
import type { Site } from '../../../../shared/types/schedule.types';
import Touchable from '../../../../shared/components/Touchable/Touchable';
import FlatListItemSeparator from '../../../../shared/components/FlatListItemSeparator/FlatListItemSeparatorComponent';
import type { SiteListProps } from '../SiteList.types';
import NothingToSeeHere from '../../../../shared/components/NothingToSeeHereMessage/NothingToSeeHereMessage';

class SitesList extends Component<SiteListProps> {
  onRefresh = () => {
    this.props.viewModel.getSites();
  };

  hasSites = (sites: Site[]) => {
    if (!sites) return false;
    return sites.length > 0;
  };

  renderItem = (site: Site) => (
    <Touchable onPress={() => this.props.viewModel.onSelected(site)}>
      <View style={this.props.styles.sitesContainer}>
        <Text style={this.props.styles.title}>{site.name}</Text>
      </View>
    </Touchable>
  );

  render() {
    const { sites, loading } = this.props.viewModel;
    return (
      <View style={this.props.styles.container}>
        {loading || this.hasSites(sites) ? (
          <ScrollView
            style={this.props.styles.container}
            refreshControl={<RefreshControl refreshing={this.props.viewModel.loading} onRefresh={this.onRefresh} />}
          >
            <FlatList
              data={sites}
              renderItem={list => this.renderItem(list.item)}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={FlatListItemSeparator}
              id="siteList"
            />
          </ScrollView>
        ) : (
          <NothingToSeeHere id="nothing-to-see" />
        )}
      </View>
    );
  }
}

export default SitesList;
