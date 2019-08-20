// @flow
import React from 'react';
import { shallow } from 'enzyme';
import TaskListItemView from './TaskListItemView';
import type { ITaskItemViewModel } from '../TaskListItem.types';

const theme = {
  palette: {
    grey: 'grey',
  },
};

const viewModel: ITaskItemViewModel = {
  getDisplayName: () => 'Pow',
  getSiteInfo: () => 'Pa Pow',
  getTitle: () => 'Baba Boosh!',
  onPressItem: () => undefined,
  getStatus: () => 'status',
};

describe('TaskItemView', () => {
  const taskItemView = shallow(<TaskListItemView styles={{}} theme={theme} viewModel={viewModel} />);

  it('displays avatar with name', () => {
    const avatar = taskItemView.find('Avatar');

    expect(avatar.prop('name')).toBe(viewModel.getDisplayName());
  });

  it('displays assignee', () => {
    const assigneeTextComp = taskItemView.find('#assigned-text').first();

    expect(assigneeTextComp.prop('children')).toBe(viewModel.getDisplayName());
  });

  it('renders site and customer', () => {
    const siteCustomerTextComp = taskItemView.find('#site-customer-text').first();

    expect(siteCustomerTextComp.prop('children')).toBe(viewModel.getSiteInfo());
  });

  it('renders task title', () => {
    const taskTitleComp = taskItemView.find('#title-text').first();

    expect(taskTitleComp.prop('children')).toBe(viewModel.getTitle());
  });
});
