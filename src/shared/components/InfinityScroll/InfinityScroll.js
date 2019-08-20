import React from 'react';
import { ScrollView } from 'react-native';
import { InfinityScrollComponentProps } from './InfinityScroll.types';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 1;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

const InfinityScroll = ({
  refreshControl,
  actionValidation,
  infiniteScrollDayPosition,
  children,
  reachBottomCallback,
}: InfinityScrollComponentProps) => (
  <ScrollView
    refreshControl={refreshControl}
    scrollEventThrottle={200}
    onScroll={({ nativeEvent }) => {
      if (isCloseToBottom(nativeEvent) && actionValidation) reachBottomCallback(infiniteScrollDayPosition);
    }}
  >
    {children}
  </ScrollView>
);

export default InfinityScroll;
