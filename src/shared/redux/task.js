// @flow
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import type { Task, Area, Item } from '@next/schedule/types/task.types';
import type { TaskState } from '../types/TaskRedux.types';

const { Types, Creators } = createActions({
  requestTasks: ['fromDate', 'toDate'],
  successTasks: ['tasks'],
  errorRequestTasks: ['error'],
  requestUpdateTask: ['task'],
  successUpdateTask: ['tasks'],
  errorUpdateTask: ['error'],
  requestCreateTask: ['createTaskRequest'],
  errorCreateTask: ['error'],
  successCreateTask: ['tasks'],
  setSelectedTaskId: ['selectedTaskId'],
  setSelectedAreaId: ['selectedAreaId'],
  requestCompleteTask: ['task'],
  requestUpdateTaskArea: ['area'],
  requestUpdateTaskItem: ['item'],
});

export const TaskTypes = Types;
export default Creators;

const INITIAL_STATE: TaskState = Immutable.from({
  tasks: [],
  selectedTaskId: null,
  selectedAreaId: null,
  loading: false,
  error: null,
});

// ------------------------ reducer functions
const onCreateRequest = state => state.merge({ loading: true, error: null });

const onCreateSuccess = (state, { tasks }) => state.merge({ loading: false, error: null, tasks });

const onGetRequest = state => state.merge({ loading: true, error: null });

const onGetSuccess = (state, { tasks }) => state.merge({ loading: false, error: null, tasks });

const onUpdateRequest = state => state.merge({ loading: true, error: null });

const onUpdateSuccess = (state, { tasks }) => state.merge({ loading: false, error: null, tasks });

const onFailure = (state, { error }) => state.merge({ loading: false, error: String(error) });

const onSetTaskId = (state, { selectedTaskId }) => state.merge({ selectedTaskId });

const onSetAreaId = (state, { selectedAreaId }) => state.merge({ selectedAreaId });

// ------------------------ bind reducers to actions
export const reducer = createReducer(INITIAL_STATE, {
  [Types.REQUEST_TASKS]: onGetRequest,
  [Types.SUCCESS_TASKS]: onGetSuccess,
  [Types.ERROR_REQUEST_TASKS]: onFailure,
  [Types.REQUEST_UPDATE_TASK]: onUpdateRequest,
  [Types.SUCCESS_UPDATE_TASK]: onUpdateSuccess,
  [Types.ERROR_UPDATE_TASK]: onFailure,
  [Types.SET_SELECTED_TASK_ID]: onSetTaskId,
  [Types.SET_SELECTED_AREA_ID]: onSetAreaId,
  [Types.REQUEST_CREATE_TASK]: onCreateRequest,
  [Types.ERROR_CREATE_TASK]: onFailure,
  [Types.SUCCESS_CREATE_TASK]: onCreateSuccess,
});

// ------------------------ selectors
export const selectLoading = ({ task }: Object): boolean => task.loading;
export const selectTasks = ({ task }: Object): Task[] => task.tasks;
export const selectTaskId = ({ task }: Object): Task => task.selectedTaskId;
export const selectTask = ({ task }: Object): Item => {
  const selectedTask = task.tasks.find(t => t.id === task.selectedTaskId);
  return selectedTask;
};
export const selectAreaId = ({ task }: Object): Area => task.selectedAreaId;
export const selectArea = ({ task }: Object): Item => {
  const selectedTask = selectTask({ task });
  const area = selectedTask.areas.find(a => a.id === task.selectedAreaId);
  return area;
};
export const selectItem = ({ task }: Object, item: Item): Item => {
  const selectedArea = selectArea({ task });
  const returnItem = selectedArea.items.find(i => i.id === item.id);
  return returnItem;
};
