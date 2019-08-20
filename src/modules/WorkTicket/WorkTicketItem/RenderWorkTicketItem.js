// @flow
import React from 'react';
import type { WorkTicket } from '@next/schedule/types/workTicket.types';
import WorkTicketItemComponent from './WorkTicketItemComponent';

export const renderWorkTicketItem = (
  workItem: WorkTicket,
  navigableComponentId: string,
  setSelectedWorkTicket: (work: WorkTicket) => void,
) => (
  <WorkTicketItemComponent
    setSelectedWorkTicket={setSelectedWorkTicket}
    navigableComponentId={navigableComponentId}
    work={workItem}
  />
);
