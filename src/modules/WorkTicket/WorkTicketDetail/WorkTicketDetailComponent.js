// @flow
import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity, FlatList } from 'react-native';
import moment from 'moment-timezone';
import { find } from 'lodash';
import { withNamespaces } from 'react-i18next';
import workTicketStatusConstants from '@next/schedule/lib/constants/work';
import type { WorkTicket } from '@next/schedule/types/workTicket.types';
import CoverageListItem from '../../../shared/components/CoverageListItem/CoverageListItem';
import FlatListItemSeparator from '../../../shared/components/FlatListItemSeparator/FlatListItemSeparatorComponent';
import { withStyles } from '../../../shared/withStyles';
import hasPermissionsForWork from '../../../shared/utils/work/workPermission';
import WorkDetailComponentStyles from './WorkTicketDetailComponent.styles';
import CustomIcon from '../../../shared/customIcons/NextIcons';
import type { User } from '../../../shared/types/schedule.types';
import theme from '../../../shared/theme';
import { getAppBarStyle } from '../../../shared/navigation/getAppBarStyle';
import COMMON from '../../../shared/constants/common';

class WorkTicketDetailComponent extends Component {
  static options = getAppBarStyle(theme);

  constructor(props) {
    super(props);
    const { currentUser, workTicket } = props;
    if (!hasPermissionsForWork(workTicket, currentUser)) {
      props.navigator.pop({
        animated: false,
      });
    }
    this.state = { bottomViewHeight: 0 };
  }

  onPress = () => {
    const { workTicket } = this.props;
    const updatedTicket: WorkTicket = {
      ...workTicket,
      workTicketStatus: { status: this.switchStatus(workTicket.workTicketStatus.status) },
    };
    this.props.updateWorkTicket(updatedTicket);
  };

  onLayoutChange = (event) => {
    const { height } = event.nativeEvent.layout;
    this.setState({ bottomViewHeight: height });
  };

  getWorkStatus = () => {
    const { workTicket: { workTicketStatus } } = this.props;
    if (workTicketStatus && workTicketStatus.status) {
      return workTicketStatus.status;
    }
    return workTicketStatusConstants.open;
  };

  getDueDateDiff = () => {
    const { workTicket, t: translate } = this.props;
    const today = moment().startOf('day');
    const dueDate = moment(workTicket.dueDate).startOf('day');
    const diff = today.diff(dueDate, 'days');
    const days = diff === -1 || diff === 1 ? 'day' : 'days';
    if (diff >= -10) {
      let text = diff < 0 ? `in ${-diff} ${days}` : 'Past Due';
      if (diff === 0) {
        text = translate(COMMON.TODAY);
      }
      return text;
    }
    return '';
  };

  isWorkClosed = () => {
    if (this.getWorkStatus().toUpperCase() === workTicketStatusConstants.closed.toUpperCase()) {
      return true;
    }
    return false;
  };

  switchStatus = (status) => {
    switch (status) {
      case workTicketStatusConstants.open:
        return workTicketStatusConstants.closed;
      case workTicketStatusConstants.closed:
        return workTicketStatusConstants.open;
      default:
        return workTicketStatusConstants.closed;
    }
  };

  renderDueDate = () => {
    const { styles, workTicket, t: translate } = this.props;
    return (
      <View>
        <Text id="dd-section-title" style={styles.sectionTitle}>
          {translate(COMMON.DUE_DATE)}
        </Text>
        <View style={styles.dueDateTextContainer}>
          <CustomIcon id="dd-section-icon" name="calendar" size={16} color="#98a2b3" />
          <Text id="dd-section-text" style={styles.dueDateText}>
            {moment(workTicket.dueDate).format(`ddd ${this.props.tenant.shortDateFormat}`)}
          </Text>
          <Text id="dd-section-diff" style={styles.dueDateDiffText}>
            {this.getDueDateDiff()}
          </Text>
        </View>
      </View>
    );
  };

  renderCustomerSite = () => {
    const {
      styles, workTicket, sites, t: translate,
    } = this.props;
    const site = find(sites, siteObj => siteObj.id === workTicket.site.siteId);
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{translate(COMMON.SITE)}</Text>
        <View style={styles.siteContainer}>
          <CustomIcon name="sites" size={24} color="#97a1b1" />
          <Text style={styles.siteText}>{workTicket.site.siteName}</Text>
        </View>
        <View style={styles.customerContainer}>
          <Text style={styles.sectionSubtitle}>{translate(COMMON.ADDRESS)}</Text>
          <Text style={styles.sectionContent}>{`${site.address1} ${site.city} ${site.state} ${site.zipCode}`}</Text>
          <Text style={styles.sectionSubtitle}>{translate(COMMON.CUSTOMER)}</Text>
          <Text style={[styles.sectionContent, styles.sectionContentPrimary]}>{workTicket.customer.customerName}</Text>
        </View>
      </View>
    );
  };

  renderInstructions = () => {
    const { styles, workTicket, t: translate } = this.props;
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}> {translate(COMMON.INSTRUCTIONS)}</Text>
        <Text style={styles.sectionContent}>{`${workTicket.instructions} `}</Text>
      </View>
    );
  };

  renderCoverage = () => {
    const { styles, workTicket, t: translate } = this.props;
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{translate(COMMON.COVERAGE)}</Text>
        <View style={styles.customerContainer}>
          <View style={styles.usersClockinContainer}>
            {this.renderUserList(workTicket.users)}
          </View>
        </View>
      </View>
    );
  };

  renderUserList = (users: User[]) =>
    (users && users.length ? (
      <FlatList
        data={users}
        renderItem={(user: User) => this.renderItem(user)}
        keyExtractor={(item: User) => item.id}
        ItemSeparatorComponent={FlatListItemSeparator}
        style={this.props.styles.contentContainer}
      />
    ) : (
      <CoverageListItem onPressItem={() => {
      }}
      />
    ));

  renderItem = (user: any) => (
    <CoverageListItem
      user={user.item}
      onPressItem={() => {
      }}
    />
  );

  renderBottomView = () => {
    const { styles, workTicket, t: translate } = this.props;
    const isClosed = this.isWorkClosed();
    const button = isClosed ? translate(COMMON.RE_OPEN_WORK) : translate(COMMON.CLOSE_WORK);
    return (
      <View style={[styles.bottomContainer, isClosed && styles.bottomContainerClosed]} onLayout={this.onLayoutChange}>
        <View style={styles.statusContainer}>
          <Text style={isClosed ? styles.statusDescClosed : styles.statusDesc}>{translate(COMMON.WORK_STATUS)}</Text>
          <Text id="status-text" style={isClosed ? styles.statusTextClosed : styles.statusText}>
            {translate(COMMON[this.getWorkStatus().toUpperCase()]).toUpperCase()}
          </Text>
          {isClosed && (workTicket.workTicketStatus.modifiedBy || workTicket.workTicketStatus.modified) && (
            <Text id="modified-text" numberOfLines={1}>
              {workTicket.workTicketStatus.modifiedBy && (
                <Text>
                  <Text style={isClosed ? styles.statusUserClosed : styles.statusUser}>by </Text>
                  <Text style={[isClosed ? styles.statusUserClosed : styles.statusUser, styles.bold]}>
                    {workTicket.workTicketStatus.modifiedBy}
                  </Text>
                </Text>
              )}
              {workTicket.workTicketStatus.modified && (
                <Text style={isClosed ? styles.statusUserClosed : styles.statusUser}>
                  {` on ${moment(workTicket.workTicketStatus.modified).format(this.props.tenant.dateFormat)}`}
                </Text>
              )}
            </Text>
          )}
        </View>
        <TouchableOpacity id="change-status-button" style={styles.button} onPress={this.onPress}>
          <Text style={styles.buttonText}>{button}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { styles } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={{ marginBottom: this.state.bottomViewHeight }} contentContainerStyle={styles.scrollView}>
          {this.renderDueDate()}
          {this.renderInstructions()}
          {this.renderCustomerSite()}
          {this.renderCoverage()}
        </ScrollView>
        {this.renderBottomView()}
      </View>
    );
  }
}

export default withStyles(WorkDetailComponentStyles, {
  themePropName: 'withStylesTheme',
})(withNamespaces()(WorkTicketDetailComponent));
