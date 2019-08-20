import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { ColorRatingComponentViewProps } from '../ColorRatingComponent.types';

const MAX_RATING = 5;

export default class ColorRatingComponentView extends Component<ColorRatingComponentViewProps> {
  constructor(props) {
    super(props);

    this.state = { rating: props.rating };
  }

  getRatingBorderColorStyle = (key, currentRating) => {
    let borderColor = 'black';
    if (currentRating === 0 || key === currentRating) {
      switch (key) {
        case 1:
          borderColor = 'rgba(76, 217, 100, 1)';
          break;
        case 2:
          borderColor = 'rgba(90, 200, 250, 1)';
          break;
        case 3:
          borderColor = 'rgba(255, 204, 0, 1)';
          break;
        case 4:
          borderColor = 'rgba(255, 149, 0, 1)';
          break;
        case 5:
          borderColor = 'rgba(255, 59, 48, 1)';
          break;
        default:
          borderColor = 'black';
          break;
      }
    } else {
      borderColor = 'rgba(245, 245, 245, 1)';
    }

    return { borderColor };
  };

  getRatingFillColorStyle = (key, currentRating) => {
    let color = 'black';
    if (currentRating === 0) {
      switch (key) {
        case 1:
          color = 'rgba(76, 217, 100, 0.1)';
          break;
        case 2:
          color = 'rgba(90, 200, 250, 0.1)';
          break;
        case 3:
          color = 'rgba(255, 204, 0, 0.1)';
          break;
        case 4:
          color = 'rgba(255, 149, 0, 0.1)';
          break;
        case 5:
          color = 'rgba(255, 59, 48, 0.1)';
          break;
        default:
          color = 'black';
          break;
      }
    } else if (key === currentRating) {
      color = this.getRatingBorderColorStyle(key, currentRating).borderColor;
    } else {
      color = 'rgba(252, 252, 252, 1)';
    }

    return { backgroundColor: color };
  };

  getRatingTextColorStyle = (key, currentRating) => {
    const isKeySelected = key === currentRating;
    const noneSelected = currentRating === 0;
    if (isKeySelected || noneSelected) {
      return { color: 'rgba(45, 49, 51, 1)' };
    }
    return { color: 'rgba(218, 219, 219, 1)' };
  };

  changeRating = key => () => {
    let value = 0;
    if (this.state.rating !== key) {
      value = key;
    }
    this.setState({ rating: value });
    this.props.ratingChanged(value);
  };

  render() {
    const { styles } = this.props;
    const ratings = [];

    for (let i = 1; i <= MAX_RATING; i += 1) {
      const borderColor = this.getRatingBorderColorStyle(i, this.state.rating);
      const fillColor = this.getRatingFillColorStyle(i, this.state.rating);
      const textColor = this.getRatingTextColorStyle(i, this.state.rating);
      const isFilled = i <= this.state.rating || this.state.rating === 0;
      const borderStyle = isFilled ? styles.ratingBorderFilled : styles.ratingBorderUnfilled;
      const combinedBorderStyle = Object.assign({}, borderStyle, borderColor, fillColor);

      const ratingComponent = (
        <TouchableOpacity activeOpacity={0.8} key={i} onPress={this.changeRating(i)}>
          <View style={combinedBorderStyle}>
            <Text style={textColor}>{i}</Text>
          </View>
        </TouchableOpacity>);
      ratings.push(ratingComponent);
    }

    return (
      <View style={styles.container} data-testid="color-rating-component">
        <View style={styles.ratingContainer}>
          {ratings}
        </View>
      </View>
    );
  }
}
