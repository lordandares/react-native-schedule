// @flow
import type { Task } from '@next/schedule/types/task.types';
import { SCREEN_TASK_DETAIL } from '../../../../shared/constants/screens';
import type { ITaskItemViewModel } from '../TaskListItem.types';
import type { ITaskActionCreators } from '../../../../shared/types/TaskRedux.types';

export class TaskListItemController implements ITaskItemViewModel {
  task: Task;
  taskActionCreators: ITaskActionCreators;
  navigableComponentId: string;
  navigation: any;

  constructor(task: Task, navigableComponentId: string, taskActionCreators: ITaskActionCreators, Navigation: any) {
    this.task = task;
    this.navigableComponentId = navigableComponentId;
    this.taskActionCreators = taskActionCreators;
    this.navigation = Navigation;
  }

  getSiteInfo = (): string => {
    const { siteName, customerName } = this.task;
    if (siteName && customerName) return `${siteName} · ${customerName}`;
    if (siteName) return siteName;
    return customerName;
  };

  getDisplayName = () => this.task.userName;

  getTitle = () => this.task.title;

  getStatus = () => this.task.status;

  onPressItem = () => {
    this.taskActionCreators.setSelectedTaskId(this.task.id);
    this.navigation.push(this.navigableComponentId, {
      component: {
        name: SCREEN_TASK_DETAIL,
      },
    });
  };
}
