/* eslint-disable class-methods-use-this */
// @flow
import React from 'react';
import { View, Text, FlatList, Keyboard } from 'react-native';
import { Navigation } from 'react-native-navigation';

import Touchable from '../../../../shared/components/Touchable/Touchable';
import type { TaskDetailViewProps } from '../TaskDetail.types';
import CustomIcon from '../../../../shared/customIcons/NextIcons';

// eslint-disable-next-line react/prefer-stateless-function
class TaskDetailView extends React.PureComponent<TaskDetailViewProps> {
  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount() {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  navigationEventListener: Object;

  componentDidAppear() {
    Keyboard.dismiss();
  }

  renderItem = ({ item }: any) => {
    const { styles: { sectionItem, sectionItemText, navIcon }, viewModel } = this.props;
    return (
      <Touchable onPress={() => viewModel.onPressArea(item)}>
        <View style={sectionItem}>
          <Text style={sectionItemText} data-testid="task-area-text">
            {item.title}
          </Text>
          <CustomIcon style={navIcon} name="caretright" />
        </View>
      </Touchable>
    );
  };

  renderHeader = (title: string) => {
    const { styles: { sectionHeaderText, sectionHeader } } = this.props;

    return (
      <View style={sectionHeader}>
        <Text style={sectionHeaderText} data-testid="section-header-area">
          {title}
        </Text>
      </View>
    );
  };

  render() {
    const { styles: { ListContainer, submitButton, submitButtonText }, viewModel } = this.props;

    return (
      <View style={ListContainer}>
        <FlatList data={viewModel.getAreas()} renderItem={this.renderItem} keyExtractor={item => item.id} />
        {viewModel.canEdit && (
          <Touchable onPress={viewModel.submit} testID="task-detail-submit-button">
            <View style={submitButton}>
              <Text style={submitButtonText}>Submit</Text>
            </View>
          </Touchable>
        )}
      </View>
    );
  }
}

export default TaskDetailView;
