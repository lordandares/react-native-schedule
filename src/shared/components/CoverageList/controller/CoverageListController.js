// @flow
import { filter, includes, toLower, trim } from 'lodash';
import type { Component } from 'react';
import type { User } from '@next/schedule/types/schedule.types';
import type { ICoverageListViewModel } from '../CoverageList.types';

export class CoverageListController implements ICoverageListViewModel {
  loading: boolean;
  users: User[];
  filteredUsers: User[];
  getUsers: () => void;
  onUserSelected: (user: User) => void;
  debounce: any;

  constructor(
    loading: boolean,
    users: User[],
    getUsers: () => void,
    onUserSelected: (user: User) => void,
    navigateBack: () => void,
  ) {
    this.loading = loading;
    this.users = users;
    this.filteredUsers = users;
    this.getUsers = getUsers;
    this.onUserSelected = (user: User) => {
      onUserSelected(user);
      navigateBack();
    };
  }

  setFilter = (searchTerm: string, source: Component<Object>) => {
    if (this.debounce) clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
      this.filteredUsers = filter(this.users, user =>
        includes(toLower(`${user.firstName} ${user.lastName}`), toLower(trim(searchTerm))));
      source.forceUpdate();
    }, 150);
  };
}
