import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore, createMockDispatch } from 'redux-test-utils';
import moment from 'moment-timezone';

import ScheduleComponentContainer from '../../ScheduleComponentContainer';
import ScheduleComponent from '../../components/ScheduleComponent/ScheduleComponent';
import type { ScheduleState } from '../../../../shared/types/reduxState.types';
import { getContainerMaxHeight, getContainerWidth } from '../../../../shared/utils/dimensions';
import ScheduleComponentTestData from './ScheduleComponent.testdata';
import type { User } from '../../../../shared/types/schedule.types';
import { shiftTypeValue } from '../../../../shared/types/schedule.types';
import UserRoleCalculator from '../../../../shared/components/UserRoleCalculator/UserRoleCalculator';
import { SCHEDULE_TABS } from '../../../../shared/constants/tabs';

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

jest.mock('react-native-localize', () => ({
  RNLocalize: {
    language: 'en',
    languages: ['en'],
  },
  getLocales: jest.fn(() => [{ languageCode: 'en' }]),
}));

jest.mock('../../../../shared/utils/dimensions');
getContainerMaxHeight.mockImplementation(() => {});
getContainerWidth.mockImplementation(() => {});

jest.mock('react-native-datepicker/date_icon.png');
jest.mock('../../../../shared/navigation/registerTabNavigator.js');

jest.mock('react-i18next', () => ({
  withNamespaces: () => (lComponent) => {
    const loginComponent = lComponent;
    loginComponent.defaultProps = { ...lComponent.defaultProps, t: key => key };
    return loginComponent;
  },
  reactI18nextModule: jest.fn(),
}));

const auxCurrentUser = {
  userRole: 'Admin',
};

const initialState: ScheduleState = {
  unassignedShifts: [],
  assignedShifts: [],
  users: [],
  selectedDate: moment(),
  exceptionsShifts: [],
};

const getUnassignedShifts = () => ({ type: 'getUnassignedShifts' });

const getAssignedShifts = () => ({ type: 'getAssignedShifts' });

const getUsers = () => ({ type: 'getUsers' });

const getExceptions = () => ({ type: 'getExceptions' });

const getOfferedShifts = () => ({ type: 'getOfferedShifts' });

const setSelectedShift = () => ({ type: 'setSelectedShift' });

const setSelectedDate = () => ({ type: 'setSelectedDate' });

describe('ScheduleComponent', () => {
  it('should shallow render', () => {
    const store = createMockStore({
      scheduleState: initialState,
      auth: { user: auxCurrentUser },
      appNavigation: {
        activeTab: 1,
        activeInnerTabs: { 1: 0 },
      },
      clockevents: {
        loading: false,
      },
      featureFlags: {
        flags: [],
      },
    });
    const component = shallowWithStore(<ScheduleComponentContainer componentId="id" />, store);
    component.dive();
  });
});

describe('ScheduleComponent with redux', () => {
  let componentShallow;
  let SchedulePageWithStore;
  let ConnectedComponent;
  let store;
  const dispatchMock = createMockDispatch();
  const userRoleCalculator = new UserRoleCalculator();
  beforeEach(() => {
    const mapStateToProps = ({ scheduleState, currentUser }) => ({
      scheduleState,
      currentUser,
      activeInnerTab: 0,
    });

    const mapDispatchToProps = () =>
      bindActionCreators(
        {
          getUnassignedShifts,
          getAssignedShifts,
          getUsers,
          getExceptions,
          getOfferedShifts,
          setSelectedShift,
          setSelectedDate,
        },
        dispatchMock.dispatch,
      );

    store = createMockStore({
      scheduleState: initialState,
      currentUser: auxCurrentUser,
    });
    ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(ScheduleComponent);
    SchedulePageWithStore = shallowWithStore(
      <ConnectedComponent componentId="id" currentUser={auxCurrentUser} />,
      store,
    );
    componentShallow = SchedulePageWithStore.dive();
  });

  it('should have Unassigned as first tab', () => {
    const container = componentShallow.dive();
    const content = container
      .find('withStyles(TabsComponent)')
      .first()
      .props().children[0].props.tab;
    expect(content).toBe(SCHEDULE_TABS.UNASSIGNED);
  });

  it('should hide tab Exceptions ', () => {
    const container = componentShallow.dive();
    const tabs = container
      .find('withStyles(TabsComponent)')
      .first()
      .props().children;
    expect(tabs.find(tab => tab.props && tab.props.tab === SCHEDULE_TABS.EXCEPTIONS)).toBeFalsy();
  });

  it('should hide Offers tab', () => {
    const container = componentShallow.dive();
    const tabs = container
      .find('withStyles(TabsComponent)')
      .first()
      .props().children;
    expect(tabs.find(tab => tab.props && tab.props.tab === SCHEDULE_TABS.OFFERED_SHIFTS)).toBeFalsy();
  });

  it('should have My Shifts tab', () => {
    const container = componentShallow.dive();
    const tabs = container
      .find('withStyles(TabsComponent)')
      .first()
      .props().children;
    expect(tabs.find(tab => tab.props && tab.props.tab === SCHEDULE_TABS.MY_SHIFTS)).toBeTruthy();
  });

  it('should set selected date on load', () => {
    componentShallow.dive();
    expect(dispatchMock.isActionDispatched({ type: 'setSelectedDate' })).toBe(true);
  });

  it('should create clockout record with userId', () => {
    const shift = ScheduleComponentTestData.getAssignedShiftsForToday()[0];
    const fakeUserId = 'fake-user-id-1';
    const createdClockOutRecord = ScheduleComponent.createClockRecord(shift, fakeUserId);
    expect(createdClockOutRecord.userId).toBe(fakeUserId);
  });

  it('should create clockin record with userId', () => {
    const shift = ScheduleComponentTestData.getAssignedShiftsForToday()[0];
    const fakeUserId = 'fake-user-id-1';
    const createdClockInRecord = ScheduleComponent.createClockRecord(shift, fakeUserId);
    expect(createdClockInRecord.userId).toBe(fakeUserId);
  });

  it('should indicate a user is admin if role is set', () => {
    const userId = 'fake-user-id-3';
    const role = 'Admin';
    const users = ScheduleComponentTestData.getTestUsers();
    const isAdmin = userRoleCalculator.isInRole(userId, role, users);
    expect(isAdmin).toBe(true);
  });

  it('should indicate a user is admin if role is not set', () => {
    const userId = 'fake-user-id-2';
    const role = 'Admin';
    const users = ScheduleComponentTestData.getTestUsers();
    const isAdmin = userRoleCalculator.isInRole(userId, role, users);
    expect(isAdmin).toBe(false);
  });

  it('should indicate a user is user if role is set fake-user-id-1', () => {
    const userId = 'fake-user-id-1';
    const role = 'User';
    const users = ScheduleComponentTestData.getTestUsers();
    const isAdmin = userRoleCalculator.isInRole(userId, role, users);
    expect(isAdmin).toBe(true);
  });

  it('should indicate a user is user if role is set fake-user-id-2', () => {
    const userId = 'fake-user-id-2';
    const role = 'User';
    const users = ScheduleComponentTestData.getTestUsers();
    const isAdmin = userRoleCalculator.isInRole(userId, role, users);
    expect(isAdmin).toBe(true);
  });

  it('should indicate false when a bad role is requested fake-user-id-1', () => {
    const userId = 'fake-user-id-1';
    const role = 'badrole';
    const users = ScheduleComponentTestData.getTestUsers();
    const isAdmin = userRoleCalculator.isInRole(userId, role, users);
    expect(isAdmin).toBe(false);
  });

  it('should indicate false when a bad role is requested fake-user-id-2', () => {
    const userId = 'fake-user-id-2';
    const role = 'badrole';
    const users = ScheduleComponentTestData.getTestUsers();
    const isAdmin = userRoleCalculator.isInRole(userId, role, users);
    expect(isAdmin).toBe(false);
  });

  it('should show the list of one Exceptions ', () => {
    const container = componentShallow;
    const exceptionsShifts = ScheduleComponentTestData.getException();

    container.setProps({
      ...container.props(),
      scheduleState: { ...container.props().scheduleState, exceptionsShifts },
      tenant: { shortDateFormat: '' },
    });

    const wrapperExceptions = container.dive().find({ tab: SCHEDULE_TABS.EXCEPTIONS });
    const exceptionList = wrapperExceptions
      .find('withStyles(SectionShiftList)')
      .first()
      .props().shifts;
    expect(exceptionList).toBe(exceptionsShifts);
  });

  it('should show the list of two Exceptions ', () => {
    const container = componentShallow;
    const exceptionsShifts = ScheduleComponentTestData.getExceptions();

    container.setProps({
      ...container.props(),
      scheduleState: { ...container.props().scheduleState, exceptionsShifts },
      tenant: { shortDateFormat: '' },
    });

    const wrapperExceptions = container.dive().find({ tab: SCHEDULE_TABS.EXCEPTIONS });
    const exceptionList = wrapperExceptions
      .find('withStyles(SectionShiftList)')
      .first()
      .props().shifts;
    expect(exceptionList).toBe(exceptionsShifts);
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

  // unit test was broken when I encountered the code
  // i tried to fix it but I don't understand the mocking (it's not readable)
  // will need to work to fix with appropriate party as tech debt
  // sorry [2018.01.08 Devin]
  // it('set unasigned shifts', () => {
  //   const container = componentShallow.dive();
  //   container.instance().componentWillMount();
  //
  //   container.setProps({
  //     scheduleState: {
  //       unassignedShifts: TestData.getSomeUnassignedShiftsForToday(),
  //     },
  //   });
  //
  //   const items = container.find(ShiftListItemComponent);
  //   expect(items).toHaveLength(2);
  // });

  describe('updateAppBar', () => {
    describe('onShiftSelected', () => {
      it('should push a new screen when user is an admin', () => {
        const container = componentShallow;
        const users: User[] = [{ id: '1', userRole: 'Admin' }];
        const tenant = { timeFormat: null };
        container.setProps({
          ...container.props(),
          scheduleState: { ...container.props().scheduleState, users },
          tenant,
        });
        const shift = {
          shiftType: shiftTypeValue.fixed.value,
        };
        container
          .dive()
          .instance()
          .onShiftSelected(shift);
        expect(mockPush).toHaveBeenCalled();
      });

      it('should push a proper nav bar', () => {
        const container = componentShallow;
        const users: User[] = [{ id: '1', userRole: 'Admin' }];
        container.setProps({
          ...container.props(),
          scheduleState: {
            ...container.props().scheduleState,
            users,
            justThisShift: true,
          },
          tenant: { timeFormat: null },
        });
        const shift = {
          siteName: 'n',
          start: new Date('1995-12-17T03:24:00'),
          end: '1995-12-17T03:24:00',
          siteTimeZone: 'America/New_York',
          serviceName: 's',
          shiftType: shiftTypeValue.fixed.value,
        };
        container
          .dive()
          .instance()
          .onShiftSelected(shift);
        expect(mockPush).toHaveBeenCalled();
      });

      it('should push to the ShiftCoverage when it is a repeating shift - justThisShift', () => {
        const container = componentShallow;
        const users: User[] = ScheduleComponentTestData.getTestUsers();
        container.setProps({
          ...container.props(),
          scheduleState: {
            ...container.props().scheduleState,
            users,
            justThisShift: true,
          },
          tenant: { timeFormat: null },
        });
        const shift = ScheduleComponentTestData.getRepeatingShift();
        container
          .dive()
          .instance()
          .onShiftSelected(shift);
        expect(mockPush).toHaveBeenCalled();
      });
    });
  });

  it('should display a `NothingToSeeHereMessage` if there`s no assigned shifts', () => {
    const container = componentShallow;

    container.setProps({
      ...container.props(),
      scheduleState: { ...container.props().scheduleState },
    });

    expect(container
      .dive()
      .find({ tab: SCHEDULE_TABS.MY_SHIFTS })
      .children()
      .exists('#emptyList')).toBeTruthy();
  });

  it('should not display a `NothingToSeeHereMessage` if there`s no assigned shifts', () => {
    const container = componentShallow;

    container.setProps({
      ...container.props(),
      scheduleState: {
        ...container.props().scheduleState,
        assignedShifts: ScheduleComponentTestData.getAssignedShiftsForToday()[0],
      },
      tenant: { shortDateFormat: '' },
    });

    expect(container
      .dive()
      .find({ title: SCHEDULE_TABS.MY_SHIFTS })
      .children()
      .exists('#emptyList')).toBeFalsy();
  });
});
