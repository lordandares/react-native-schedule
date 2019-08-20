// @flow
import { put, call, select } from 'redux-saga/effects';
import { createTask, completeTask, updateTask } from './TaskSaga';
import TaskActions, { selectTasks } from '../redux/task';

const createTaskAction = {
  createTaskRequest: {
    title: 'I am a request',
  },
};

const newTask = {
  title: 'yo',
};

const taskService = { createTask: jest.fn().mockRejectedValue('broken'), updateTask: jest.fn() };

jest.mock('react-native-snackbar', () => ({ show: () => undefined }));

describe('TaskSaga', () => {
  describe('createTask', () => {
    it('calls task service with request args', () => {
      const generator = createTask(taskService, createTaskAction);

      const serviceCall = generator.next().value;

      expect(serviceCall).toEqual(call(taskService.createTask, createTaskAction.createTaskRequest));
    });

    it('selects tasks array from state', () => {
      const generator = createTask(taskService, createTaskAction);
      generator.next();

      const tasksSelect = generator.next().value;

      expect(tasksSelect).toEqual(select(selectTasks));
    });

    it('adds new task to tasks array', () => {
      const expectedTasksArray = [newTask];
      const generator = createTask(taskService, createTaskAction);
      generator.next();
      generator.next(newTask);

      const successAction = generator.next([]).value;

      expect(successAction).toEqual(put(TaskActions.successCreateTask(expectedTasksArray)));
    });

    it('puts error create task action', () => {
      const generator = createTask(taskService, createTaskAction);
      generator.next();
      generator.next(newTask);
      const expectedError = 'clonedTasks.push is not a function';

      const errorAction = generator.next('this is not an array').value;

      expect(errorAction).toEqual(put(TaskActions.errorCreateTask(expectedError)));
    });
  });
  describe('completeTask', () => {
    it('sets task status to complete', () => {
      const generator = completeTask(taskService, { task: {} });

      const putAction = generator.next().value;

      expect(putAction).toEqual(put(TaskActions.requestUpdateTask({ status: 'Complete' })));
    });
  });
  describe('updateTask', () => {
    it('calls TaskService.UpdateTask passing Task object', () => {
      const action = { task: { id: 'updated task' } };
      const generator = updateTask(taskService, action);

      const callAction = generator.next().value;

      expect(callAction).toEqual(call(taskService.updateTask, action.task));
    });
    it('passes updated task in array to redux store', () => {
      const taskBeforeUpdate = { id: 'task to update' };
      const taskAfterUpdate = { id: 'task to update', status: 'Complete' };
      const tasksInReduxStore = [taskBeforeUpdate];
      const generator = updateTask(taskService, { task: taskAfterUpdate });
      generator.next();
      generator.next(taskAfterUpdate);

      const putAction = generator.next(tasksInReduxStore).value;

      expect(putAction).toEqual(put(TaskActions.successUpdateTask([taskAfterUpdate])));
    });
  });
});
