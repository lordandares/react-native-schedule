// @flow
import { TaskAreaController } from './TaskAreaController';
import { TaskStatus } from '../TaskArea.types';

const actionCreators = {
  requestUpdateTaskItem: jest.fn(),
};

describe('TaskAreaController', () => {
  describe('getItems', () => {
    it('returns items when present in task', () => {
      const task = { areas: [{ id: 'area', title: 'title', items: [{ id: 'item-id', title: 'item' }] }] };
      const controller = new TaskAreaController(task.areas[0], task, actionCreators, () => undefined, 'componentId');

      const acutalItems = controller.getItems();

      expect(acutalItems).toBe(task.areas[0].items);
    });

    it('returns empty array when area.items is undefined', () => {
      const task = { areas: [{ items: undefined }] };
      const controller = new TaskAreaController(task.areas[0], task, actionCreators, () => undefined, 'componentId');

      const acutalItems = controller.getItems();

      expect(acutalItems).toHaveLength(0);
    });

    it('returns empty array when area.items is null', () => {
      const task = { areas: [{ items: null }] };
      const controller = new TaskAreaController(task.areas[0], task, actionCreators, () => undefined, 'componentId');

      const acutalItems = controller.getItems();

      expect(acutalItems).toHaveLength(0);
    });

    describe('can edit', () => {
      it('can edit is true when task is anything other than complete', () => {
        const task = {
          areas: [{ id: 'area', title: 'title', items: [{ id: 'item-id', title: 'item' }] }],
          status: TaskStatus.Pending,
        };
        const controller = new TaskAreaController(task.areas[0], task, actionCreators, () => undefined, 'componentId');

        const { canEdit } = controller;
        expect(canEdit).toBe(true);
      });

      it('can edit is false when task is complete', () => {
        const task = {
          areas: [{ id: 'area', title: 'title', items: [{ id: 'item-id', title: 'item' }] }],
          status: TaskStatus.Complete,
        };
        const controller = new TaskAreaController(task.areas[0], task, actionCreators, () => undefined, 'componentId');

        const { canEdit } = controller;
        expect(canEdit).toBe(false);
      });
    });
  });
});
