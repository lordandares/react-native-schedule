// @flow
import React from 'react';
import { View, FlatList, Keyboard } from 'react-native';
import { Navigation } from 'react-native-navigation';
import type { Item } from '@next/schedule/types/task.types';
import type { TaskAreaViewProps, ITaskAreaState } from '../TaskArea.types';
import { TaskAreaViewListItem } from './TaskAreaViewListItem';

export class TaskAreaView extends React.PureComponent<TaskAreaViewProps, ITaskAreaState> {
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount() {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  onPressItem = (item) => {
    this.props.viewModel.onPressItem(item);
  };

  componentDidAppear() {
    Keyboard.dismiss();
  }

  ratingChanged = (item: Item, ratingValue: number) => {
    this.props.viewModel.rateItem(item, ratingValue);
    this.props.viewModel.saveArea();
  };

  keyExtractor = (item: Item) => item.id;

  renderFlatItem = ({ item }) => (
    <TaskAreaViewListItem
      item={item}
      styles={this.props.styles}
      onPressItem={this.onPressItem}
      ratingChanged={this.ratingChanged}
      canEdit={this.props.viewModel.canEdit}
    />
  );

  render() {
    return (
      <View style={this.props.styles.container}>
        <FlatList
          data={this.props.viewModel.area.items}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderFlatItem}
          extraData={this.props.viewModel.area}
        />
      </View>
    );
  }
}
