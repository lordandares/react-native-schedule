// @flow
import React from 'react';
import { shallow, render } from 'enzyme';
import TaskItem from './TaskItem';

describe('TaskItem', () => {
  it('renders with props', () => {
    shallow(<TaskItem
      viewModel={{ item: {} }}
      styles={{}}
      componentId="nav-component-id"
    />);
  });

  it('displays a rating component', () => {
    const taskItem = shallow(<TaskItem
      viewModel={{ item: { } }}
      styles={{}}
      componentId="nav-component-id"
    />);
    const rating = taskItem.find('#rating');
    expect(rating).toHaveLength(1);
  });

  it('displays a description', () => {
    const taskItem = render(<TaskItem
      viewModel={{ item: { description: 'testing' } }}
      styles={{}}
      componentId="nav-component-id"
    />);

    const description = taskItem.find('#description');
    expect(description.text()).toBe('testing');
  });

  it('displays a notes field', () => {
    const taskItem = shallow(<TaskItem
      viewModel={{ item: { notes: 'some-notes' } }}
      styles={{}}
      componentId="nav-component-id"
    />);
    const description = taskItem.find('#notes');
    expect(description).toHaveLength(1);
  });
});
