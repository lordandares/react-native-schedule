// @flow
import type { Item, Task } from '@next/schedule/types/task.types';
import Immutable from 'seamless-immutable';
import { debounce } from 'lodash';
import type { ITaskItemViewModel, ITaskItemActions } from '../TaskItem.types';
import { TaskStatus } from '../../../../shared/types/TaskRedux.types';

export class TaskItemController implements ITaskItemViewModel {
  item: Item;
  originalItem: Item;
  canEdit: boolean;
  taskItemActions: ITaskItemActions;

  constructor(item: Item, task: Task, taskItemActions: ITaskItemActions) {
    this.originalItem = item;
    this.item = Immutable.asMutable(this.originalItem, { deep: true });
    this.taskItemActions = taskItemActions;
    this.canEdit = task.status !== TaskStatus.Complete;

    // only needed because timing of interaction between notes-onblur and rating tap
    this.save = debounce(this.save, 5);
  }

  isItemChanged = () => {
    const ratingChanged = (!this.originalItem.rating && this.item.rating) ||
      (this.originalItem.rating && this.item.rating &&
      this.originalItem.rating.value !== this.item.rating.value);

    const notesChanged = this.originalItem.notes !== this.item.notes;

    return notesChanged || ratingChanged;
  };

  save = () => {
    const doUpdate = this.isItemChanged();
    if (doUpdate) {
      this.taskItemActions.setItem(this.item);
      this.taskItemActions.saveItem();
    }
  };

  setRating = (rating: number) => {
    this.item.rating = {
      value: rating,
    };
  };

  setNotes = (notes: string) => {
    this.item.notes = notes;
  };
}
