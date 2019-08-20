// @flow

export interface ITaskItemViewModel {
  getDisplayName: () => string,
  onPressItem: () => void,
  getSiteInfo: () => string,
  getTitle: () => string,
  getStatus: () => string,
}

export type TaskItemViewProps = {
  theme: any,
  styles: any,
  viewModel: ITaskItemViewModel,
};
