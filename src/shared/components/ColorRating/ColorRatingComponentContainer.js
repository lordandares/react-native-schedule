import React from 'react';
import { withStyles } from '../../../shared/withStyles';
import ColorRatingComponentView from './view/ColorRatingComponentView';
import { colorRatingComponentViewStyles } from './view/ColorRatingComponentView.styles';
import type { ColorRatingContainerProps } from './ColorRatingComponent.types';

export const ColorRatingComponentContainer = (props: ColorRatingContainerProps) => {
  const ColorRatingWithStyles = withStyles(colorRatingComponentViewStyles)(ColorRatingComponentView);
  return <ColorRatingWithStyles {...props} />;
};
