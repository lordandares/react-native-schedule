import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import type { WorkTicket } from '@next/schedule/types/workTicket.types';
import { WorkTicketState } from '../types/WorkTicketRedux.types';

const { Types, Creators } = createActions({
  requestWorkTickets: ['fromDate', 'toDate', 'status'],
  successWorkTickets: ['workTickets'],
  errorRequestWorkTickets: ['error'],
  requestUpdateWorkTicket: ['workTicket'],
  successUpdateWorkTicket: ['workTicket'],
  errorUpdateWorkTicket: ['error'],
  setSelectedWorkTicket: ['selectedWorkTicket'],
});

export const WorkTicketTypes = Types;
export default Creators;

const INITIAL_STATE: WorkTicketState = Immutable.from({
  workTickets: null,
  selectedWorkTicket: null,
  loading: false,
  error: null,
});

// ------------------------ reducer functions
const onGetRequest = state => state.merge({ loading: true, error: null });

const onGetSuccess = (state, { workTickets }) => state.merge({ loading: false, error: null, workTickets });

const onUpdateRequest = state => state.merge({ loading: true, error: null });

const onUpdateSuccess = (state, { workTicket }) => {
  const workList = Immutable.asMutable(state.workTickets);
  for (let i = 0; i < workList.length; i += 1) {
    if (workList[i].id === workTicket.id) {
      workList[i] = { ...workTicket };
    }
  }
  return state.merge({
    loading: false,
    error: null,
    selectedWorkTicket: workTicket,
    workTickets: workList,
  });
};

const onFailure = (state, { error }) => state.merge({ loading: false, error: String(error) });

const onSetWorkTicket = (state, { selectedWorkTicket }) => state.merge({ selectedWorkTicket });

// ------------------------ bind reducers to actions
export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_WORK_TICKETS]: onGetRequest,
  [Types.SUCCESS_WORK_TICKETS]: onGetSuccess,
  [Types.ERROR_REQUEST_WORK_TICKETS]: onFailure,
  [Types.REQUEST_UPDATE_WORK_TICKET]: onUpdateRequest,
  [Types.SUCCESS_UPDATE_WORK_TICKET]: onUpdateSuccess,
  [Types.ERROR_UPDATE_WORK_TICKET]: onFailure,
  [Types.SET_SELECTED_WORK_TICKET]: onSetWorkTicket,
});

// ------------------------ selectors
export const selectLoading = ({ workTicket }): boolean => workTicket.loading;
export const selectWorkTickets = ({ workTicket }): WorkTicket[] => workTicket.workTickets;
export const selectWorkTicket = ({ workTicket }): WorkTicket => workTicket.selectedWorkTicket;
