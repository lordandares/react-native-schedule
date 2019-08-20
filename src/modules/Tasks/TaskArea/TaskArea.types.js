// @flow
import type { Item, Area } from '@next/schedule/types/task.types';

export interface ITaskAreaState {
  activeSections: number[];
}

export const TaskStatus = {
  Pending: 'Pending',
  Complete: 'Complete',
};

export interface ITaskAreaViewModel {
  onPressItem(): void;
  getItems(): Item[];
  rateItem(item: Item, ratingValue: number): void;
  setItem(item: Item): void;
  saveArea(): void;
  canEdit: boolean;
  area: Area;
}

export type TaskAreaViewProps = {
  componentId: string,
  viewModel: ITaskAreaViewModel,
  styles: {
    sectionItem: Object,
    sectionItemText: Object,
    navIcon: Object,
    sectionHeaderText: Object,
    sectionHeader: Object,
    container: Object,
    itemDetail: Object,
    sectionView: Object,
    colorRating: Object,
  },
};

export interface ITaskAreaActions {
  requestUpdateTaskArea: (area: Area) => void;
}
