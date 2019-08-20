// @flow
import type { Component } from 'react';
import type { CreateTaskRequest, TaskTemplate } from '@next/schedule/types/task.types';
import type { Site, User } from '../../../shared/types/schedule.types';

export interface ICreateTaskViewModel {
  dateFormat: string;
  dueDate: Date;
  selectedUser: User;
  selectedSite: Site;
  selectedTemplate: TaskTemplate;
  shouldDisableCreateButton: () => boolean;
  createTask: (createTaskRequest: CreateTaskRequest) => void;
  setSelectedTemplate: (taskTemplate: TaskTemplate, source: Component<Object>) => void;
  setSelectedSite: (site: Site, source: Component<Object>) => void;
  setSelectedUser: (user: User, source: Component<Object>) => void;
  onDateChange: (date: Date, source: Component<Object>) => void;
  navigateToCoverageList: (source: Component<Object>) => void;
  navigateToSiteList: (source: Component<Object>) => void;
}

export interface ICreateTaskProps {
  viewModel: ICreateTaskViewModel;
  styles: Object;
  t: (key: string) => string;
}

export interface ICreateTaskNavigation {
  navigateToCoverageList: (setSelectedUser: (user: User) => void) => void;
  navigateToSiteList: (callback: (site: Site) => void) => void;
  navigateBack: () => void;
}
