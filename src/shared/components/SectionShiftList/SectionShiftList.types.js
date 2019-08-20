import type { Shift } from '../../types/schedule.types';

export type SectionShiftListStyles = {
  title: any,
};

export type ShiftListComponentProps = {
  navigator: any,
  styles: SectionShiftListStyles,
  withStylesTheme: any,
  shifts: Shift[],
  exception: ?boolean,
  clockIn(shift: Shift): ?void,
  clockOut(shift: Shift): ?void,
  onShiftSelected(shift: Shift): void,
};
