// @flow
import React from 'react';
import { SectionList, Text } from 'react-native';
import { groupBy, map } from 'lodash';
import moment from 'moment-timezone';

import type { Shift } from '../../types/schedule.types';
import SiteShiftListItemComponent from '../ShiftListItem/SiteShiftListItemComponent';
import ShiftListItemComponent from '../ShiftListItem/ShiftListItemComponent';
import shiftListItemComponentStyles from './SectionShiftList.styles';
import SectionShiftListProps from './SectionShiftList.types';
import { withStyles } from '../../withStyles';
import OfferedShiftListItemComponent from '../ShiftListItem/OfferedShiftListItemComponent';
import i18n from '../../i18n/i18next';
import COMMON from '../../constants/common';

const shiftsListGroupByDate = (shifts: Shift[]) => {
  const listGroupBy = shifts ? groupBy(shifts, shift => moment(shift.start).format('YYYY-MM-DD')) : [];
  return map(listGroupBy, (group, key) => ({
    title: key,
    data: group,
  }));
};

const getTitle = (title: string, format: string) => {
  const day: moment = moment(title);
  const yesterday: string = moment().add(-1, 'd');
  const today: string = moment();
  const tomorrow: string = moment().add(1, 'd');

  if (day.isSame(yesterday, 'd')) {
    return i18n.translate(COMMON.YESTERDAY).toUpperCase();
  } else if (day.isSame(today, 'd')) {
    return i18n.translate(COMMON.TODAY).toUpperCase();
  } else if (day.isSame(tomorrow, 'd')) {
    return i18n.translate(COMMON.TOMORROW).toUpperCase();
  }
  return day.format(`ddd, ${format}`).toUpperCase();
};

const renderTitle = (titleStyles: any, title: string, format: string) =>
  <Text style={titleStyles}>{getTitle(title, format)}</Text>;

// TODO: redo - component rendering??
const renderItem = (
  scheduleComponent: boolean,
  offeredShiftComponent: boolean,
  exception: boolean,
  item: Shift,
  onShiftSelected: void,
  clockIn: void,
  clockOut: void,
  acceptShift: void,
  timeFormat: string,
) => {
  if (scheduleComponent) {
    return (
      <ShiftListItemComponent
        shift={item}
        exception={exception}
        onPressItem={onShiftSelected}
        clockIn={clockIn}
        clockOut={clockOut}
        timeFormat={timeFormat}
      />
    );
  } else if (offeredShiftComponent) {
    return (
      <OfferedShiftListItemComponent
        shift={item}
        onPressItem={onShiftSelected}
        acceptShift={acceptShift}
        timeFormat={timeFormat}
      />);
  }
  return (
    <SiteShiftListItemComponent
      shift={item}
      onPressItem={onShiftSelected}
      timeFormat={timeFormat}
    />);
};

const SectionShiftList = (props: SectionShiftListProps) => (
  <SectionList
    renderSectionHeader={({ section }) => renderTitle(props.styles.title, section.title, props.shortDateFormat)}
    keyExtractor={item => item.id}
    sections={shiftsListGroupByDate(props.shifts)}
    renderItem={({ item }) =>
      renderItem(
        props.scheduleComponent,
        props.offeredShiftComponent,
        props.exception,
        item,
        props.onShiftSelected,
        props.clockIn,
        props.clockOut,
        props.acceptShift,
        props.timeFormat,
      )
    }
    stickySectionHeadersEnabled={false}
    refreshControl={props.refreshControl}
  />
);

export default withStyles(shiftListItemComponentStyles)(SectionShiftList);
