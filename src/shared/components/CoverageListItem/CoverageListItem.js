// @flow
import React from 'react';
import { View, Text } from 'react-native';
import { withNamespaces } from 'react-i18next';

import Touchable from '../../components/Touchable/Touchable';
import shiftListItemComponentStyles from './CoverageListItem.style';
import CoverageListItemProps from './CoverageListItem.types';
import { withStyles } from '../../withStyles';
import Avatar from '../Avatar/Avatar';
import COMMON from '../../constants/common';

const CoverageListItem = (props: CoverageListItemProps) => {
  const { t: translate } = props;
  const fullName: string =
  props.user ? `${props.user.firstName} ${props.user.lastName}` : translate(COMMON.UNASSIGNED);
  const id: string = props.user ? props.user.id : '1';
  const unassigned: boolean = !props.user;
  const getDisplayName = (user: any) => `${user.firstName} ${user.lastName}`;

  return (
    <Touchable onPress={() => props.onPressItem(props.user)} style={props.styles.touchable}>
      <View style={props.styles.wrapper}>
        <View style={props.styles.leftContainer}>
          <View style={props.styles.avatarContainer}>
            <Avatar
              size={36}
              name={unassigned ? '' : getDisplayName(props.user)}
              color={props.isSelected ? props.theme.palette.primary.dark : props.theme.palette.grey[400]}
              emptyColor={props.theme.palette.error.main}
            />
          </View>
          <View style={props.styles.nameTextContainer}>
            <Text style={props.styles.fullNameText} id={`userFullName-${id}`} ellipsizeMode="tail" numberOfLines={1}>
              {fullName}
            </Text>
          </View>
        </View>
        <View style={props.styles.rightContainer}>
          <View style={props.styles.payRateTextContainer}>
            {unassigned && (
              <Text style={props.styles.assignText} id={`CoverageListItemPayRate-${id}`}>
                {translate(COMMON.ASSIGN)}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Touchable>
  );
};

export default withStyles(shiftListItemComponentStyles)(withNamespaces()(CoverageListItem));
