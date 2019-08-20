// @flow
import type { AuthUser } from '@next/auth/types/auth.types';
import updateLocalShiftLists from './updateLocalShiftLists';
import type { Shift } from '../types/schedule.types';
import { GET_ASSIGNED_SHIFTS, GET_UNASSIGNED_SHIFTS, SET_SELECTED_SHIFT, SUCCESS_GET_SHIFTS } from './schedule';

const user: AuthUser = ({
  userId: '1',
}: any);
const shiftWithoutUser: Shift = {
  id: '0',
  users: [],
};
const shiftWithUser: Shift = {
  ...shiftWithoutUser,
  users: [
    {
      id: '1',
    },
  ],
};
const localSelectedShift: Shift = {
  id: '0',
  users: [
    {
      id: '1',
    },
  ],
};
const assigned: Shift[] = [
  {
    id: '123',
    users: [
      {
        id: '1',
      },
    ],
  },
  {
    id: '234',
    users: [
      {
        id: '1',
      },
    ],
  },
];
const unassigned: Shift[] = [
  {
    id: '456',
    users: [],
  },
  {
    id: '789',
    users: [],
  },
];

describe('updateLocalShiftLists', () => {
  it('should remove shift from assigned when user is removed', () => {
    const dispatch: Function = jest.fn();
    const withUser: Shift = { ...assigned[0] };
    const withoutUser: Shift = { ...assigned[0], users: [] };
    updateLocalShiftLists(
      [],
      assigned,
      unassigned,
      localSelectedShift,
      withoutUser,
      withUser,
      user,
      dispatch,
    );
    let expectedAssignedShifts = assigned.slice();
    expectedAssignedShifts = expectedAssignedShifts.filter(s => s.id !== '123');
    expect(dispatch).toHaveBeenCalledWith({ type: GET_ASSIGNED_SHIFTS, payload: expectedAssignedShifts });
  });
  it('should add shift to unassigned when user is removed', () => {
    const dispatch: Function = jest.fn();
    updateLocalShiftLists(
      [],
      assigned,
      unassigned,
      localSelectedShift,
      shiftWithoutUser,
      shiftWithUser,
      user,
      dispatch,
    );
    const expectedUnassignedShifts = unassigned.slice();
    expectedUnassignedShifts.push(shiftWithoutUser);
    expect(dispatch).toHaveBeenCalledWith({ type: GET_UNASSIGNED_SHIFTS, payload: expectedUnassignedShifts });
  });
  it('should add shift to assigned when user is added', () => {
    const dispatch: Function = jest.fn();
    updateLocalShiftLists(
      [],
      assigned,
      unassigned,
      localSelectedShift,
      shiftWithUser,
      shiftWithoutUser,
      user,
      dispatch,
    );
    const expectedAssignedShifts = assigned.slice();
    expectedAssignedShifts.push(shiftWithUser);
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: GET_ASSIGNED_SHIFTS, payload: expectedAssignedShifts });
  });
  it('should not add shift to assigned when user is added that is not the current user', () => {
    const dispatch: Function = jest.fn();
    const shiftWithDifferentUser: Shift = { id: '1', users: [{ id: '12321' }] };
    updateLocalShiftLists(
      [],
      assigned,
      unassigned,
      localSelectedShift,
      shiftWithDifferentUser,
      shiftWithoutUser,
      user,
      dispatch,
    );
    expect(dispatch).toHaveBeenNthCalledWith(2, { type: GET_ASSIGNED_SHIFTS, payload: assigned });
  });
  it('should remove shift from unassigned when user is added', () => {
    const dispatch: Function = jest.fn();
    const withUser: Shift = { ...unassigned[0], users: [{ id: '1' }] };
    const withoutUser: Shift = { ...unassigned[0] };
    updateLocalShiftLists(
      [],
      assigned,
      unassigned,
      localSelectedShift,
      withUser,
      withoutUser,
      user,
      dispatch,
    );
    let expectedUnassignedShifts = unassigned.slice();
    expectedUnassignedShifts = expectedUnassignedShifts.filter(s => s.id !== '456');
    expect(dispatch).toHaveBeenCalledWith({ type: GET_UNASSIGNED_SHIFTS, payload: expectedUnassignedShifts });
  });
  it('should replace shift with updated shift in shifts list', () => {
    const dispatch: Function = jest.fn();
    const shifts: Shift[] = [{ id: '9', siteName: 'yo', users: [] }];
    const newShift: Shift = { ...shifts[0], siteName: 'yo yo' };
    updateLocalShiftLists(
      shifts,
      [],
      [],
      localSelectedShift,
      newShift,
      shifts[0],
      user,
      dispatch,
    );
    expect(dispatch).toHaveBeenNthCalledWith(3, { type: SUCCESS_GET_SHIFTS, payload: [newShift] });
  });
  it('should update currently selected shift in state', () => {
    const dispatch: Function = jest.fn();
    const before: Shift = { ...shiftWithUser, _etag: '1' };
    const after: Shift = { ...shiftWithUser, _etag: '2' };
    updateLocalShiftLists(
      [],
      [],
      [],
      localSelectedShift,
      after,
      before,
      user,
      dispatch,
    );
    expect(dispatch).toHaveBeenNthCalledWith(4, { type: SET_SELECTED_SHIFT, payload: after });
  });
});
