// @flow
import type { Site, User } from '../../../shared/types/schedule.types';
import { SCREEN_SITE_LIST, SCREEN_COVERAGE_LIST } from '../../../shared/constants/screens';
import type { ICreateTaskNavigation } from './CreateTask.types';
import type { ICoverageListParams } from '../../../shared/components/CoverageList/CoverageList.types';
import i18n from '../../../shared/i18n/i18next';
import TASKS_COMPONENT from '../constants/TasksConstants';

class CreateTaskNavigation implements ICreateTaskNavigation {
  navigator: any; // :( typescript
  componentId: string;
  coverageParams: ICoverageListParams;

  constructor(navigator: any, componentId: string, coverageParams: ICoverageListParams) {
    this.navigator = navigator;
    this.componentId = componentId;
    this.coverageParams = coverageParams;
  }

  navigateToCoverageList = (onUserSelected: (user: User) => void) => {
    const { selectLoading, selectUsers, requestUsers } = this.coverageParams;
    this.navigator.push(this.componentId, {
      component: {
        name: SCREEN_COVERAGE_LIST,
        passProps: {
          selectLoading,
          selectUsers,
          requestUsers,
          onUserSelected,
        },
        options: {
          topBar: {
            title: { text: i18n.translate(TASKS_COMPONENT.TASK_COVERAGE) },
          },
        },
      },
    });
  };

  navigateToSiteList = (callback: (site: Site) => void) => {
    this.navigator.push(this.componentId, {
      component: {
        name: SCREEN_SITE_LIST,
        passProps: { callback },
        options: {
          topBar: {
            title: { text: i18n.translate(TASKS_COMPONENT.SITES) },
          },
        },
      },
    });
  };

  navigateBack = () => {
    this.navigator.pop(this.componentId);
  };
}

export default CreateTaskNavigation;
