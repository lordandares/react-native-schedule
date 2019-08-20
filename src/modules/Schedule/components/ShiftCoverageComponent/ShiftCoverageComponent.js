// @flow
import React, { Component } from 'react';
import { FlatList, Button, View, ScrollView, TextInput, Alert, RefreshControl } from 'react-native';
import moment from 'moment-timezone';
import { Navigation } from 'react-native-navigation';
import _ from 'lodash';
import { withNamespaces } from 'react-i18next';

import { withStyles } from '../../../../shared/withStyles';
import type { User } from '../../../../shared/types/schedule.types';
import CustomIcon, { ICON_NAMES } from '../../../../shared/customIcons/NextIcons';
import FlatListItemSeparator from '../../../../shared/components/FlatListItemSeparator/FlatListItemSeparatorComponent';
import { isRepeating } from '../../../../shared/utils/shift/shiftType';
import CoverageListItem from '../../../../shared/components/CoverageListItem/CoverageListItem';
import ShiftCoverageComponentStyles from './ShiftCoverageComponent.styles';
import type { ShiftCoverageComponentProps, ShiftCoverageComponentState } from './ShiftCoverageComponent.types';
import userCanDo, { ASSIGN_USER } from '../../../../shared/auth/utils/canUserDo';
import theme from '../../../../shared/theme';
import { getAppBarStyle } from '../../../../shared/navigation/getAppBarStyle';
import AnalyticsEvents from '../../../../shared/constants/analyticsEvents';

import COMMON from '../../../../shared/constants/common';
import SHIFT_COVERAGE_COMPONENT from '../../constants/ShiftCoverageComponent';

class ShiftCoverageComponent extends Component<ShiftCoverageComponentProps, ShiftCoverageComponentState> {
  static options = getAppBarStyle(theme)

  constructor(props: ShiftCoverageComponentProps) {
    super(props);
    this.state = {
      selectedUsers: props.scheduleState
        ? (props.scheduleState.selectedShift && props.scheduleState.selectedShift.users) || []
        : [],
      userAssigned:
        props.scheduleState && props.scheduleState.selectedShift ? props.scheduleState.selectedShift.users : [],
    };
  }
  componentWillUnmount() {
    this.props.setUsersSearchTerm('');
  }

  onRefresh = () => {
    this.props.getUsers();
  };

  onPressItem = (user: User) => {
    const { currentUser } = this.props;
    if (!userCanDo(ASSIGN_USER, currentUser)) {
      return;
    }
    const { selectedUsers } = this.state;
    if (selectedUsers.length > 0 && selectedUsers[0].id === user.id) {
      this.setState({
        selectedUsers: [],
      });
    } else {
      this.setState({
        selectedUsers: [user],
      });
    }
  };

  onAssign = async () => {
    let ret;
    const { selectedUsers, userAssigned } = this.state;
    const { selectedShift } = this.props.scheduleState;
    const { t: translate } = this.props;

    this.props.setShiftSelectedUsers(selectedUsers);
    if (isRepeating(selectedShift.shiftType)) {
      ret = await this.props.updateRepeatingShift({
        shift: {
          ...selectedShift,
          users: selectedUsers,
        },
        allFutureShifts: !this.props.scheduleState.justThisShift,
        returnBoundaryStart: moment().add(-15, 'hours'),
        returnBoundaryEnd: moment().add(15, 'hours'),
      });
    } else {
      ret = await this.props.updateShift({
        ...selectedShift,
        users: selectedUsers,
      });
    }

    if (ret) {
      if (_.isEmpty(selectedShift.users)) {
        this.props.trackEvent(AnalyticsEvents.ASSIGN_UNASSIGNED_SHIFT);
      } else {
        this.props.trackEvent(AnalyticsEvents.ASSIGN_ASSIGNED_SHIFT);
      }
      this.goBack();
    } else {
      this.props.setShiftSelectedUsers(userAssigned);
      Alert.alert(translate(COMMON.ERROR.toUpperCase()), translate(SHIFT_COVERAGE_COMPONENT.USER_WAS_NOT_SAVED));
    }
  };

  goBack = () => Navigation.pop(this.props.componentId);

  isSelected = (userId: string) => {
    const { selectedUsers } = this.state;
    if (selectedUsers && selectedUsers.length > 0) {
      if (selectedUsers[0].id === userId) {
        return true;
      }
      return false;
    }
    return false;
  };

  renderItem(user: any) {
    return (
      <CoverageListItem
        user={user.item}
        onPressItem={this.onPressItem}
        isSelected={this.isSelected(user.item.id)}
      />
    );
  }

  render() {
    const { styles, usersLoading, t: translate } = this.props;
    const { selectedUsers } = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={styles.searchSection}>
          <CustomIcon
            style={styles.searchIcon}
            name={ICON_NAMES.SEARCH}
            size={30}
            color={theme.palette.searchInput.iconColor}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={term => this.props.setUsersSearchTerm(term)}
            placeholderTextColor={theme.palette.searchInput.placeholderTextColor}
            placeholder={translate(COMMON.SEARCH_BY_NAME)}
            value={this.props.scheduleState && this.props.scheduleState.usersSearchTerm}
          />
        </View>
        <ScrollView refreshControl={<RefreshControl refreshing={usersLoading} onRefresh={this.onRefresh} />}>
          <FlatList
            data={this.props.scheduleState && this.props.scheduleState.filteredUsers}
            renderItem={(user: User) => this.renderItem(user)}
            keyExtractor={(item: User) => item.id}
            ItemSeparatorComponent={FlatListItemSeparator}
            extraData={selectedUsers}
          />
        </ScrollView>
        <View style={styles.buttonBar}>
          <Button title={translate(COMMON.CANCEL)} style={styles.button} onPress={this.goBack} />
          <Button title={translate(COMMON.ASSIGN)} style={styles.button} onPress={this.onAssign} />
        </View>
      </View>
    );
  }
}

export default
withStyles(ShiftCoverageComponentStyles, {
  themePropName: 'withStylesTheme',
})(withNamespaces()(ShiftCoverageComponent));
