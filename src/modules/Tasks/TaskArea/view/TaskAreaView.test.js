// @flow
import React from 'react';
import { shallow, render } from 'enzyme';
import { Task } from '@next/schedule/types/task.types';
import { TaskAreaView } from './TaskAreaView';
import type { ITaskAreaViewModel } from '../TaskArea.types';

const stylesFake = {
  container: {},
  sectionHeaderText: {},
  sectionHeader: {},
  sectionItem: {},
  sectionItemText: {},
  navIcon: {},
  submitButton: {},
  submitButtonText: {},
  itemDetail: {},
  colorRating: {},
  sectionView: {},
};

const task: Task = {
  id: 'some-id',
  areas: [
    {
      id: 'area-id-1',
      title: 'Bathroom 1',
      items: [
        {
          id: 'item-id-1',
          title: 'item one',
          rating: {
            value: 1,
          },
        },
        {
          id: 'item-id-2',
          title: 'item two',
          rating: null,
        },
      ],
    },
  ],
};

const viewModel: ITaskAreaViewModel = {
  submit: jest.fn(),
  getItems: () => task.areas[0].items,
  onPressItem: jest.fn(),
  rateItem: jest.fn(),
  canEdit: true,
  area: task.areas[0],
};

jest.mock('../../TaskItem/TaskItemContainer');

describe('TaskAreaView', () => {
  it('renders with props', () => {
    shallow(<TaskAreaView viewModel={viewModel} componentId="" styles={stylesFake} />);
  });

  it('should display all items', () => {
    const tasksViewModel = render(<TaskAreaView viewModel={viewModel} componentId="" styles={stylesFake} />);

    const areas = tasksViewModel.find('[data-testid="task-item-text"]');

    expect(areas).toHaveLength(2);
  });

  it('should display ratings', () => {
    const tasksViewModel = render(<TaskAreaView viewModel={viewModel} componentId="" styles={stylesFake} />);
    const itemRatings = tasksViewModel.find('[data-testid="color-rating-component"]');
    expect(itemRatings).toHaveLength(2);
  });
});
