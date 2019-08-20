// @flow
import { call } from 'redux-saga/effects';
import { updateWorkTicket } from './WorkTicketSaga';

jest.mock('react-native-snackbar', () => ({ show: () => undefined }));

describe('WorkTicketSaga', () => {
  describe('updateWorkTicket', () => {
    it('calls workticket service with request args', () => {
      const workService = { updateWorkTicket: jest.fn() };
      const generator = updateWorkTicket(workService, { workTicket: { id: '123' } });
      const serviceCall = generator.next().value;
      expect(serviceCall).toEqual(call(workService.updateWorkTicket, '123', { id: '123' }));
    });
  });
});
