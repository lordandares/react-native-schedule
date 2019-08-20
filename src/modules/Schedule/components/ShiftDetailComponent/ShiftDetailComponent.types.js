import type { ScheduleState, ShiftState } from '../../../../shared/types/reduxState.types';

export type ShiftDetailComponentStyles = {};

export type ShiftDetailComponentProps = {
  scheduleState: ScheduleState,
  shiftState: ShiftState,
  styles: ShiftDetailComponentStyles,
  selectTab(selectedTabIndex: number): void,
  reselectTab(selectedTabIndex: number): void,
  setNavigator(navigator: any): void,
};
