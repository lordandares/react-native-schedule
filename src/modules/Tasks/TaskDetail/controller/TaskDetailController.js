// @flow
import type { Task, Area } from '@next/schedule/types/task.types';
import type { ITaskDetailActions, ITaskDetailViewModel } from '../TaskDetail.types';
import { SCREEN_TASK_AREA } from '../../../../shared/constants/screens';
import { TaskStatus } from '../TaskDetail.types';

export class TaskDetailController implements ITaskDetailViewModel {
  task: Task;
  navigation: any;
  navComponentId: string;
  taskActionCreators: ITaskDetailActions;

  constructor(task: Task, taskActionCreators: ITaskDetailActions, navigation: any, navComponentId: string) {
    this.task = task;
    this.navigation = navigation;
    this.navComponentId = navComponentId;
    this.taskActionCreators = taskActionCreators;
    this.canEdit = task.status !== TaskStatus.Complete;
  }

  getAreas = (): Area[] => this.task.areas || [];

  submit = (): void => {
    this.taskActionCreators.requestCompleteTask(this.task);
    this.navigation.pop(this.navComponentId);
  };

  onPressArea = (area: Area): void => {
    this.taskActionCreators.setSelectedAreaId(area.id);
    this.navigation.push(this.navComponentId, {
      component: {
        name: SCREEN_TASK_AREA,
      },
    });
  };

  canEdit: boolean;
}
