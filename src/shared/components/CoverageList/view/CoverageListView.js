// @flow
import React from 'react';
import { View, ScrollView, FlatList, RefreshControl, TextInput } from 'react-native';
import type { User } from '@next/schedule/types/schedule.types';

import theme from '../../../../shared/theme';
import COMMON from '../../../../shared/constants/common';
import CustomIcon, { ICON_NAMES } from '../../../../shared/customIcons/NextIcons';
import CoverageListItem from '../../CoverageListItem/CoverageListItem';
import FlatListItemSeparator from '../../../../shared/components/FlatListItemSeparator/FlatListItemSeparatorComponent';
import { ICoverageListProps } from '../CoverageList.types';

export class CoverageListView extends React.PureComponent<ICoverageListProps> {
  componentDidMount = () => this.props.viewModel.getUsers();

  renderItem = ({ item }: Object) => {
    const { viewModel: { onUserSelected } } = this.props;
    return <CoverageListItem user={item} onPressItem={onUserSelected} />;
  };

  render = () => {
    const {
      t: translate,
      styles: {
        container, searchSection, searchIcon, textInput,
      },
      viewModel: {
        loading, filteredUsers, getUsers, setFilter,
      },
    } = this.props;
    const { palette: { searchInput: { iconColor, placeholderTextColor } } } = theme;
    return (
      <View style={container}>
        <View style={searchSection}>
          <CustomIcon style={searchIcon} name={ICON_NAMES.SEARCH} size={30} color={iconColor} />
          <TextInput
            style={textInput}
            onChangeText={term => setFilter(term, this)}
            placeholderTextColor={placeholderTextColor}
            placeholder={translate(COMMON.SEARCH_BY_NAME)}
          />
        </View>
        <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={getUsers} />}>
          <FlatList
            testID="coverage-list"
            data={filteredUsers}
            renderItem={this.renderItem}
            keyExtractor={(item: User) => item.id}
            ItemSeparatorComponent={FlatListItemSeparator}
          />
        </ScrollView>
      </View>
    );
  };
}
