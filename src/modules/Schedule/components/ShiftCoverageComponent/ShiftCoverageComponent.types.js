import type { ScheduleState, ShiftState } from '../../../../shared/types/reduxState.types';
import type { User } from '../../../../shared/types/schedule.types';

export type ShiftCoverageComponentStyles = {};

export type ShiftCoverageComponentProps = {
  scheduleState: ScheduleState,
  shiftState: ShiftState,
  styles: ShiftCoverageComponentStyles,
};

export type ShiftCoverageComponentState = {
  selectedUsers: User[],
  mounted: boolean,
};
