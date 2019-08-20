// @flow
import { debounce } from 'lodash';
import Immutable from 'seamless-immutable';
import type { Task, Area, Item } from '@next/schedule/types/task.types';
import type { ITaskAreaActions, ITaskAreaViewModel } from '../TaskArea.types';
import { TaskStatus } from '../TaskArea.types';
import { SCREEN_TASK_ITEM } from '../../../../shared/constants/screens';

export class TaskAreaController implements ITaskAreaViewModel {
  area: Area;
  originalArea: Area;
  task: Task;
  canEdit: boolean;
  navComponentId: string;
  navigation: any;
  actionCreators: ITaskAreaActions;

  constructor(area: Area, task: Task, actionCreators: ITaskAreaActions, Navigation: any, navComponentId: string) {
    this.saveArea = debounce(this.saveArea, 10);

    this.originalArea = area;
    this.area = Immutable.asMutable(this.originalArea, { deep: true });
    this.task = task;
    this.navigation = Navigation;
    this.navComponentId = navComponentId;
    this.actionCreators = actionCreators;

    this.canEdit = this.task.status !== TaskStatus.Complete;
  }

  getItems = () => this.originalArea.items || [];

  saveArea = () => {
    this.actionCreators.requestUpdateTaskArea(this.area);
  };

  setItem = (item: Item) => {
    const index = this.area.items.findIndex(i => i.id === item.id);
    this.area.items[index] = item;
  };

  rateItem = (item: Item, ratingValue: number): void => {
    const mutableItem = Immutable.asMutable(item);
    mutableItem.rating = {
      value: ratingValue,
    };
    this.setItem(mutableItem);
  };

  onPressItem = (item: Item) => {
    this.navigation.push(this.navComponentId, {
      component: {
        name: SCREEN_TASK_ITEM,
        passProps: {
          item,
          setItem: this.setItem,
          saveItem: this.saveArea,
        },
      },
    });
  };
}
