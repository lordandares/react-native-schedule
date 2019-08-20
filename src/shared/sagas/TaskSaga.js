// @flow
import { Saga } from 'redux-saga';
import Immutable from 'seamless-immutable';
import Snackbar from 'react-native-snackbar';
import type { Task, ITaskService, CreateTaskRequest } from '@next/schedule/types/task.types';
import { put, call, select } from 'redux-saga/effects';
import TaskActions, { selectTasks, selectTaskId, selectAreaId } from '../redux/task';
import { TaskStatus } from '../types/TaskRedux.types';

export function* getTasks(taskService: ITaskService): Saga<Task> {
  try {
    const tasks = yield call(taskService.getTasks);
    yield put(TaskActions.successTasks(tasks));
  } catch (err) {
    yield put(TaskActions.errorRequestTasks(err.message || err));
  }
}

export function* createTask(taskService: ITaskService, { createTaskRequest }: CreateTaskRequest): Saga<Task[]> {
  try {
    const task = yield call(taskService.createTask, createTaskRequest);
    const tasks = yield select(selectTasks);
    const clonedTasks = Immutable.asMutable(tasks);
    clonedTasks.push(task);

    yield put(TaskActions.successCreateTask(clonedTasks));
  } catch (err) {
    yield put(TaskActions.errorCreateTask(err.message || err));
  }
}

export function* updateTask(taskService: ITaskService, { task }: Task): Saga<Task[]> {
  try {
    const updatedTask = yield call(taskService.updateTask, task);
    const tasks = yield select(selectTasks);

    const clonedTasks = Immutable.asMutable(tasks);
    const index = clonedTasks.findIndex(clone => clone.id === updatedTask.id);
    if (index !== -1) clonedTasks[index] = updatedTask;

    yield put(TaskActions.successUpdateTask(clonedTasks));
  } catch (err) {
    yield put(TaskActions.errorUpdateTask(err.message || err));
  }
}

export function* completeTask(taskService: ITaskService, { task }: Task): Saga<Task> {
  const updatedTask = Immutable.asMutable(task);
  updatedTask.status = TaskStatus.Complete;
  yield put(TaskActions.requestUpdateTask(updatedTask));
  Snackbar.show({ title: `${task.title} Submitted`, backgroundColor: 'green' });
}

export function* updateArea(taskService: ITaskService, { area }: any): Saga<Task> {
  const selectedTaskId = yield select(selectTaskId);

  const tasks = yield select(selectTasks);
  const task = tasks.find(t => t.id === selectedTaskId);
  const updatedTask = Immutable.asMutable(task, { deep: true });
  const index = updatedTask.areas.findIndex(a => a.id === area.id);
  updatedTask.areas[index] = area;

  yield put(TaskActions.requestUpdateTask(updatedTask));
  Snackbar.show({ title: `${area.title} Saved`, backgroundColor: 'green' });
}

export function* updateItem(taskService: ITaskService, { item }: any): Saga<Task> {
  const selectedTaskId = yield select(selectTaskId);
  const selectedAreaId = yield select(selectAreaId);

  const tasks = yield select(selectTasks);
  const task = tasks.find(t => t.id === selectedTaskId);
  const updatedTask = Immutable.asMutable(task, { deep: true });
  const updatedArea = updatedTask.areas.find(a => a.id === selectedAreaId);
  const index = updatedArea.items.findIndex(i => i.id === item.id);
  updatedArea.items[index] = item;

  yield put(TaskActions.requestUpdateTask(updatedTask));
  // Snackbar.show({ title: `${item.title} Saved`, backgroundColor: 'green' });
}
