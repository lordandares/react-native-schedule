import React, { Component } from 'react';
import { Alert, View, Text, RefreshControl } from 'react-native';
import moment from 'moment-timezone';
import DatePicker from 'react-native-datepicker';
import { isEmpty } from 'lodash';
import type { ClockInRecord, ClockOutRecord } from '@next/schedule/types/timekeeping.types';
import { Navigation } from 'react-native-navigation';
import { withNamespaces } from 'react-i18next';

import ScheduleComponentStyles from './ScheduleComponent.styles';
import type { Shift } from '../../../../shared/types/schedule.types';
import { isOneTime, isRepeating } from '../../../../shared/utils/shift/shiftType';
import { SCREEN_LOADING_SHIFTS, SCREEN_CREATE_SHIFT } from '../../../../shared/constants/screens';
import { withStyles } from '../../../../shared/withStyles';
import { ScheduleComponentProps } from './ScheduleComponent.types';
import ShiftListComponent from '../ShiftListComponent/ShiftListComponent';
import SectionShiftListComponent from '../../../../shared/components/SectionShiftList/SectionShiftList';
import IconLoader from '../../../../shared/utils/IconLoader';
import Tabs from '../../../../shared/components/Tabs/TabsComponent';
import formatStartEndShift from '../../../../shared/utils/shift/shiftTimesFormatter';
import userCanDo, { VIEW_COMPLETE_HOME } from '../../../../shared/auth/utils/canUserDo';
import NothingToSeeHereMessage from '../../../../shared/components/NothingToSeeHereMessage/NothingToSeeHereMessage';
import { getAppBarStyle } from '../../../../shared/navigation/getAppBarStyle';
import theme from '../../../../shared/theme';
import { APP_TABS, SCHEDULE_TABS } from '../../../../shared/constants/tabs';
import SCHEDULE_COMPONENT from '../../constants/ShiftCoverageComponent';
import COMMON from '../../../../shared/constants/common';
import { getAppBarButton } from '../../../../shared/navigation/getAppBarButton';

class ScheduleComponent extends Component<ScheduleComponentProps> {
  static options = getAppBarStyle(theme)

  static createClockRecord = (shift: Shift, userId: string) => ({
    eventTime: moment().toDate(),
    userId,
    siteId: shift.siteId ? shift.siteId : '',
    serviceId: shift.serviceId ? shift.serviceId : '',
    shiftId: shift.id ? shift.id : '',
  });

  constructor(props: ScheduleComponentProps) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.setSelectedDate(moment());
    this.updateCalendarIcon();
    this.props.getExceptions();
    // Want to check for FF before laoding?
    this.props.getOfferedShifts();

    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        right: {
          enabled: false,
        },
      },
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      scheduleState: {
        loadingGetShifts, loadingExceptions, loadingOfferedShifts, loading,
      },
      clockEventsLoading,
    } = this.props;
    if ((loadingGetShifts !== nextProps.scheduleState.loadingGetShifts)
      || (loadingExceptions !== nextProps.scheduleState.loadingExceptions)
      || (loading !== nextProps.scheduleState.loading)
      || clockEventsLoading !== nextProps.clockEventsLoading
      || loadingOfferedShifts !== nextProps.loadingOfferedShifts) {
      if (nextProps.scheduleState.loadingGetShifts
        || nextProps.scheduleState.loadingExceptions
        || nextProps.scheduleState.loading
        || nextProps.clockEventsLoading
        || nextProps.loadingOfferedShifts) {
        nextProps.showOverlay(SCREEN_LOADING_SHIFTS);
      } else {
        nextProps.dismissOverlay(SCREEN_LOADING_SHIFTS);
      }
    }
  }

  componentDidUpdate(preProps: ScheduleComponentProps) {
    if (this.props.scheduleState.selectedDate !== preProps.scheduleState.selectedDate) {
      this.updateCalendarIcon();
    }
  }

  onUserScheduleRefresh = () => {
    this.props.showRefreshingIndicator();

    try {
      const selectedDate = moment();
      this.props.setSelectedDate(selectedDate);
      this.props.getExceptions();
      this.props.getOfferedShifts();
      const { companyId } = this.props.currentUser;
      this.props.requestTenant(companyId);
    } finally {
      this.props.hideRefreshingIndicator();
    }
  };

  onChangeDate = (date: string) => {
    this.props.showRefreshingIndicator();

    try {
      const selectedDate = moment(date);
      this.props.setSelectedDate(selectedDate);
      this.props.getExceptions();
    } finally {
      this.props.hideRefreshingIndicator();
    }
  };

  onShiftSelected = (shift: Shift) => {
    const { timeFormat, shortDateFormat } = this.props.tenant;
    this.props.setSelectedShift(shift);
    const justThisShift =
      isOneTime(shift.shiftType) || (isRepeating(shift.shiftType) && this.props.scheduleState.justThisShift);
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ShiftDetail',
        passProps: {
          scheduleState: this.props.scheduleState,
          justThisShift,
          timeFormat: this.props.tenant.timeFormat,
          shortDateFormat: this.props.tenant.shortDateFormat,
        },
        options: {
          topBar: {
            title: {
              text: `${shift.siteName} - ${shift.serviceName}`,
            },
            subtitle: {
              text: formatStartEndShift(shift.start, shift.end, shift.siteTimeZone, true, timeFormat, shortDateFormat),
            },
          },
        },
      },
    });
  };

  setDatepickerRef = (ref: any) => {
    this.datepicker = ref;
  };

  setActiveInnerTab = (index) => {
    this.props.changeInnerTab(APP_TABS.SCHEDULE, index);
  }

  getTopBarButtons(user) {
    const iconLoader = new IconLoader();
    const buttons = [];
    if (
      (user.userRole === 'Admin' || user.userRole === 'Owner') &&
      this.props.canSeeAddBtnInScheduleComp
    ) {
      buttons.push(getAppBarButton('addBtn-ScheduleComp', 'add', 'add'));
    }
    buttons.push({
      id: 'edit-date',
      icon: iconLoader.getCalendarIcon(this.props.scheduleState.selectedDate.date()),
    });
    return buttons;
  }

  navigationButtonPressed({ buttonId }) {
    // this is the event type for button presses
    if (buttonId === 'edit-date') {
      // this is the same id field from the static navigatorButtons definition
      this.datepicker.onPressDate();
    }
    if (buttonId === 'addBtn-ScheduleComp') {
      Navigation.push(this.props.componentId, {
        component: {
          name: SCREEN_CREATE_SHIFT,
          options: {
            topBar: {
              title: {
                text: 'Blank Page',
              },
            },
          },
        },
      });
    }
  }

  async updateCalendarIcon() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: this.getTopBarButtons(this.props.currentUser),
      },
    });
  }

  acceptShift = (shiftId: string) => {
    const { t: translate } = this.props;
    Alert.alert(
      translate(COMMON.ACCEPT_OFFERED_SHIFT),
      translate(COMMON.WOULD_YOU_LIKE_TO_ACCEPT_THIS_SHIFT),
      [
        {
          text: translate(COMMON.NO),
        },
        {
          text: translate(COMMON.YES),
          onPress: () => {
            this.props.showOverlay(SCREEN_LOADING_SHIFTS);
            this.props.requestAcceptOfferedShift(shiftId);
          },
        },
      ],
    );
  }

  clockIn = (shift: Shift) => {
    this.props.showOverlay(SCREEN_LOADING_SHIFTS);
    const clockInRecord: ClockInRecord = ScheduleComponent.createClockRecord(
      shift,
      this.props.currentUser.userId,
    );
    this.props.requestClockIn(clockInRecord);
  };

  clockOut = (shift: Shift) => {
    this.props.showOverlay(SCREEN_LOADING_SHIFTS);
    const clockOutRecord: ClockOutRecord = ScheduleComponent.createClockRecord(
      shift,
      this.props.currentUser.userId,
    );
    this.props.requestClockOut(clockOutRecord);
  };

  renderEmptyList = () =>
    !this.props.scheduleState.loading &&
    !this.props.scheduleState.loadingExceptions &&
    !this.props.scheduleState.loadingOfferedShifts &&
    <View style={this.props.styles.emptyList}><NothingToSeeHereMessage id="emptyList" /></View>

  renderAdminTabs = () => {
    const {
      styles,
      activeInnerTab,
      scheduleState: {
        unassignedShifts, assignedShifts, exceptionsShifts, offeredShifts, isRefreshing,
      },
    }: ScheduleComponentProps = this.props;

    const hasException: boolean = !isEmpty(exceptionsShifts);

    return (
      <View style={styles.tabContainer}>
        <Tabs style={styles.flex} setActiveTab={this.setActiveInnerTab} activeTab={activeInnerTab}>
          <View tab={SCHEDULE_TABS.UNASSIGNED} style={styles.flex}>
            {!isEmpty(unassignedShifts) ? (
              <ShiftListComponent
                shifts={unassignedShifts}
                onShiftSelected={this.onShiftSelected}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={this.onUserScheduleRefresh} />}
              />
            ) : (
              this.renderEmptyList()
            )}
          </View>
          {hasException &&
          <View
            tab={SCHEDULE_TABS.EXCEPTIONS}
            style={styles.flex}
          >
            {(!isEmpty(exceptionsShifts) ? (
              <SectionShiftListComponent
                shifts={exceptionsShifts}
                exception
                scheduleComponent
                onShiftSelected={this.onShiftSelected}
                clockIn={this.clockIn}
                clockOut={this.clockOut}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={this.onUserScheduleRefresh} />}
                shortDateFormat={this.props.tenant.shortDateFormat}
              />
            ) : (
              this.renderEmptyList()
            ))}
          </View>}

          <View
            tab={SCHEDULE_TABS.MY_SHIFTS}
            style={styles.flex}
          >
            {(!isEmpty(assignedShifts) ? (
              <SectionShiftListComponent
                shifts={assignedShifts}
                scheduleComponent
                onShiftSelected={this.onShiftSelected}
                clockIn={this.clockIn}
                clockOut={this.clockOut}
                refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={this.onUserScheduleRefresh} />}
                shortDateFormat={this.props.tenant.shortDateFormat}
              />
            ) : (
              this.renderEmptyList()
            ))}
          </View>

          {!isEmpty(offeredShifts) &&
          <View tab={SCHEDULE_TABS.OFFERED_SHIFTS} style={styles.flex}>
            <View style={styles.tabContainer}>
              {!isEmpty(offeredShifts) ? (
                <SectionShiftListComponent
                  offeredShiftComponent
                  shifts={offeredShifts}
                  onShiftSelected={this.onShiftSelected}
                  acceptShift={this.acceptShift}
                  refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={this.onUserScheduleRefresh} />
                  }
                  shortDateFormat={this.props.tenant.shortDateFormat}
                />
             ) : (
                this.renderEmptyList()
              )}
            </View>
          </View>}
        </Tabs>
      </View>
    );
  };

  renderUserTabs = () => {
    const {
      styles,
      activeInnerTab,
      scheduleState: {
        assignedShifts, exceptionsShifts, offeredShifts, loading, loadingExceptions, loadingOfferedShifts, isRefreshing,
      },
      t: translate,
    }: ScheduleComponentProps = this.props;

    const hasException: boolean = !isEmpty(exceptionsShifts);

    return !loading && !loadingExceptions && !loadingOfferedShifts && (
      <View id="user-tab-container" style={styles.tabContainer}>
        <Tabs style={styles.flex} setActiveTab={this.setActiveInnerTab} activeTab={activeInnerTab}>

          <View tab={SCHEDULE_TABS.MY_SHIFTS} style={styles.flex}>
            <View style={styles.tabContainer}>
              {!loading &&
              (!isEmpty(assignedShifts) ? (
                <View>
                  {!hasException && (
                    <View style={styles.subHeader}>
                      <Text style={styles.subHeaderText}>{translate(SCHEDULE_COMPONENT.MY_SHIFTS)}</Text>
                    </View>
                  )}
                  <SectionShiftListComponent
                    shifts={assignedShifts}
                    scheduleComponent
                    clockIn={this.clockIn}
                    clockOut={this.clockOut}
                    onShiftSelected={this.onShiftSelected}
                    refreshControl={
                      <RefreshControl refreshing={isRefreshing} onRefresh={this.onUserScheduleRefresh} />
                    }
                    shortDateFormat={this.props.tenant.shortDateFormat}
                  />
                </View>
              ) : (
                this.renderEmptyList()
              ))}
            </View>
          </View>

          {!isEmpty(exceptionsShifts) &&
          <View tab={SCHEDULE_TABS.EXCEPTIONS} style={styles.flex}>
            <View style={styles.tabContainer}>
              {(!isEmpty(exceptionsShifts) ? (
                <SectionShiftListComponent
                  shifts={exceptionsShifts}
                  scheduleComponent
                  exception
                  onShiftSelected={this.onShiftSelected}
                  clockIn={this.clockIn}
                  clockOut={this.clockOut}
                  refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={this.onUserScheduleRefresh} />}
                  shortDateFormat={this.props.tenant.shortDateFormat}
                />
              ) : (
                this.renderEmptyList()
              ))}
            </View>
          </View>}

          {!isEmpty(offeredShifts) &&
          <View tab={SCHEDULE_TABS.OFFERED_SHIFTS} style={styles.flex}>
            <View style={styles.tabContainer}>
              {!loadingOfferedShifts &&
              (!isEmpty(offeredShifts) ? (
                <SectionShiftListComponent
                  offeredShiftComponent
                  shifts={offeredShifts}
                  onShiftSelected={this.onShiftSelected}
                  acceptShift={this.acceptShift}
                  refreshControl={
                    <RefreshControl refreshing={isRefreshing} onRefresh={this.onUserScheduleRefresh} />
                  }
                  shortDateFormat={this.props.tenant.shortDateFormat}
                  timeFormat={this.props.tenant.timeFormat}
                />
             ) : (
                this.renderEmptyList()
              ))}
            </View>
          </View>}

        </Tabs>
      </View>
    );
  };

  render() {
    const {
      styles,
      currentUser,
      t: translate,
    }: ScheduleComponentProps = this.props;
    return (
      <View style={styles.container}>
        {userCanDo(VIEW_COMPLETE_HOME, currentUser) ? this.renderAdminTabs() : this.renderUserTabs()}
        <View style={styles.datePicker}>
          <DatePicker
            date={this.props.scheduleState.selectedDate.format('YYYY-MM-DD')}
            showIcon={false}
            hideText
            confirmBtnText={translate(COMMON.CONFIRM)}
            cancelBtnText={translate(COMMON.CANCEL)}
            onDateChange={this.onChangeDate}
            ref={this.setDatepickerRef}
            locale={moment.locale()}
          />
        </View>
      </View>
    );
  }
}

export default
withStyles(ScheduleComponentStyles, { themePropName: 'withStylesTheme' })(withNamespaces()(ScheduleComponent));
