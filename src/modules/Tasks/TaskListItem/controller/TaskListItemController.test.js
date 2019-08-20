// @flow
import { TaskListItemController } from './TaskListItemController';
import { SCREEN_TASK_DETAIL } from '../../../../shared/constants/screens';

const componentId = 'componentId';

const actionCreators = {
  errorRequestTasks: jest.fn(),
  errorUpdateTask: jest.fn(),
  requestTasks: jest.fn(),
  requestUpdateTask: jest.fn(),
  successUpdateTask: jest.fn(),
  successTasks: jest.fn(),
  setSelectedTaskId: jest.fn(),
  setSelectedAreaId: jest.fn(),
  requestCompleteTask: jest.fn(),
  requestUpdateTaskItem: jest.fn(),
};

const navigation = {
  push: jest.fn(),
};

const task = {
  id: 'taskId',
  tenantId: 'tenantId',
  title: 'Inspection',
  dueDate: '2019-03-07',
  areas: [{ id: '1', title: 'Fifty Sevent' }, { id: '1', title: 'Fifty Eight' }],
  siteName: 'OutOfSite',
  customerName: 'FarPoint',
  createdBy: 'joeldev@teamsoftware.com',
  created: '2019-03-07',
  type: 'Inspection',
  userName: 'Bob WeHadABabyItsABoy',
  status: 'Upcoming',
};

describe('TaskListItemController', () => {
  describe('getTitle', () => {
    it('returns task title', () => {
      const taskItemController = new TaskListItemController(task, componentId, actionCreators, navigation);

      expect(taskItemController.getTitle()).toBe(task.title);
    });
  });

  describe('getSiteInfo', () => {
    it('returns sitename alone when customerName undefined', () => {
      const taskInstance = Object.assign({}, task);
      taskInstance.customerName = undefined;
      const taskItemController = new TaskListItemController(taskInstance, componentId, actionCreators, navigation);

      expect(taskItemController.getSiteInfo()).toBe(taskInstance.siteName);
    });

    it('returns customerName alone when sitename undefined', () => {
      const taskInstance = Object.assign({}, task);
      taskInstance.siteName = undefined;
      const taskItemController = new TaskListItemController(taskInstance, componentId, actionCreators, navigation);

      expect(taskItemController.getSiteInfo()).toBe(taskInstance.customerName);
    });

    it('returns customerName and sitename when both available', () => {
      const taskInstance = Object.assign({}, task);
      const taskItemController = new TaskListItemController(taskInstance, componentId, actionCreators, navigation);
      const expectedValue = `${taskInstance.siteName} · ${taskInstance.customerName}`;

      expect(taskItemController.getSiteInfo()).toBe(expectedValue);
    });
  });

  describe('getDisplayName', () => {
    it('displays name', () => {
      const taskInstance = Object.assign({}, task);
      const taskItemController = new TaskListItemController(taskInstance, componentId, actionCreators, navigation);
      const expectedValue = taskInstance.userName;

      expect(taskItemController.getDisplayName()).toBe(expectedValue);
    });
  });

  describe('onPressItem', () => {
    it('calls navigation push function', () => {
      const taskItemController = new TaskListItemController(task, componentId, actionCreators, navigation);

      taskItemController.onPressItem();

      expect(navigation.push).toHaveBeenCalledWith(componentId, {
        component: {
          name: SCREEN_TASK_DETAIL,
        },
      });
    });
  });
});
