import type { ScheduleState } from '../../../../shared/types/reduxState.types';

export type ShiftInstructionsComponentStyles = {};

export type ShiftInstructionsComponentProps = {
  scheduleState: ScheduleState,
  styles: ShiftInstructionsComponentStyles,
  selectTab(selectedTabIndex: number): void,
  reselectTab(selectedTabIndex: number): void,
  setNavigator(navigator: any): void,
};

export type ShiftInstructionsComponentState = {
  instructions: string,
};
