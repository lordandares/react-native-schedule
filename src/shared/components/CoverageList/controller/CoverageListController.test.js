// @flow
import { CoverageListController } from './CoverageListController';

const loading = false;
const users = [{ firstName: 'one' }, { firstName: 'two' }, { firstName: 'three' }];
const getUsers = jest.fn();
const onUserSelected = jest.fn();
const navigateBack = jest.fn();

jest.useFakeTimers();

describe('CoverageListController', () => {
  describe('setFilter', () => {
    it('filters users', () => {
      const controller = new CoverageListController(loading, (users: any), getUsers, onUserSelected, navigateBack);

      controller.setFilter('one', ({ forceUpdate: jest.fn() }: any));

      jest.runAllTimers();

      expect(controller.filteredUsers).toHaveLength(1);
      expect(controller.filteredUsers[0]).toBe(users[0]);
    });
  });
});
