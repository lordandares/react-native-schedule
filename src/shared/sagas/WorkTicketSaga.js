// @flow
import { Saga } from 'redux-saga';
import type {
  WorkTicket,
  IWorkService,
} from '@next/schedule/types/workTicket.types';
import { put, call } from 'redux-saga/effects';
import WorkTicketActions from '../redux/workTicket';

export function* getWorkTickets(workService: IWorkService, { fromDate, toDate, status }:any): Saga<WorkTicket> {
  try {
    const workTickets: WorkTicket[] = yield call(
      workService.getWorkTickets,
      fromDate,
      toDate,
      status,
    );
    yield put(WorkTicketActions.successWorkTickets(workTickets));
  } catch (err) {
    yield put(WorkTicketActions.errorRequestWorkTickets(err.message || err));
  }
}

export function* updateWorkTicket(workService: IWorkService, { workTicket }: any) : Saga<WorkTicket> {
  try {
    const ticket: WorkTicket = yield call(workService.updateWorkTicket, workTicket.id, workTicket);
    yield put(WorkTicketActions.successUpdateWorkTicket(ticket));
  } catch (err) {
    yield put(WorkTicketActions.errorUpdateWorkTicket(err.message || err));
  }
}
