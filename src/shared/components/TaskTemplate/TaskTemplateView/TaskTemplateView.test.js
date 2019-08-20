// @flow
import React from 'react';
import { shallow } from 'enzyme';
import { TaskTemplateView } from './TaskTemplateView';

const taskTemplate = {};

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

describe('TaskTemplateView', () => {
  it('disables nav touch when onNavTouched callback not set', () => {
    const view = shallow(<TaskTemplateView taskTemplate={taskTemplate} />).dive();
    const navButton = view.find("[testID='site-nav-button']").first();

    const { disabled } = navButton.props();

    expect(disabled).toEqual(true);
  });
  it('enables nav touch when onNavTouched callback is set', () => {
    const view = shallow(<TaskTemplateView taskTemplate={taskTemplate} onNavIconTouched={() => undefined} />).dive();
    const navButton = view.find("[testID='site-nav-button']").first();

    const { disabled } = navButton.props();

    expect(disabled).toEqual(false);
  });
  it('hides site nav icon when onNavTouched callback not set', () => {
    const view = shallow(<TaskTemplateView taskTemplate={taskTemplate} />).dive();

    const navButton = view.find("[testID='site-nav-icon']");

    expect(navButton).toHaveLength(0);
  });
  it('shows site nav icon when onNavTouched callback is set', () => {
    const view = shallow(<TaskTemplateView taskTemplate={taskTemplate} onNavIconTouched={() => undefined} />).dive();

    const navButton = view.find("[testID='site-nav-icon']");

    expect(navButton).toHaveLength(1);
  });
});
