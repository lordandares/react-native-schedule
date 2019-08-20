// @flow
import { CreateTaskController } from './CreateTaskController';

import { ICreateTaskNavigation } from '../CreateTask.types';

const requestCreateTask = jest.fn();
const navigation: ICreateTaskNavigation = {
  navigateToCoverageList: jest.fn(),
  navigateBack: jest.fn(),
  navigateToSiteList: jest.fn(),
};

const shortDateFormat = 'MMM D';

describe('CreateTaskController', () => {
  it('can be instantiated', () => {
    const controller = new CreateTaskController('companyId', requestCreateTask, navigation, shortDateFormat);

    expect(controller).not.toBeNull();
  });
  describe('createTask', () => {
    it('calls requestCreateTask', () => {
      requestCreateTask.mockClear();
      const controller = new CreateTaskController('companyId', requestCreateTask, navigation, shortDateFormat);
      controller.selectedSite = ({}: any);
      controller.createTask();
      expect(requestCreateTask).toHaveBeenCalled();
    });
    it('passes the selected site', () => {
      requestCreateTask.mockClear();
      const controller = new CreateTaskController('companyId', requestCreateTask, navigation, shortDateFormat);
      controller.selectedSite = ({ id: '1', name: 'russel', customerName: 'westbrook' }: any);
      controller.createTask();
      expect(requestCreateTask).toHaveBeenLastCalledWith(expect.objectContaining({
        site: controller.selectedSite,
      }));
    });
  });
  describe('setSelectedSite', () => {
    it('sets selected site', () => {
      const newSite = ({ id: 'new site' }: any);
      const controller = new CreateTaskController('companyId', requestCreateTask, navigation, shortDateFormat);

      controller.setSelectedSite(newSite, ({ forceUpdate: jest.fn() }: any));

      expect(controller.selectedSite).toBe(newSite);
    });
    it('calls forceUpdate', () => {
      const component = ({ forceUpdate: jest.fn() }: any);
      const spy = jest.spyOn(component, 'forceUpdate');
      const controller = new CreateTaskController('companyId', requestCreateTask, navigation, shortDateFormat);

      controller.setSelectedSite(({}: any), component);

      expect(spy).toHaveBeenCalled();
    });
  });
  describe('setSelectedTemplate', () => {
    it('sets selected template', () => {
      const newTemplate = ({ id: 'new template' }: any);
      const controller = new CreateTaskController('companyId', requestCreateTask, navigation, shortDateFormat);

      controller.setSelectedTemplate(newTemplate, ({ forceUpdate: jest.fn() }: any));

      expect(controller.selectedTemplate).toBe(newTemplate);
    });
    it('calls forceUpdate', () => {
      const component = ({ forceUpdate: jest.fn() }: any);
      const spy = jest.spyOn(component, 'forceUpdate');
      const controller = new CreateTaskController('companyId', requestCreateTask, navigation, shortDateFormat);

      controller.setSelectedTemplate({}, component);

      expect(spy).toHaveBeenCalled();
    });
  });
  describe('onDateChange', () => {
    it('sets selected template', () => {
      const date = new Date();
      const controller = new CreateTaskController('companyId', requestCreateTask, navigation, shortDateFormat);

      controller.onDateChange(date, ({ forceUpdate: jest.fn() }: any));

      expect(controller.dueDate).toBe(date);
    });
    it('calls forceUpdate', () => {
      const component = ({ forceUpdate: jest.fn() }: any);
      const spy = jest.spyOn(component, 'forceUpdate');
      const controller = new CreateTaskController('companyId', requestCreateTask, navigation, shortDateFormat);

      controller.onDateChange(new Date(), component);

      expect(spy).toHaveBeenCalled();
    });
  });
  describe('createTaskButtonEnabled', () => {
    it('returns true when all needed values are not set', () => {
      const contoller = new CreateTaskController('companyId', requestCreateTask, navigation, shortDateFormat);

      const isDisabled = contoller.shouldDisableCreateButton();

      expect(isDisabled).toEqual(true);
    });
    it('returns true some values missing', () => {
      const date = new Date();
      const user = ({}: any);
      const template = ({}: any);
      const sourceComponent = ({ forceUpdate: jest.fn() }: any);
      const contoller = new CreateTaskController('companyId', requestCreateTask, navigation, shortDateFormat);
      contoller.setSelectedTemplate(template, sourceComponent);
      contoller.setSelectedUser(user, sourceComponent);
      contoller.onDateChange(date, sourceComponent);

      const isDisabled = contoller.shouldDisableCreateButton();

      expect(isDisabled).toEqual(true);
    });
    it('returns false when all needed values set', () => {
      const date = new Date();
      const user = ({}: any);
      const site = ({}: any);
      const template = ({}: any);
      const sourceComponent = ({ forceUpdate: jest.fn() }: any);
      const contoller = new CreateTaskController('companyId', requestCreateTask, navigation, shortDateFormat);
      contoller.setSelectedSite(site, sourceComponent);
      contoller.setSelectedTemplate(template, sourceComponent);
      contoller.setSelectedUser(user, sourceComponent);
      contoller.onDateChange(date, sourceComponent);

      const isDisabled = contoller.shouldDisableCreateButton();

      expect(isDisabled).toEqual(false);
    });
  });
});
