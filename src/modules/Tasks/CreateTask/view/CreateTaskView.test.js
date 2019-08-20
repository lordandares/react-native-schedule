// @flow
import React from 'react';
import { shallow } from 'enzyme';
import { CreateTaskView } from './CreateTaskView';
import { CreateTaskController } from '../controller/CreateTaskController';
import type { ICreateTaskNavigation } from '../CreateTask.types';

jest.mock('react-i18next', () => ({
  withNamespaces: () => (lComponent) => {
    const loginComponent = lComponent;
    loginComponent.defaultProps = { ...lComponent.defaultProps, t: key => key };
    return loginComponent;
  },
  reactI18nextModule: jest.fn(),
}));

jest.mock('react-native-localize', () => ({
  RNLocalize: {
    language: 'en',
    languages: ['en'],
  },
  getLocales: jest.fn(() => [{ languageCode: 'en' }]),
}));

jest.mock('react-native-snackbar', () => ({ show: () => undefined }));

describe('CreateTaskView', () => {
  const fakeNav: ICreateTaskNavigation = {
    navigateBack: jest.fn(),
    navigateToSiteList: jest.fn(),
    navigateToCoverageList: jest.fn(),
  };
  const styles = {};
  const requestCreateTask = jest.fn();

  it('can be rendered', () => {
    const controller = new CreateTaskController('companyId', requestCreateTask, fakeNav);

    const view = shallow(<CreateTaskView viewModel={controller} t={jest.fn()} styles={styles} />).instance();

    expect(view).not.toBeNull();
  });
  describe('create', () => {
    it('calls createTask on click', () => {
      const controller = ({ createTask: jest.fn(), shouldDisableCreateButton: () => true }: any);
      const view = shallow(<CreateTaskView viewModel={controller} t={jest.fn()} styles={styles} />);
      const createButton = view.find('[data-testid="create-button"]').first();

      createButton.props().onPress();

      expect(controller.createTask).toHaveBeenCalled();
    });
  });
});
