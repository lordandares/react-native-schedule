// @flow
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ColorRatingComponentContainer } from '../../../../shared/components/ColorRating/ColorRatingComponentContainer';

export class TaskAreaViewListItem extends React.PureComponent {
  onPressItem = () => {
    this.props.onPressItem(this.props.item);
  };

  ratingChanged = (ratingValue: number) => {
    this.props.ratingChanged(this.props.item, ratingValue);
  };

  render() {
    const {
      styles: {
        sectionItem, sectionItemText, sectionView, colorRating,
      },
      item,
    } = this.props;

    return (
      <TouchableOpacity style={sectionItem} onPress={this.onPressItem}>
        <View style={sectionView} pointerEvents={this.props.canEdit ? 'auto' : 'none'}>
          <Text style={sectionItemText} data-testid="task-item-text">
            {item.title}
          </Text>

          <ColorRatingComponentContainer
            ratingChanged={this.ratingChanged}
            style={colorRating}
            rating={item.rating && item.rating.value > 0 ? item.rating.value : 0}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
