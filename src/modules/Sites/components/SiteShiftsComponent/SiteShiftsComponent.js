import React, { Component } from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import DatePicker from 'react-native-datepicker';
import moment from 'moment-timezone';
import { isEmpty } from 'lodash';
import { Navigation } from 'react-native-navigation';
import { withNamespaces } from 'react-i18next';

import { isOneTime, isRepeating } from '../../../../shared/utils/shift/shiftType';
import { SCREEN_LOADING_SITE, SCREEN_CREATE_SHIFT } from '../../../../shared/constants/screens';
import SectionShiftList from '../../../../shared/components/SectionShiftList/SectionShiftList';
import type { Shift } from '../../../../shared/types/schedule.types';
import { withStyles } from '../../../../shared/withStyles';
import InfoRosieMessage from '../../../../shared/components/InfoRosieMessage/InfoRosieMessage';
import NothingToSeeHereMessage from '../../../../shared/components/NothingToSeeHereMessage/NothingToSeeHereMessage';
import IconLoader from '../../../../shared/utils/IconLoader';
import SiteShiftsComponentStyles from './SiteShiftsComponent.styles';
import SiteShiftsComponentProps from './SiteShiftsComponent.types';
import formatStartEndShift from '../../../../shared/utils/shift/shiftTimesFormatter';
import hasPermissionsForShift from '../../../../shared/utils/shift/shiftPermission';
import { getAppBarStyle } from '../../../../shared/navigation/getAppBarStyle';
import theme from '../../../../shared/theme';
import SITES_MODULE from '../../constants/Sites';
import COMMON from '../../../../shared/constants/common';
import { getAppBarButton } from '../../../../shared/navigation/getAppBarButton';

class SiteShiftsComponent extends Component<SiteShiftsComponentProps> {
  static options = getAppBarStyle(theme)

  constructor(props: SiteShiftsComponentProps) {
    super(props);
    Navigation.events().bindComponent(this);
    this.state = {
      isSingleDate: false,
    };
  }

  componentDidMount() {
    if (this.props.scheduleState && this.props.scheduleState.selectedSite) {
      this.props.setSelectedDateOnSites(moment(), moment().add(31, 'd'), this.props.scheduleState.selectedSite);
      this.updateAppBar(this.props.scheduleState.selectedDateOnSites.start);
    }
    this.updateCalendarIcon();
  }

  componentWillReceiveProps(nextProps: SiteShiftsComponentProps) {
    const { scheduleState, hideRefreshingIndicator } = this.props;
    if (!scheduleState.selectedDateOnSites.start.isSame(nextProps.scheduleState.selectedDateOnSites.start)) {
      this.updateAppBar(nextProps.scheduleState.selectedDateOnSites.start);
    }
    if (scheduleState.loadingGetShifts && !nextProps.scheduleState.loadingGetShifts && scheduleState.isRefreshing) {
      hideRefreshingIndicator();
    }
    if (scheduleState.loadingGetShifts !== nextProps.scheduleState.loadingGetShifts) {
      if (nextProps.scheduleState.loadingGetShifts) {
        nextProps.showOverlay(SCREEN_LOADING_SITE);
      } else {
        nextProps.dismissOverlay(SCREEN_LOADING_SITE);
      }
    }
  }

  componentDidUpdate(preProps: SiteShiftsComponentProps) {
    if (!this.props.scheduleState.selectedDateOnSites.start.isSame(preProps.scheduleState.selectedDateOnSites.start)) {
      this.updateCalendarIcon();
    }
  }

  onUserScheduleRefresh = () => {
    const {
      scheduleState: { selectedDateOnSites, selectedSite },
      showRefreshingIndicator,
      setSelectedDateOnSites,
    } = this.props;
    showRefreshingIndicator();
    setSelectedDateOnSites(selectedDateOnSites.start, selectedDateOnSites.end, selectedSite);
    const { companyId } = this.props.currentUser;
    this.props.requestTenant(companyId);
  };

  onChangeDate = (date: string) => {
    const selectedDateOnSites = moment(date);
    if (this.props.scheduleState && this.props.scheduleState.selectedSite) {
      this.props.setSelectedDateOnSites(
        selectedDateOnSites,
        selectedDateOnSites,
        this.props.scheduleState.selectedSite,
      );
      this.setState({
        isSingleDate: true,
      });
    }
  };

  onShiftSelected = (shift: Shift) => {
    const {
      setSelectedShift, scheduleState, getShift, currentUser, timeFormat, shortDateFormat,
    } = this.props;
    if (!hasPermissionsForShift(shift, currentUser)) return;
    setSelectedShift(shift);
    getShift(shift.id);
    const justThisShift = isOneTime(shift.shiftType) || (isRepeating(shift.shiftType) && scheduleState.justThisShift);
    Navigation.push(this.props.componentId, {
      component: {
        name: 'ShiftDetail',
        passProps: {
          scheduleState: this.props.scheduleState,
          justThisShift,
          timeFormat: this.props.timeFormat,
          dateFormat: this.props.tenant.shortDateFormat,
        },
        options: {
          topBar: {
            title: { text: `${shift.siteName} - ${shift.serviceName}` },
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

  getTopBarButtons(user) {
    const iconLoader = new IconLoader();
    const buttons = [];
    if (
      (user.userRole === 'Admin' || user.userRole === 'Owner') &&
      this.props.canSeeAddBtnInSiteShiftsComp
    ) {
      buttons.push(getAppBarButton('addBtn-SiteShiftsComp', 'add', 'add'));
    }
    buttons.push({
      id: 'edit-date',
      icon: iconLoader.getCalendarIcon(this.props.scheduleState.selectedDate.date()),
    });
    return buttons;
  }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === 'edit-date') {
      // this is the same id field from the static navigatorButtons definition
      if (this.datepicker) {
        this.datepicker.onPressDate();
      }
    }
    if (buttonId === 'addBtn-SiteShiftsComp') {
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

  updateAppBar(date: moment) {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        subtitle: {
          text: date.format(`${this.props.tenant.shortDateFormat}, YYYY`).toUpperCase(),
        },
      },
    });
  }

  async updateCalendarIcon() {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: this.getTopBarButtons(this.props.currentUser),
      },
    });
  }

  renderSectionShiftList() {
    const { scheduleState, tenant } = this.props;
    if (scheduleState && scheduleState.shifts) {
      if (!isEmpty(scheduleState.shifts) || !this.state.isSingleDate) {
        return (<SectionShiftList
          shifts={scheduleState.shifts}
          onShiftSelected={this.onShiftSelected}
          shortDateFormat={tenant.shortDateFormat}
        />);
      }
      return <NothingToSeeHereMessage />;
    }
    return null;
  }

  render() {
    const { scheduleState, styles, t: translate } = this.props;
    const rosieText = `${translate(SITES_MODULE.WITHIN_RANGE_SHOWN)}\n\n${translate(SITES_MODULE.USE_THE_DATE_ICON)}`;
    const date: moment =
    scheduleState && scheduleState.selectedDateOnSites.start ? scheduleState.selectedDateOnSites.start : moment();
    return !scheduleState || (scheduleState.loadingGetShifts && !scheduleState.isRefreshing) ? (
      <View />
    ) : (
      <ScrollView
        style={styles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={scheduleState.isRefreshing} onRefresh={this.onUserScheduleRefresh} />
          }
      >
        {this.renderSectionShiftList()}
        {!this.state.isSingleDate && <InfoRosieMessage text={rosieText} />}
        <DatePicker
          date={date.format('YYYY-MM-DD')}
          showIcon={false}
          hideText
          confirmBtnText={translate(COMMON.CONFIRM)}
          cancelBtnText={translate(COMMON.CANCEL)}
          onDateChange={this.onChangeDate}
          ref={this.setDatepickerRef}
          locale={moment.locale()}
        />
      </ScrollView>
    );
  }
}

export default
withStyles(SiteShiftsComponentStyles, { themePropName: 'withStylesTheme' })(withNamespaces()(SiteShiftsComponent));
