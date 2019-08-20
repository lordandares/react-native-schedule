import React from 'react';
import { shallow } from 'enzyme';
import SiteList from './SiteList';

describe('SiteList', () => {
  it('should show sites', () => {
    const component = shallow(<SiteList styles={{}} viewModel={{ sites: [{ name: 'yo' }, { name: 'yo2' }] }} />);
    const siteList = component.find('#siteList');
    const data = siteList.props().data[0];
    const title = data.name;
    expect(title).toEqual('yo');
  });
  describe('when no sites', () => {
    it('displays nothing to see', () => {
      const component = shallow(<SiteList styles={{}} viewModel={{ sites: [] }} />);
      const nothingToSee = component.find('#nothing-to-see');

      expect(nothingToSee).toHaveLength(1);
    });
  });
  describe('when loading', () => {
    it('does not display nothing to see', () => {
      const component = shallow(<SiteList styles={{}} viewModel={{ sites: [], loading: true }} />);
      const nothingToSee = component.find('#nothing-to-see');

      expect(nothingToSee).toHaveLength(0);
    });
  });
});
