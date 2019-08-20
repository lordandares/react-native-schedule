// @flow
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment-timezone';
import { _ } from 'lodash';
import { withNamespaces } from 'react-i18next';

import siteShiftListItemComponent from './SiteShiftListItemComponent.style';
import { withStyles } from '../../withStyles';
import type { IShiftCompletionCalculator } from './IShiftCompletionCalculator';
import type { Shift } from '../../../shared/types/schedule.types';
import { ShiftCompletionCalculator } from './ShiftCompletionCalculator';
import CustomIcon from '../../../shared/customIcons/NextIcons';
import { isRepeating } from '../../utils/shift/shiftType';
import Touchable from '../Touchable/Touchable';
import Avatar from '../Avatar/Avatar';
import { SiteShiftListItemComponentTypes } from './SiteShiftListItemComponent.types';
import COMMON from '../../constants/common';
import CompanyTime from '../../../shared/components/DateTime/CompanyTime';

class SiteShiftListItemComponent extends Component<
  SiteShiftListItemComponentTypes
> {
  /**
   * @deprecated Don't do this, string should be ellipsized by the view it self based on available space
   */
  static truncateStringWithEllipsis = (value: string, length: number): string =>
    _.truncate(value, { length });

  static isShiftActive = (
    referenceTime: moment,
    startTime: moment,
    endTime: moment,
  ): boolean => referenceTime.isBetween(startTime, endTime, null, '[)');

  onPressItem = () => {
    this.props.onPressItem(this.props.shift);
  };

  getDisplayName = (shift: any) => `${shift.users[0].firstName} ${shift.users[0].lastName}`;

  isUnassigned = (shift: Shift) => !shift.users || shift.users.length === 0;

  renderTextsContainer() {
    const { styles }: SiteShiftListItemComponentTypes = this.props;
    const { t: translate } = this.props;

    return (
      <View style={styles.textsContainer}>
        <Text id="shift-list-item-name" ellipsizeMode="tail" numberOfLines={1} style={styles.title}>
          {this.isUnassigned(this.props.shift)
            ? translate(COMMON.UNASSIGNED)
            : this.getDisplayName(this.props.shift)}
        </Text>
        <View style={styles.hoursTextContainer}>
          <Text style={styles.subtitle}>
            <CompanyTime value={this.props.shift.start} /> - <CompanyTime value={this.props.shift.end} />
          </Text>
          {isRepeating(this.props.shift.shiftType) && (
            <CustomIcon
              id="repeating-icon"
              name="repeating"
              size={16}
              color="#2e4466"
              style={
                this.isUnassigned(this.props.shift)
                  ? styles.repeatingIconBig
                  : styles.repeatingIconSmall
              }
            />
          )}
        </View>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={styles.locationText}
        >
          {this.props.shift.serviceName}
        </Text>
      </View>
    );
  }

  render() {
    const { styles }: SiteShiftListItemComponentTypes = this.props;
    const { t: translate } = this.props;
    const completeText: string = translate(COMMON.COMPLETE);
    const incompleteText: string = translate(COMMON.INCOMPLETE);

    const showShiftAsActive: boolean = SiteShiftListItemComponent.isShiftActive(
      moment(),
      this.props.shift.start,
      this.props.shift.end,
    );

    const shiftCompletionCalculator: IShiftCompletionCalculator = new ShiftCompletionCalculator(this.props.shift);
    const canSeeComplete: boolean = shiftCompletionCalculator.isComplete();
    const canSeeIncomplete: boolean = shiftCompletionCalculator.isIncomplete();

    return (
      <Touchable onPress={this.onPressItem}>
        <View
          style={showShiftAsActive ? styles.activeContainer : styles.container}
        >
          <View style={styles.leftContainer}>
            <View style={styles.avatarContainer}>
              <Avatar
                size={36}
                name={
                  this.isUnassigned(this.props.shift)
                    ? ''
                    : this.getDisplayName(this.props.shift)
                }
                color={this.props.theme.palette.grey[400]}
                emptyColor={this.props.theme.palette.error.main}
              />
            </View>
            {this.renderTextsContainer()}
          </View>
          <View style={styles.rightContainer}>
            {canSeeComplete && (
              <View style={styles.textCompleteView}>
                <Text
                  id={`shift-list-item-complete-text-${this.props.shift.id}`}
                  style={styles.completeText}
                >
                  {completeText}
                </Text>
              </View>
            )}
            {canSeeIncomplete && (
              <View style={styles.textCompleteView}>
                <Text
                  id={`shift-list-item-incomplete-text-${this.props.shift.id}`}
                  style={styles.completeText}
                >
                  {incompleteText}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Touchable>
    );
  }
}

export default withStyles(siteShiftListItemComponent)(withNamespaces()(SiteShiftListItemComponent));
