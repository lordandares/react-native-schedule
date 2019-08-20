import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore, createMockDispatch } from 'redux-test-utils';
import moment from 'moment-timezone';

import ScheduleComponent from '../../components/ScheduleComponent/ScheduleComponent';
import type { ScheduleState } from '../../../../shared/types/reduxState.types';
import { getContainerMaxHeight, getContainerWidth } from '../../../../shared/utils/dimensions';
import canUserDo from '../../../../shared/auth/utils/canUserDo';
import ScheduleComponentTestData from './ScheduleComponent.testdata';
import { SCHEDULE_TABS } from '../../../../shared/constants/tabs';

jest.mock('../../../../shared/auth/utils/canUserDo');
canUserDo.mockImplementation(() => (false));

jest.mock('../../../../shared/utils/dimensions');
getContainerMaxHeight.mockImplementation(() => {});
getContainerWidth.mockImplementation(() => {});

jest.mock('react-native-datepicker/date_icon.png');
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


const initialState: ScheduleState = {
  unassignedShifts: [],
  assignedShifts: [],
  users: [],
  sites: [],
  selectedDate: moment(),
  exceptionsShifts: [],
};

const getUnassignedShifts = () => ({ type: 'getUnassignedShifts' });

const getAssignedShifts = () => ({ type: 'getAssignedShifts' });

const getExceptions = () => ({ type: 'getExceptions' });

const getOfferedShifts = () => ({ type: 'getOfferedShifts' });

const getUsers = () => ({ type: 'getUsers' });

const setSelectedDate = () => ({ type: 'setSelectedDate' });

const navigator = {
  setStyle: jest.fn(),
  setSubTitle: jest.fn(),
  setTitle: jest.fn(),
  setOnNavigatorEvent: jest.fn(),
  addOnNavigatorEvent: jest.fn(),
  push: jest.fn(),
};

describe('ScheduleComponent with Redux for Non Admins', () => {
  let componentShallow;
  let SchedulePageWithStore;
  let ConnectedComponent;
  let store;
  const dispatchMock = createMockDispatch();

  beforeEach(() => {
    const mapStateToProps = state => ({
      scheduleState: state,
    });

    const mapDispatchToProps = () =>
      bindActionCreators(
        {
          getUnassignedShifts,
          getAssignedShifts,
          getUsers,
          getExceptions,
          getOfferedShifts,
          setSelectedDate,
        },
        dispatchMock.dispatch,
      );

    store = createMockStore(initialState);
    ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ScheduleComponent);
    SchedulePageWithStore = shallowWithStore(<ConnectedComponent navigator={navigator} />, store);
    componentShallow = SchedulePageWithStore.dive();
  });

  it('should shallow render without tabs for a non-admin user', () => {
    const container = componentShallow;
    container.setProps({
      ...container.props(),
      componentId: 'id',
      scheduleState: {
        ...container.props().scheduleState,
        assignedShifts: ScheduleComponentTestData.getAssignedShiftsForToday(),
      },
      tenant: { shortDateFormat: '' },
    });
    const content = container
      .dive()
      .find('#user-tab-container')
      .length;
    expect(content).toBe(1);
  });

  it('should show the list of offered shifts', () => {
    const container = componentShallow;
    const offeredShifts = ScheduleComponentTestData.getOfferedShifts();

    container.setProps({
      ...container.props(),
      scheduleState: { ...container.props().scheduleState, offeredShifts },
      tenant: { shortDateFormat: '' },
    });

    const wrapperOffers = container.dive().find({ tab: SCHEDULE_TABS.OFFERED_SHIFTS });
    const offeredList = wrapperOffers
      .find('withStyles(SectionShiftList)')
      .first()
      .props().shifts;
    expect(offeredList).toBe(offeredShifts);
  });
});
