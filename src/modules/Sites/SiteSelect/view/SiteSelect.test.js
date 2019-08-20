import React from 'react';
import { shallow, render } from 'enzyme';
import SiteSelect from './SiteSelect';

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

describe('SiteSelect', () => {
  it('should hide caret when disabled', () => {
    const siteSelect = shallow(<SiteSelect styles={{}} viewModel={{ isEnabled: false, site: {} }} />);
    const element = siteSelect.find('#caret');
    expect(element).toHaveLength(0);
  });

  it('should show caret when enabled', () => {
    const siteSelect = shallow(<SiteSelect styles={{}} viewModel={{ isEnabled: true, site: {} }} />);
    const element = siteSelect.find('#caret');
    expect(element).toHaveLength(1);
  });

  it('should set address', () => {
    const siteSelect = render(<SiteSelect styles={{}} viewModel={{ isEnabled: true, site: { address1: 'yo' } }} />);
    const element = siteSelect.find('#address');
    expect(element.text()).toContain('yo');
  });

  it('should set customer', () => {
    const siteSelect = render(<SiteSelect styles={{}} viewModel={{ isEnabled: true, site: { customerName: 'yo' } }} />);
    const element = siteSelect.find('#customer');
    expect(element.text()).toContain('yo');
  });
});
