// @flow
import React from 'react';
import { shallow } from 'enzyme';
import { CoverageListView } from './CoverageListView';

const styles = {};
const t = jest.fn();
const viewModel = {
  loading: false,
  filteredUsers: [],
  getUsers: jest.fn(),
  onUserSelected: jest.fn(),
  setFilter: jest.fn(),
};

describe('CoverageListView', () => {
  it('renders', () => {
    const view = shallow(<CoverageListView t={t} styles={styles} viewModel={viewModel} />);

    expect(view).not.toBeNull();
  });
  it('passes users to FlatList', () => {
    const model = Object.assign({}, viewModel);
    model.filteredUsers = [{ id: 'one' }, { id: 'two' }, { id: 'three' }];
    const view = shallow(<CoverageListView t={t} styles={styles} viewModel={(model: any)} />);

    const coverageList = view.find('[testID="coverage-list"]');

    expect(coverageList.props().data).toHaveLength(3);
  });
});
