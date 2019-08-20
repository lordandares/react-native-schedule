// @flow
import type { Task } from '@next/schedule/types/task.types';

export interface ITaskTemplateDisplayProps {
  onNavIconTouched: () => void;
  taskTemplate: Task;
  styles: Object;
}
