import type { Shift } from '../../../../shared/types/schedule.types';

export type ShiftListComponentStyles = {
  container: any,
  flex: any,
  subHeader: any,
  subHeaderText: any,
  scrollContainer: any,
}

export type ShiftListComponentProps = {
  navigator: any,
  styles: ShiftListComponentStyles,
  withStylesTheme: any,
  shifts: Shift[],
  clockIn(): ?void,
  clockOut(): ?void,
  onShiftSelected(shift: Shift): void,
}
