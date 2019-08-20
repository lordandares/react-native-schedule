import type { Shift } from '../../../../shared/types/schedule.types';

export type AssignedListComponentProps = {
  shifts: Shift[],
  clockIn(): ?void,
  clockOut(): ?void,
}
