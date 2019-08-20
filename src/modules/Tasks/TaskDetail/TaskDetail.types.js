// @flow
import { Area, Task } from '@next/schedule/types/task.types';

export const TaskStatus = {
  Pending: 'Pending',
  Complete: 'Complete',
};

export interface ITaskDetailViewModel {
  submit(): void;
  getAreas(): Array<Area>;
  onPressArea(area: Area): void;
  canEdit: boolean;
}

export type TaskDetailViewStyle = {
  container: any,
  sectionHeaderText: any,
  sectionHeader: any,
  sectionItem: any,
  sectionItemText: any,
  navIcon: any,
  submitButton: any,
  submitButtonText: any,
};

export type TaskDetailViewProps = {
  viewModel: ITaskDetailViewModel,
  styles: TaskDetailViewStyle,
};

export interface ITaskDetailActions {
  setSelectedAreaId: (selectedAreaId: string) => void;
  requestCompleteTask: (task: Task) => void;
}
