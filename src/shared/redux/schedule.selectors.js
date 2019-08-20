import type { ScheduleState } from '../types/reduxState.types';
import type { Shift } from '../types/schedule.types';

export const selectUnassignedShifts = ({ schedule }: { schedule: ScheduleState }): Shift[] => schedule.unassignedShifts;

export const selectAssignedShifts = ({ schedule }: { schedule: ScheduleState }): Shift[] => schedule.assignedShifts;

export const selectShifts = ({ schedule }: { schedule: ScheduleState }): Shift[] => schedule.shifts;

export const selectSelectedShift = ({ schedule }: { schedule: ScheduleState }): Shift[] => schedule.selectedShift;
