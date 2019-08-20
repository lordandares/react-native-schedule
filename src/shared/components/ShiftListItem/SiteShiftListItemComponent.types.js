import type { Shift } from '../../types/schedule.types';

export type SiteShiftListItemComponentTypes = {
  shift: Shift,
  styles: any,
  onPressItem(shift: Shift): void,
  theme: {
    palette: {
      warning: string
    }
  }
};
