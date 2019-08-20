// @flow

import React from 'react';
import { ScrollView, Text } from 'react-native';
import EditText from '../../../../shared/components/EditText/EditText';
import type { TaskItemProps } from '../TaskItem.types';
import { ColorRatingComponentContainer } from '../../../../shared/components/ColorRating/ColorRatingComponentContainer';

class TaskItem extends React.PureComponent<TaskItemProps> {
  setNotes = (notes: string) => {
    this.props.viewModel.setNotes(notes);
  };

  ratingChanged = (ratingValue: number) => {
    this.props.viewModel.setRating(ratingValue);
    this.save();
  };

  save = () => {
    this.props.viewModel.save();
  };

  render() {
    const { styles: { colorRating } } = this.props;
    const { rating } = this.props.viewModel.item;

    return (
      <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled">
        <ScrollView scrollEnabled={false} keyboardShouldPersistTaps="always">
          <ColorRatingComponentContainer
            id="rating"
            ratingChanged={this.ratingChanged}
            style={colorRating}
            rating={rating && rating.value > 0 ? rating.value : 0}
          />
        </ScrollView>
        <Text id="description" style={this.props.styles.description}>
          {this.props.viewModel.item.description}
        </Text>
        <EditText
          id="notes"
          multiline
          title="Notes"
          onBlur={this.save}
          onChange={this.setNotes}
          defaultValue={this.props.viewModel.item.notes}
          disabled={!this.props.viewModel.canEdit}
        />
      </ScrollView>
    );
  }
}

export default TaskItem;
