// @flow
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Touchable from '../../../../shared/components/Touchable/Touchable';
import Avatar from '../../../../shared/components/Avatar/Avatar';
import type { TaskItemViewProps } from '../TaskListItem.types';

class TaskListItemView extends PureComponent<TaskItemViewProps> {
  renderAvatar = () => {
    const name = this.props.viewModel.getDisplayName();
    const { styles: { avatarContainer }, theme: { palette: { grey, error: main } } } = this.props;
    return (
      <View>
        <View style={avatarContainer}>
          <Avatar size={36} name={name} color={grey[400]} emptyColor={main} />
        </View>
      </View>
    );
  };

  renderTitle = () => {
    const { styles: { title }, viewModel } = this.props;
    return (
      <Text id="title-text" numberOfLines={1} style={title}>
        {viewModel.getTitle()}
      </Text>
    );
  };

  renderName = () => {
    const { styles: { assigned, margin } } = this.props;
    return (
      <Text id="assigned-text" numberOfLines={1} style={[assigned, margin]}>
        {this.props.viewModel.getDisplayName()}
      </Text>
    );
  };

  renderStatus = () => {
    const { viewModel, styles: { margin } } = this.props;
    const status = viewModel.getStatus();
    return <Text style={margin}>{status}</Text>;
  };

  renderSiteCustomer = () => {
    const { styles } = this.props;
    const value = this.props.viewModel.getSiteInfo();

    return (
      <Text id="site-customer-text" numberOfLines={1} style={[styles.siteCustomerText, styles.margin]}>
        {value}
      </Text>
    );
  };

  render() {
    const { styles: { nameStatusSection, container, textsContainer }, viewModel }: TaskItemViewProps = this.props;

    return (
      <Touchable onPress={viewModel.onPressItem} useForeground>
        <View style={container}>
          {this.renderAvatar()}
          <View style={textsContainer}>
            {this.renderTitle()}
            {this.renderSiteCustomer()}
            <View style={nameStatusSection}>
              {this.renderName()}
              {this.renderStatus()}
            </View>
          </View>
        </View>
      </Touchable>
    );
  }
}

export default TaskListItemView;
