import type { Shift } from '../../../../../shared/types/reduxState.types';

export type ClockInOutEditComponentStyles = {
  wrapper: any,
  scrollViewWrapper: any,
  separateItem: any,
  containerItem: any,
  text: any,
  eventTimeText: any,
};

export type ClockInOutEditComponentProps = {
  shift: Shift,
  styles: ClockInOutEditComponentStyles,
};
