// @flow
import React, { Component } from 'react';
import moment from 'moment-timezone';
import { Navigation } from 'react-native-navigation';
import { View, Text } from 'react-native';
import workTicketStatusConstants from '@next/schedule/lib/constants/work';
import type { WorkTicket } from '@next/schedule/types/workTicket.types';

import workTicketItemComponentStyles from './WorkTicketItemComponent.style';
import { withStyles } from '../../../shared/withStyles';
import Avatar from '../../../shared/components/Avatar/Avatar';
import Touchable from '../../../shared/components/Touchable/Touchable';
import { SCREEN_WORK_DETAIL } from '../../../shared/constants/screens';

type Props = {
  work: WorkTicket,
  styles: any,
  theme: any,
  navigableComponentId: string,
  setSelectedWorkTicket: (work: WorkTicket) => void,
};

class WorkTicketItemComponent extends Component<Props> {
  onPressItem = () => {
    const { work, navigableComponentId } = this.props;
    const { shortDateFormat } = this.props.tenant;
    this.props.setSelectedWorkTicket(work);
    Navigation.push(navigableComponentId, {
      component: {
        name: SCREEN_WORK_DETAIL,
        options: {
          topBar: {
            title: { text: work.title },
            subtitle: {
              title: `Created on ${moment(work.created).format(`${shortDateFormat}, YYYY`)}` +
              ` by ${work.createdBy}`,
            },
          },
        },
      },
    });
  };

  getDisplayName = (work: WorkTicket) =>
    this.isAssigned(work) && `${work.users[0].firstName} ${work.users[0].lastName}`;

  isAssigned = (work: WorkTicket) => work && work.users && work.users.length > 0;

  renderAvatar = () => {
    const name = this.getDisplayName(this.props.work);
    return (
      <View>
        <View style={this.props.styles.avatarContainer}>
          <Avatar
            size={36}
            name={name}
            color={this.props.theme.palette.grey[400]}
            emptyColor={this.props.theme.palette.error.main}
          />
        </View>
      </View>
    );
  };

  renderName = () => {
    const {
      styles, work, work: { workTicketStatus },
    } = this.props;
    const { shortDateFormat } = this.props.tenant;
    if (workTicketStatus && workTicketStatus.status === workTicketStatusConstants.closed) {
      return (
        <View style={styles.closedContainer}>
          <Text id="closed-text" style={styles.statusTextClosed}>
            CLOSED
          </Text>
          <Text style={styles.closedCommonText}> by </Text>
          <Text style={styles.statusTextTitle}>{workTicketStatus.modifiedBy}</Text>
          <Text style={styles.closedCommonText}>
            on {moment(workTicketStatus.modified).format(`ddd ${shortDateFormat}`)}
          </Text>
        </View>
      );
    }

    return !this.isAssigned(work) ? (
      <Text id="unassigned-text" style={[styles.unassigned, styles.margin]}>
        Unassigned
      </Text>
    ) : (
      <Text id="assigned-text" numberOfLines={1} style={[styles.assigned, styles.margin]}>
        {this.getDisplayName(work)}
      </Text>
    );
  };

  renderSiteCustomer = () => {
    const { styles, work } = this.props;
    let value = '';
    if (work.site && work.site.siteName && work.customer && work.customer.customerName) {
      value = `${work.site.siteName} · ${work.customer.customerName}`;
    } else if (work.site && work.site.siteName) {
      value = work.site.siteName;
    } else if (work.customer && work.customer.customerName) {
      value = work.customer.customerName;
    }
    if (value) {
      return (
        <Text id="site-customer-text" numberOfLines={1} style={[styles.siteCustomerText, styles.margin]}>
          {value}
        </Text>
      );
    }
    return null;
  };

  render() {
    const { styles, work }: Props = this.props;

    return (
      <Touchable onPress={this.onPressItem} useForeground>
        <View style={styles.container}>
          {this.renderAvatar()}
          <View style={styles.textsContainer}>
            <Text id="title-text" numberOfLines={1} style={styles.title}>
              {work.title}
            </Text>
            {this.renderSiteCustomer()}
            {this.renderName()}
          </View>
        </View>
      </Touchable>
    );
  }
}

export default withStyles(workTicketItemComponentStyles)(WorkTicketItemComponent);
