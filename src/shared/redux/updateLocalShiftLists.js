// @flow

import type { AuthUser } from '@next/auth/types/auth.types';
import _ from 'lodash';
import shiftSortAscending from '../utils/shift/shiftSortAscending';
import { GET_ASSIGNED_SHIFTS, GET_UNASSIGNED_SHIFTS, setSelectedShift, successGetShifts } from './schedule';
import type { Shift } from '../types/schedule.types';

function removeShiftFromList(unassignedShifts, assignedShifts, idToRemove) {
  const unassignedShiftIndex = _.findIndex(unassignedShifts, ['id', idToRemove]);
  const assignedShiftIndex = _.findIndex(assignedShifts, ['id', idToRemove]);
  if (unassignedShiftIndex > -1) {
    unassignedShifts.splice(unassignedShiftIndex, 1);
  } else if (assignedShiftIndex > -1) {
    assignedShifts.splice(assignedShiftIndex, 1);
  }
  return { unassignedShifts, assignedShifts };
}

// TODO: This was copy pasted from our reducer and modified to work, we should rewrite this out into separate sagas
export default function updateLocalShiftLists(
  shifts: Shift[],
  assignedShifts: Shift[],
  unassignedShifts: Shift[],
  selectedShift: Shift,
  newShift: Shift,
  prevShift: Shift,
  currentUser: AuthUser,
  dispatch: Function,
): void {
  const unassigned = unassignedShifts.slice();
  const assigned = assignedShifts.slice();
  const defaultList = shifts.slice();

  let { unassignedShifts: newUnassignedShifts, assignedShifts: newAssignedShifts } = removeShiftFromList(
    unassigned,
    assigned,
    prevShift.id,
  );
  if (newShift.users.length === 0) {
    // Remove shift from assignedShifts and add it to unassignedShifts
    // if new shift is unassigned and previous shift was assigned
    newUnassignedShifts = [...newUnassignedShifts, newShift];
  } else if (newShift.users.length > 0 &&
    newShift.users.some(user => user.id === currentUser.userId)) {
    // Add shift to assignedShifts
    // if new shift is assigned and previous shift was assigned
    newAssignedShifts = [...newAssignedShifts, newShift];
  }
  newUnassignedShifts.sort(shiftSortAscending);
  newAssignedShifts.sort(shiftSortAscending);
  dispatch({ type: GET_UNASSIGNED_SHIFTS, payload: newUnassignedShifts });
  dispatch({ type: GET_ASSIGNED_SHIFTS, payload: newAssignedShifts });

  let shiftIndex = -1;
  if (prevShift) {
    shiftIndex = defaultList.findIndex(shift => shift.id === prevShift.id);
    if (shiftIndex !== -1) {
      defaultList[shiftIndex] = newShift;
    }
  }
  dispatch(successGetShifts(defaultList));

  if (newShift.id === selectedShift.id) {
    dispatch(setSelectedShift(newShift));
  }
}
