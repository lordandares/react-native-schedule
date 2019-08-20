// @flow
import type { User } from '@next/schedule/types/schedule.types';
import type { Component } from 'react';

export interface ICoverageListViewModel {
  loading: boolean;
  filteredUsers: User[];
  getUsers: () => void;
  onUserSelected: (user: User) => void;
  setFilter: (term: string, source: Component<Object>) => void;
}

export interface ICoverageListProps {
  viewModel: ICoverageListViewModel;
  styles: Object;
  t: (key: string) => string;
}

export interface ICoverageListParams {
  selectLoading: (state: Object) => boolean;
  selectUsers: (state: Object) => User[];
  requestUsers: () => void;
}
