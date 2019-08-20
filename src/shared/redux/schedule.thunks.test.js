import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment-timezone';
import ErrorHandlerRedux from '@next/schedule/lib/redux/ErrorHandlerRedux';

import {
  REQUEST_GET_SITES, GET_SITES, ERROR_GET_SITES, REQUEST_UPDATE_REPEATING_SHIFT,
  SUCCESS_UPDATE_SHIFT,
} from './schedule';
import { getSites, updateRepeatingShift, filterPastOfferedShifts } from './schedule.thunks';
import updateLocalShiftLists from './updateLocalShiftLists';

jest.mock('./updateLocalShiftLists.js');
updateLocalShiftLists.mockImplementation(() => 42);

const scheduleService = {
  getSites: jest.fn(),
};
const middlewares = [thunk.withExtraArgument({ scheduleService })];
const mockStore = configureMockStore(middlewares);

const tenantId = '123-fake-tenant';
const error = new Error('err');

describe('schedule redux test', () => {
  let store;
  beforeEach(() => {
    jest.resetAllMocks();
    store = mockStore({
      schedule: {
        sites: [],
        // shift: {},
        shifts: {},
        unassignedShifts: {},
        assignedShifts: {},
        selectedShift: {},
      },
      auth: { user: { companyId: tenantId } },
    });
  });

  describe('getSites', () => {
    it('should get sites', async () => {
      // Prep
      const sites = [{ id: 'somefakesite' }];
      scheduleService.getSites = jest.fn(() => sites);
      const expectedActions = [
        { type: REQUEST_GET_SITES },
        { type: GET_SITES, payload: sites },
      ];

      // Run
      await store.dispatch(getSites());

      // Expect
      expect(store.getActions()).toEqual(expectedActions);
      expect(scheduleService.getSites).toHaveBeenCalledTimes(1);
      expect(scheduleService.getSites).toHaveBeenCalledWith(tenantId);
    });

    it('should throw on error', async () => {
      // Prep
      scheduleService.getSites = jest.fn(() => { throw error; });
      const expectedActions = [
        { type: REQUEST_GET_SITES },
        { type: ERROR_GET_SITES, error },
        ErrorHandlerRedux.addError('Failed to load sites list. Please try again.', error),
      ];

      // Run
      await store.dispatch(getSites());

      // Expect
      expect(store.getActions()).toEqual(expectedActions);
      expect(scheduleService.getSites).toHaveBeenCalledTimes(1);
      expect(scheduleService.getSites).toHaveBeenCalledWith(tenantId);
    });
  });

  describe('updateRepeatingShift', () => {
    it('should call updateLocalShiftLists correctly', async () => {
      // Prep
      const shift = {
        id: 'someid', siteTimeZone: 'UTC', start: '2018-12-17T21:55:26.488Z', end: '2018-12-17T21:55:26.488Z',
      };
      const updateReq = { shift };
      scheduleService.updateRepeatingShift = jest.fn(() => ({ shifts: [{ shift }] }));
      const expectedActions = [
        { type: REQUEST_UPDATE_REPEATING_SHIFT },
        { type: SUCCESS_UPDATE_SHIFT, prevShift: undefined },
      ];

      // Run
      await store.dispatch(updateRepeatingShift(updateReq));

      // Expect
      expect(store.getActions()).toContainEqual(expectedActions[0]);
      expect(store.getActions()).toContainEqual(expectedActions[1]);
      expect(updateLocalShiftLists).toHaveBeenCalledTimes(1);
      expect(updateLocalShiftLists.mock.calls[0][7] instanceof Function).toBeTruthy();
      expect(scheduleService.updateRepeatingShift).toHaveBeenCalledTimes(1);
    });
  });
});

describe('getOfferedShifts', () => {
  const shifts = [
    {
      id: 'past-shift',
      start: moment().add(-8, 'hours'),
      end: moment().add(-1, 'seconds'),
    },
    {
      id: 'active-shift',
      start: moment().add(-6, 'hours'),
      end: moment().add(1, 'hours'),
    },
    {
      id: 'future-shift',
      start: moment().add(2, 'hours'),
      end: moment().add(10, 'hours'),
    },
  ];
  it('should filter past offered shifts', () => {
    const offeredShifts = shifts.filter(filterPastOfferedShifts);
    expect(offeredShifts.length).toEqual(2);
  });
});

// describe('getUnassignedShifts', () => {
//   it('should change the timezone of the shift', async () => {
//     const listDispached = getUnassignedShifts(
//       moment('2018-03-05T12:00:00Z'),
//       moment('2018-03-05T12:00:00Z'),
//     );
//     const dispatch = jest.fn();
//     await listDispached(dispatch, getState);
//     // prettier-ignore
//     const eventDispached = dispatch.mock.calls.find(event =>
//       event[0].type === GET_UNASSIGNED_SHIFTS);
//     const shiftWithTimezone: Shift = eventDispached[0].payload.find((shift: Shift) => shift.id === '2');
//     expect(shiftWithTimezone.start.format()).toBe('2018-03-05T15:00:00-03:00');
//   });
//
//   it('should return utc datetime when the timezone is invalid', async () => {
//     const listDispached = getUnassignedShifts(
//       moment('2018-03-05T12:00:00Z'),
//       moment('2018-03-05T12:00:00Z'),
//     );
//     const dispatch = jest.fn();
//     await listDispached(dispatch, getState);
//     // prettier-ignore
//     const eventDispached = dispatch.mock.calls.find(event =>
//       event[0].type === GET_UNASSIGNED_SHIFTS);
//     const shiftWithTimezone: Shift = eventDispached[0].payload.find((shift: Shift) => shift.id === '1');
//     expect(shiftWithTimezone.start.utc().format()).toBe('2018-03-05T12:00:00Z');
//   });
// });
//
// describe('getAssignedShifts', () => {
//   it('should change the timezone of the shift', async () => {
//     const listDispached = getAssignedShifts(
//       moment('2018-03-05T12:00:00Z'),
//       moment('2018-03-05T12:00:00Z'),
//     );
//     const dispatch = jest.fn();
//     await listDispached(dispatch, getState);
//     const eventDispached = dispatch.mock.calls.find(event => event[0].type === GET_ASSIGNED_SHIFTS);
//     const shiftWithTimezone: Shift = eventDispached[0].payload.find((shift: Shift) => shift.id === '2');
//     expect(shiftWithTimezone.start.format()).toBe('2018-03-05T15:00:00-03:00');
//   });
//
//   it('should return utc datetime when the timezone is invalid', async () => {
//     const listDispached = getAssignedShifts(
//       moment('2018-03-05T12:00:00Z'),
//       moment('2018-03-05T12:00:00Z'),
//     );
//     const dispatch = jest.fn();
//     await listDispached(dispatch, getState);
//     const eventDispached = dispatch.mock.calls.find(event => event[0].type === GET_ASSIGNED_SHIFTS);
//     const shiftWithTimezone: Shift = eventDispached[0].payload.find((shift: Shift) => shift.id === '1');
//     expect(shiftWithTimezone.start.utc().format()).toBe('2018-03-05T12:00:00Z');
//   });
// });
//
// describe('reducer', () => {
//   const assignedShifts = [
//     {
//       id: 1,
//       users: [{}],
//       clockEvents: [],
//     },
//     {
//       id: 2,
//       users: [{}],
//       clockEvents: [],
//     },
//   ];
//   const unassignedShifts = [
//     {
//       id: 3,
//       users: [],
//       clockEvents: [],
//     },
//     {
//       id: 4,
//       users: [],
//       clockEvents: [],
//     },
//   ];
//   const initialState: ScheduleState = {
//     unassignedShifts,
//     assignedShifts,
//     shifts: [],
//   };
//
//   it(
//     'should change the shift from unassignedShifts ' +
//       'to assignedShifts if the shift change to assinged',
//     () => {
//       const action = {
//         type: SUCCESS_UPDATE_SHIFT,
//         payload: {
//           id: 3,
//           users: [
//             {
//               id: 'user',
//             },
//           ],
//         },
//       };
//       const newState: ScheduleState = reducer(initialState, action);
//       expect(newState.assignedShifts.length).toBe(3);
//       expect(newState.unassignedShifts.length).toBe(1);
//     },
//   );
//
//   it(
//     'should change the shift from assignedShifts to ' +
//       ' unassignedShifts if the shift change to assinged',
//     () => {
//       const action = {
//         type: SUCCESS_UPDATE_SHIFT,
//         payload: {
//           id: 1,
//           users: [],
//         },
//       };
//       const newState: ScheduleState = reducer(initialState, action);
//       expect(newState.assignedShifts.length).toBe(1);
//       expect(newState.unassignedShifts.length).toBe(3);
//     },
//   );
//
//   it('should keep the shift in assignedShifts if the shift is updated', () => {
//     const action = {
//       type: SUCCESS_UPDATE_SHIFT,
//       payload: {
//         id: 1,
//         users: [{}],
//         instructions: 'test',
//       },
//     };
//     const newState: ScheduleState = reducer(initialState, action);
//     expect(newState.assignedShifts.length).toBe(2);
//     expect(newState.unassignedShifts.length).toBe(2);
//     const newShift = newState.assignedShifts.find(shift => shift.id === 1);
//     expect(newShift.instructions).toBe('test');
//   });
//   it('should keep the shift in unassignedShifts if the shift is updated', () => {
//     const action = {
//       type: SUCCESS_UPDATE_SHIFT,
//       payload: {
//         id: 3,
//         users: [],
//         instructions: 'test',
//       },
//     };
//     const newState: ScheduleState = reducer(initialState, action);
//     expect(newState.assignedShifts.length).toBe(2);
//     expect(newState.unassignedShifts.length).toBe(2);
//     const newShift = newState.unassignedShifts.find(shift => shift.id === 3);
//     expect(newShift.instructions).toBe('test');
//   });
//   it('should update a shifts clock events', () => {
//     const action = {
//       type: SUCCESS_UPDATE_SHIFT_CLOCK_EVENT,
//       payload: {
//         id: 1,
//         shiftId: 1,
//         eventTime: new Date('2018-03-05T12:00:00Z'),
//         eventType: 'clockin',
//         userId: 'user',
//       },
//     };
//     expect(initialState.assignedShifts.find(shift => shift.id === 1).clockEvents.length).toEqual(0);
//     const newState: ScheduleState = reducer(initialState, action);
//     const newShift = newState.assignedShifts.find(shift => shift.id === 1);
//     expect(newShift.clockEvents.length).toBeGreaterThan(0);
//   });
//   it('should not update state if shift is not found among assigned shifts', () => {
//     const action = {
//       type: SUCCESS_UPDATE_SHIFT_CLOCK_EVENT,
//       payload: {
//         id: 1,
//         shiftId: 3,
//         eventTime: new Date('2018-03-05T12:00:00Z'),
//         eventType: 'clockin',
//         userId: 'user',
//       },
//     };
//     const newState: ScheduleState = reducer(initialState, action);
//     expect(newState).toEqual(initialState);
//   });
// });
