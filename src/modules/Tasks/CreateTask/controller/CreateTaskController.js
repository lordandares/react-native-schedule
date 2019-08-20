// @flow
import type { Component } from 'react';
import type { TaskTemplate, CreateTaskRequest, TaskSite, TaskUser } from '@next/schedule/types/task.types';
import type { ICreateTaskViewModel, ICreateTaskNavigation } from '../CreateTask.types';
import type { Site, User } from '../../../../shared/types/schedule.types';

export class CreateTaskController implements ICreateTaskViewModel {
  companyId: string;
  dateFormat: string;
  dueDate: Date;
  selectedUser: User;
  selectedSite: Site;
  selectedTemplate: TaskTemplate;
  createTaskNavigation: ICreateTaskNavigation;
  createButtonEnabled: boolean;
  requestCreateTask: (CreateTaskRequest: CreateTaskRequest) => void;

  constructor(
    companyId: string,
    requestCreateTask: (CreateTaskRequest: CreateTaskRequest) => void,
    createTaskNavigation: ICreateTaskNavigation,
    shortDateFormat,
  ) {
    this.companyId = companyId;
    this.requestCreateTask = requestCreateTask;
    this.createTaskNavigation = createTaskNavigation;
    this.selectedTemplate = { id: 'id-one', title: 'Default Template' };
    this.dueDate = new Date();
    this.dateFormat = `ddd, ${shortDateFormat}`;
  }

  shouldDisableCreateButton = () => (
    this.dueDate === undefined ||
    this.selectedSite === undefined ||
    this.selectedTemplate === undefined ||
    this.selectedUser === undefined
  );

  createTask = () => {
    const taskSite: TaskSite = this.selectedSite ? {
      id: this.selectedSite.id,
      name: this.selectedSite.name,
      customerName: this.selectedSite.customerName,
    } : null;
    const taskUser: TaskUser = this.selectedUser ? {
      id: this.selectedUser.id,
      firstName: this.selectedUser.firstName,
      lastName: this.selectedUser.lastName,
    } : null;
    this.requestCreateTask({
      templateId: `hard-coded-template-id-${this.companyId}`,
      title: this.selectedTemplate.title,
      dueDate: this.dueDate,
      coverage: [taskUser],
      site: taskSite,
    });
    this.createTaskNavigation.navigateBack();
  };

  setSelectedTemplate = (taskTemplate: TaskTemplate, source: Component<Object>) => {
    this.selectedTemplate = taskTemplate;
    source.forceUpdate();
  };

  onDateChange = (selectedDate: Date, source: Component<Object>) => {
    this.dueDate = selectedDate;
    source.forceUpdate();
  };

  setSelectedSite = (site: Site, source: Component<Object>) => {
    this.selectedSite = site;
    source.forceUpdate();
  };

  setSelectedUser = (user: User, source: Component<Object>) => {
    this.selectedUser = user;
    source.forceUpdate();
  };

  navigateToCoverageList = (source: Component<Object>) => {
    this.createTaskNavigation.navigateToCoverageList((user) => {
      this.setSelectedUser(user, source);
    });
  };

  navigateToSiteList = (source: Component<Object>) => {
    this.createTaskNavigation.navigateToSiteList((site) => {
      this.setSelectedSite(site, source);
    });
  };
}
