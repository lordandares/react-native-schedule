import React from 'react';
import { UnassignedListComponentProps } from './UnassignedListComponent.types';
import ShiftListComponent from '../ShiftListComponent/ShiftListComponent';

const UnassignedListComponent = (props: UnassignedListComponentProps) => (
  <ShiftListComponent
    shifts={props.shifts}
  />
);

export default UnassignedListComponent;
