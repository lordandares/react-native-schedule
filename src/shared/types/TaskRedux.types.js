// @flow
import type { Task, Area, Item } from '@next/schedule/types/task.types';

export const TaskStatus = {
  Pending: 'Pending',
  Complete: 'Complete',
};

export type TaskState = {
  tasks: Task[],
  selectedTask: Task,
  selectedArea: Area,
  loading: boolean,
  error: false,
};

export interface ITaskActionCreators {
  requestTasks: (fromDate: Date, toDate: Date) => void;
  successTasks: (tasks: Task[]) => void;
  errorRequestTasks: (error: string | Object) => void;
  requestUpdateTask: (task: Task) => void;
  successUpdateTask: (task: Task) => void;
  errorUpdateTask: (error: string | Object) => void;
  setSelectedTaskId: (selectedTaskId: string) => void;
  setSelectedAreaId: (selectedAreaId: string) => void;
  requestCompleteTask: (task: Task) => void;
  requestUpdateTaskArea: (area: Area) => void;
  requestUpdateTaskItem: (item: Item) => void;
}
