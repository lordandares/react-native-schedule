import type { ScheduleState } from '../../../../shared/types/reduxState.types';
import type { Shift } from '../../../../shared/types/schedule.types';

export type ScheduleComponentProps = {
  navigator: any,
  styles: any,
  withStylesTheme: any,
  getUnassignedShifts(): void,
  getAssignedShifts(): void,
  getUsers(): void,
  getExceptions(): void,
  scheduleState: ScheduleState,
  setSelectedShift(shift: Shift): void,
  selectTab(selectedTabIndex: number): void,
  reselectTab(selectedTabIndex: number): void,
  setNavigator(navigator: any): void,
  showRefreshingIndicator(): void,
  hideRefreshingIndicator(): void,
};
