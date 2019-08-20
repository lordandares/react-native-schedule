import type { Task, Item, Rating } from '@next/schedule/types/task.types';

export type TaskItemContainerProps = {
  stateItem: Item,
  task: Task,
  requestUpdateTaskItem: (item: Item) => void,
}

export interface ITaskItemActions {
  setItem: (item: Item) => void;
  saveItem: () => void;
}

export interface ITaskItemViewModel {
  save(): void;
  setNotes(notes: string): void;
  setRating(rating: Rating): void;
  item: Item;
  canEdit: boolean;
}

export type TaskItemProps = {
  styles: any,
  viewModel: ITaskItemViewModel,
}
