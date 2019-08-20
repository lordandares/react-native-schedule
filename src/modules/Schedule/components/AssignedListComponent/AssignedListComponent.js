import React from 'react';
import { AssignedListComponentProps } from './AssignedListComponent.types';
import ShiftListComponent from '../ShiftListComponent/ShiftListComponent';

const AssignedListComponent = (props: AssignedListComponentProps) => (
  <ShiftListComponent
    shifts={props.shifts}
    clockIn={props.clockIn}
    clockOut={props.clockOut}
  />
);

export default AssignedListComponent;
