import type { WorkTicket } from '@next/schedule/types/workTicket.types';

export type WorkListComponentStyles = {
  title: any,
};

export type WorkListComponentProps = {
  id: string,
  loading: boolean,
  workItems: WorkTicket[],
  navigableComponentId: string,
  requestWorkItems: (start: Date, end: Date)=> void,
};

