// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { withNamespaces } from 'react-i18next';

import WorkComponentStyles from './WorkComponent.styles';
import Tabs from '../../../shared/components/Tabs/TabsComponent';
import WorkTicketListContainer from '../WorkListComponent/ListContainers/WorkTicketListContainer';
import TaskListContainer from '../WorkListComponent/ListContainers/TaskListContainer';
import theme from '../../../shared/theme';
import { withStyles } from '../../../shared/withStyles';
import { getAppBarStyle } from '../../../shared/navigation/getAppBarStyle';
import { APP_TABS, WORK_TABS } from '../../../shared/constants/tabs';
import { getAppBarButton } from '../../../shared/navigation/getAppBarButton';
import { SCREEN_CREATE_TASK } from '../../../shared/constants/screens';
import COMMON from '../../../shared/constants/common';
import WORK_COMPONENT from '../constants/WorkConstants';

class WorkComponent extends Component<Object> {
  static options = getAppBarStyle(theme);

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  componentDidMount() {
    this.setupAppBarButtons();
  }

  componentDidUpdate(prevProps) {
    if (this.props.createInspectionsEnabled !== prevProps.createInspectionsEnabled) {
      this.setupAppBarButtons();
    }
  }

  setupAppBarButtons(): void {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        rightButtons: this.props.createInspectionsEnabled ? [getAppBarButton('add', 'add', 'add')] : [],
      },
    });
  }

  navigationButtonPressed(event) {
    const { t: translate } = this.props;
    if (event.buttonId === 'add') {
      Navigation.push(this.props.componentId, {
        component: {
          name: SCREEN_CREATE_TASK,
          options: {
            topBar: {
              title: {
                text: translate(WORK_COMPONENT.CREATE_TASK),
              },
              backButton: {
                title: translate(COMMON.CANCEL),
              },
            },
          },
        },
      });
    }
  }

  handleSetActiveTab = (index) => {
    this.props.changeInnerTab(APP_TABS.WORK, index);
  };

  render() {
    const { styles, activeInnerTab } = this.props;
    return (
      <View style={styles.container}>
        <Tabs setActiveTab={this.handleSetActiveTab} activeTab={activeInnerTab}>
          <View tab={WORK_TABS.TASKS}>{<TaskListContainer navigableComponentId={this.props.componentId} />}</View>
          <View tab={WORK_TABS.WORK_TICKETS}>
            {<WorkTicketListContainer navigableComponentId={this.props.componentId} />}
          </View>
        </Tabs>
      </View>
    );
  }
}

export default withStyles(WorkComponentStyles, { themePropName: 'withStylesTheme' })(withNamespaces()(WorkComponent));
