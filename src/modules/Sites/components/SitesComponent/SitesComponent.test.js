import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore, createMockDispatch } from 'redux-test-utils';

import type { ScheduleState } from '../../../../shared/types/reduxState.types';
import SitesComponent from './SitesComponent';
import SitesComponentTestData from './SitesComponent.testdata';

jest.mock('appcenter', () => ({
  getInstallId: jest.fn(),
  AppCenterReactNative: {},
}));

jest.mock('appcenter/appcenter-log', () => ({
  AppCenterReactNative: {},
}));

jest.mock('../../../../shared/navigation/registerTabNavigator.js');

const mockPush = jest.fn();

jest.mock('react-native-navigation', () => ({
  Navigation: {
    events: () => ({
      bindComponent: jest.fn(),
    }),
    mergeOptions: jest.fn(),
    push: jest.fn(() => mockPush()),
    showModal: jest.fn(),
  },
}));

const initialState: ScheduleState = {
  sites: [],
};

const getSites = () => ({ type: 'getSites' });

const navigator = {
  setStyle: jest.fn(),
  setSubTitle: jest.fn(),
  setTitle: jest.fn(),
  setOnNavigatorEvent: jest.fn(),
  push: jest.fn(),
  addOnNavigatorEvent: jest.fn(),
};

describe('SitesComponent with redux', () => {
  let componentShallow;
  let SitesComponentWithStore;
  let ConnectedComponent;
  let store;
  const dispatchMock = createMockDispatch();
  beforeEach(() => {
    // eslint-disable-next-line no-unused-vars
    const mapStateToProps = state => ({
      sites: SitesComponentTestData.getTestSites(),
    });

    const mapDispatchToProps = () =>
      bindActionCreators(
        {
          getSites,
        },
        dispatchMock.dispatch,
      );

    store = createMockStore(initialState);
    ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(SitesComponent);
    SitesComponentWithStore = shallowWithStore(
      <ConnectedComponent
        navigator={navigator}
        setSelectedSite={jest.fn()}
        getShifts={jest.fn()}
        setNavigator={jest.fn()}
      />,
      store,
    );
    componentShallow = SitesComponentWithStore.dive();
  });

  describe('SitesComponent', () => {
    describe('when a user touches a site', () => {
      it('should call `setSelectedSite` with new site', () => {
        const site = {};
        const container = componentShallow;
        const spy = jest.spyOn(container.instance().props, 'setSelectedSite');
        container.instance().onSiteSelected(site);
        expect(spy).toHaveBeenCalledWith(site);
      });
    });
  });
});
