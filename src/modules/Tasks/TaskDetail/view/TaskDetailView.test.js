// @flow
import React from 'react';
import { shallow, render } from 'enzyme';
import { Task } from '@next/schedule/types/task.types';
import TaskDetailView from './TaskDetailView';
import type { ITaskDetailViewModel } from '../TaskDetail.types';

const stylesFake = {
  container: {},
  sectionHeaderText: {},
  sectionHeader: {},
  sectionItem: {},
  sectionItemText: {},
  navIcon: {},
  submitButton: {},
  submitButtonText: {},
};

const task: Task = {
  id: 'some-id',
  areas: [
    {
      id: 'area-id-1',
      title: 'Bathroom 1',
    },
    {
      id: 'area-id-2',
      title: 'Lobby',
    },
  ],
};

const getFakeTasksDetailViewModel = (): ITaskDetailViewModel => ({
  submit: jest.fn(),
  getAreas: () => task.areas,
  onPressArea: jest.fn(),
  canEdit: true,
});

describe('TasksDetailView', () => {
  it('renders with props', () => {
    shallow(<TaskDetailView
      viewModel={getFakeTasksDetailViewModel()}
      styles={stylesFake}
      componentId="nav-component-id"
    />);
  });

  it('should display all areas', () => {
    const tasksViewModel = render(<TaskDetailView
      viewModel={getFakeTasksDetailViewModel()}
      styles={stylesFake}
      componentId="nav-component-id"
    />);

    const areas = tasksViewModel.find('[data-testid="task-area-text"]');

    expect(areas).toHaveLength(2);
  });

  it('should display a submit button', () => {
    const tasksViewModel = shallow(<TaskDetailView
      viewModel={getFakeTasksDetailViewModel()}
      styles={stylesFake}
      componentId="nav-component-id"
    />);

    const submitButton = tasksViewModel.find('[testID="task-detail-submit-button"]');
    expect(submitButton).toHaveLength(1);
  });


  it('should execute submit when submit button clicked', () => {
    const tasksViewModel = getFakeTasksDetailViewModel();
    const inspectionsDetailView = shallow(<TaskDetailView
      viewModel={tasksViewModel}
      styles={stylesFake}
      componentId="nav-component-id"
    />);

    const submitButton = inspectionsDetailView.find('[testID="task-detail-submit-button"]');

    const spy = jest.spyOn(tasksViewModel, 'submit');

    submitButton
      .first()
      .props()
      .onPress();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should hide submit button when user cannot edit', () => {
    const viewModel = getFakeTasksDetailViewModel();
    viewModel.canEdit = false;

    const tasksViewModel = shallow(<TaskDetailView
      viewModel={viewModel}
      styles={stylesFake}
      componentId="nav-component-id"
    />);

    const submitButton = tasksViewModel.find('[testID="task-detail-submit-button"]');
    expect(submitButton).toHaveLength(0);
  });
});
