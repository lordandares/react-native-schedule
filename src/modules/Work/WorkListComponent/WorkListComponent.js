// @flow
import React, { Component } from 'react';
import { SectionList, Text } from 'react-native';
import { groupBy, map, orderBy } from 'lodash';
import moment from 'moment-timezone';

import type { WorkTicket } from '@next/schedule/types/workTicket.types';
import type { Task } from '@next/schedule/types/task.types';
import workListComponentStyles from './WorkListComponent.styles';
import { WorkListComponentProps } from './WorkListComponent.types';
import { withStyles } from '../../../shared/withStyles';
import NothingToSeeHereMessage from '../../../shared/components/NothingToSeeHereMessage/NothingToSeeHereMessage';

class WorkListComponent extends Component<WorkListComponentProps> {
  componentWillMount() {
    this.getData();
  }

  getData() {
    const today = moment().startOf('d');
    const endOfMonth = moment().endOf('month');
    this.props.requestWorkItems(today, endOfMonth);
  }

  sectionItems = (works: any[]) => {
    let listGroupBy = [];
    const workItems = works || [];

    listGroupBy = groupBy(workItems, work => work.dueDate);

    const sections = map(listGroupBy, (group, key) => ({
      title: key,
      data: group,
    }));

    if (sections.length === 0) {
      sections.push({
        title: moment().format('YYYY-MM-DD'),
        data: [{ key: 'NothingToSeeHere' }],
      });
    }

    return sections;
  };

  sortItems = (work: WorkTicket | Task): WorkTicket[] | Task[] =>
    orderBy(work, ['dueDate', 'site.siteName'], ['asc', 'asc'])

  renderTitle = (titleStyles: any, title: string) => {
    const { shortDateFormat } = this.props.tenant;
    return (
      <Text style={titleStyles}>
        {moment(title)
        .format(`ddd, ${shortDateFormat}`)
        .toUpperCase()}
      </Text>);
  }

  renderItem = (item: Task | WorkTicket) => {
    if (item.key === 'NothingToSeeHere') {
      return <NothingToSeeHereMessage />;
    }
    const {
      renderChild, navigableComponentId, setSelectedItem,
    } = this.props;
    return renderChild(item, navigableComponentId, setSelectedItem);
  };

  render() {
    const { workItems, loading } = this.props;
    const sortedWorkItems = this.sortItems(workItems);
    const itemSections = this.sectionItems(sortedWorkItems);

    return (
      <SectionList
        renderSectionHeader={({ section }) => this.renderTitle(this.props.styles.title, section.title)}
        keyExtractor={item => item.id}
        sections={itemSections}
        renderItem={({ item }) => this.renderItem(item)}
        refreshing={loading}
        onRefresh={() => this.getData()}
        stickySectionHeadersEnabled={false}
      />
    );
  }
}

export default withStyles(workListComponentStyles)(WorkListComponent);
