// @flow
import { TaskDetailController } from './TaskDetailController';
import { TaskStatus } from '../TaskDetail.types';

const actionCreators = {
  requestTasks: jest.fn(),
  successTasks: jest.fn(),
  errorRequestTasks: jest.fn(),
  requestUpdateTask: jest.fn(),
  successUpdateTask: jest.fn(),
  errorUpdateTask: jest.fn(),
  setSelectedTask: jest.fn(),
  setSelectedArea: jest.fn(),
  requestCompleteTask: jest.fn(),
  setSelectedAreaId: jest.fn(),
};

describe('TaskDetailController', () => {
  describe('getAreas', () => {
    it('returns areas when present in task', () => {
      const task = { areas: [{ id: 'area', title: 'title' }] };
      const controller = new TaskDetailController(task, actionCreators, () => undefined, 'componentId');

      const actualAreas = controller.getAreas();

      expect(actualAreas).toBe(task.areas);
    });

    it('returns empty array when task.areas is undefined', () => {
      const task = { areas: undefined };
      const controller = new TaskDetailController(task, actionCreators, () => undefined, 'componentId');

      const actualAreas = controller.getAreas();

      expect(actualAreas).toHaveLength(0);
    });

    it('returns empty array when task.areas is null', () => {
      const task = { areas: null };
      const controller = new TaskDetailController(task, actionCreators, () => undefined, 'componentId');

      const actualAreas = controller.getAreas();

      expect(actualAreas).toHaveLength(0);
    });

    it('can edit is true when task is anything other than complete', () => {
      const task = { areas: null, status: TaskStatus.Pending };
      const controller = new TaskDetailController(task, actionCreators, () => undefined, 'componentId');

      const { canEdit } = controller;

      expect(canEdit).toBe(true);
    });

    it('can edit is false when task is complete', () => {
      const task = { areas: null, status: TaskStatus.Complete };
      const controller = new TaskDetailController(task, actionCreators, () => undefined, 'componentId');

      const { canEdit } = controller;

      expect(canEdit).toBe(false);
    });
  });
});
