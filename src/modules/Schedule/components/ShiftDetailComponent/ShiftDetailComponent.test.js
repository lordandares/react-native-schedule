import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';

import ShiftDetailComponent from './ShiftDetailComponent';
import ShiftDetailComponentTestData from './ShiftDetailComponent.testdata';
import type { ScheduleState } from '../../../../shared/types/reduxState.types';
import { shiftTypeValue } from '../../../../shared/types/schedule.types';

jest.unmock('ScrollView');

const mockPush = jest.fn();
const mockShowModal = jest.fn();

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

jest.mock('react-native-navigation', () => ({
  Navigation: {
    events: () => ({
      bindComponent: jest.fn(),
    }),
    mergeOptions: jest.fn(),
    push: jest.fn(() => mockPush()),
    pop: jest.fn(),
    showModal: jest.fn(() => mockShowModal),
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

const initialState: ScheduleState = {
  selectedDate: moment(),
  selectedShift: {
    users: [],
  },
};

describe('ShiftDetailComponent', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('should shallow render', () => {
    // prettier-ignore
    shallow(<ShiftDetailComponent
      scheduleState={initialState}
      authUser={{ userRole: 'Admin' }}
      setNavigator={jest.fn()}
    />).dive();
  });

  it('should show the coverage title', () => {
    // prettier-ignore
    const shiftDetailsComponent =
      shallow(<ShiftDetailComponent
        scheduleState={initialState}
        authUser={{ userRole: 'Admin' }}
        setNavigator={jest.fn()}
      />).dive();
    const title = shiftDetailsComponent
      .find('#coverage-title')
      .render()
      .text();
    expect(title).toEqual('SHIFT_DETAIL_COMPONENT.COVERAGE');
  });

  it('should show the assign card', () => {
    // prettier-ignore
    const shiftDetailsComponent =
      shallow(<ShiftDetailComponent
        scheduleState={initialState}
        authUser={{ userRole: 'Admin' }}
        setNavigator={jest.fn()}
      />).dive();
    const flatListWrapper = shiftDetailsComponent.find('FlatList');
    expect(flatListWrapper.length).toEqual(0);
  });

  it('should user list if we have users assigned', () => {
    const shiftDetailsComponent = shallow(<ShiftDetailComponent
      scheduleState={{
          ...initialState,
          selectedShift: {
            users: [
              {
                id: 'user-id-1',
                firstName: 'Denise',
                lastName: 'Rodman',
                userRoles: [],
              },
            ],
          },
        }}
      authUser={{ userRole: 'Admin' }}
      setNavigator={jest.fn()}
    />).dive();
    const flatListWrapper = shiftDetailsComponent.find('FlatList');
    expect(flatListWrapper.length).toEqual(1);
  });

  it('should show the instructions title', () => {
    // prettier-ignore
    const shiftDetailsComponent =
      shallow(<ShiftDetailComponent
        scheduleState={initialState}
        authUser={{ userRole: 'Admin' }}
        setNavigator={jest.fn()}
      />).dive();
    const title = shiftDetailsComponent
      .find('#instructions-title')
      .render()
      .text();
    expect(title).toEqual('COMMON.INSTRUCTIONS');
  });

  it('should show the web view', () => {
    // prettier-ignore
    const shiftDetailsComponent =
      shallow(<ShiftDetailComponent
        scheduleState={initialState}
        authUser={{ userRole: 'Admin' }}
        setNavigator={jest.fn()}
      />).dive();
    const webViewWrapper = shiftDetailsComponent.find('#webViewInstructions');
    expect(webViewWrapper.length).toEqual(1);
  });

  it('should get the correct html on the web view', () => {
    const html = '<h1>This is heading 1</h1>';
    const initState = Object.assign({}, initialState);
    initState.selectedShift.instructions = html;
    // prettier-ignore
    const shiftDetailsComponent =
      shallow(<ShiftDetailComponent
        scheduleState={initState}
        authUser={{ userRole: 'Admin' }}
        setNavigator={jest.fn()}
      />).dive();
    const webViewWrapper = shiftDetailsComponent.find('#webViewInstructions');
    expect(webViewWrapper.props().source.html).toEqual(html);
  });

  it('should not push a new screen coverage when user is not an admin', () => {
    const shiftDetailsComponent = shallow(<ShiftDetailComponent
      scheduleState={{
          ...initialState,
          users: [{ id: 'user-id-1', userRoles: [] }],
          selectedShift: {
            users: [
              {
                id: 'user-id-1',
                firstName: 'Denise',
                lastName: 'Rodman',
                userRoles: [],
              },
            ],
          },
        }}
      authUser={{ userRole: 'User', userId: 'user-id-1' }}
      setNavigator={jest.fn()}
    />).dive();
    shiftDetailsComponent.instance().onPressCard({});
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should not push a new screen edit instructions when user is not an admin', () => {
    const shiftDetailsComponent = shallow(<ShiftDetailComponent
      scheduleState={{
          ...initialState,
          users: [{ id: 'user-id-1', userRoles: [] }],
          selectedShift: {
            users: [
              {
                id: 'user-id-1',
                firstName: 'Denise',
                lastName: 'Rodman',
                userRoles: [],
              },
            ],
          },
        }}
      authUser={{ userRole: 'User', userId: 'user-id-1' }}
      setNavigator={jest.fn()}
    />).dive();
    shiftDetailsComponent.instance().onPressInstructions({});
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should push a new screen coverage instructions when user logged is Owner', () => {
    const shiftDetailsComponent = shallow(<ShiftDetailComponent
      authUser={{ userRole: 'Owner' }}
      scheduleState={{
          ...initialState,
          users: [{ id: 'user-id-1', userRoles: [] }],
          selectedShift: {
            users: [
              {
                id: 'user-id-1',
                firstName: 'Denise',
                lastName: 'Rodman',
                userRoles: [],
              },
            ],
          },
        }}
      setNavigator={jest.fn()}
    />).dive();
    shiftDetailsComponent.instance().onPressCard({});
    expect(mockPush).toHaveBeenCalled();
  });

  it('should enable clock event editing for Admin role', () => {
    const shiftDetailsComponent = shallow(<ShiftDetailComponent
      authUser={{ userRole: 'Admin' }}
      scheduleState={{
          ...initialState,
          users: [{ id: 'user-id-1', userRoles: [] }],
          selectedShift: {
            users: [
              {
                id: 'user-id-1',
                firstName: 'Denise',
                lastName: 'Rodman',
                userRoles: [],
              },
            ],
          },
        }}
      setNavigator={jest.fn()}
    />).dive();
    const clockEventTouchable = shiftDetailsComponent.find("[testID='clock-event-touchable']").first();
    expect(clockEventTouchable.props().disabled).toEqual(false);
  });

  it('should enable clock event editing for Owner role', () => {
    const shiftDetailsComponent = shallow(<ShiftDetailComponent
      authUser={{ userRole: 'Owner' }}
      scheduleState={{
          ...initialState,
          users: [{ id: 'user-id-1', userRoles: [] }],
          selectedShift: {
            users: [
              {
                id: 'user-id-1',
                firstName: 'Denise',
                lastName: 'Rodman',
                userRoles: [],
              },
            ],
          },
        }}
      setNavigator={jest.fn()}
    />).dive();
    const clockEventTouchable = shiftDetailsComponent.find("[testID='clock-event-touchable']").first();
    expect(clockEventTouchable.props().disabled).toEqual(false);
  });

  it('should disable clock event editing for User role', () => {
    const shiftDetailsComponent = shallow(<ShiftDetailComponent
      scheduleState={{
          ...initialState,
          users: [{ id: 'user-id-1', userRoles: [] }],
          selectedShift: {
            users: [
              {
                id: 'user-id-1',
                firstName: 'Denise',
                lastName: 'Rodman',
                userRoles: [],
              },
            ],
          },
        }}
      authUser={{ userRole: 'User', userId: 'user-id-1' }}
      setNavigator={jest.fn()}
    />).dive();
    const clockEventTouchable = shiftDetailsComponent.find("[testID='clock-event-touchable']").first();
    expect(clockEventTouchable.props().disabled).toEqual(true);
  });

  it('should push a new screen edit instructions when user logged is Owner', () => {
    const shiftDetailsComponent = shallow(<ShiftDetailComponent
      authUser={{ userRole: 'Owner' }}
      scheduleState={{
          ...initialState,
          users: [{ id: 'user-id-1', userRoles: [] }],
          selectedShift: {
            users: [
              {
                id: 'user-id-1',
                firstName: 'Denise',
                lastName: 'Rodman',
                userRoles: [],
              },
            ],
          },
        }}
    />).dive();
    shiftDetailsComponent.instance().onPressInstructions({});
    expect(mockPush).toHaveBeenCalled();
  });

  describe('Clock In - Out', () => {
    let dateNowSpy;

    beforeAll(() => {
      dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => new Date(Date.UTC(2018, 3, 13)).valueOf());
    });

    afterAll(() => {
      dateNowSpy.mockReset();
      dateNowSpy.mockRestore();
    });

    it('should not render a clockIn component until 15 minutes or prior to start of the shift fixed shift', () => {
      const currentTime = moment();
      const currentTimePlusDelta = currentTime.add(15, 'minutes').add(1, 'milliseconds');
      const shift = ShiftDetailComponentTestData.getAssignedShiftsForToday()[0];
      shift.id = 'shift-id-1';
      shift.start = currentTimePlusDelta.toDate();

      const component = shallow(<ShiftDetailComponent
        authUser={{ userRole: 'Owner' }}
        scheduleState={{
            ...initialState,
            users: [{ id: 'user-id-1', userRoles: [] }],
            selectedShift: shift,
          }}
        setNavigator={jest.fn()}
      />).dive();
      component.instance().updateShiftState(shift);
      component.update();
      const clockInButton = component.find('#shift-item-clockin-shift-id-1');
      const expected = 0;
      expect(clockInButton).toHaveLength(expected);
    });

    it('should not render a clockIn component until 15 minutes or prior to start of the shift repeating shift', () => {
      const currentTime = moment();
      const currentTimePlusDelta = currentTime.add(15, 'minutes').add(1, 'milliseconds');
      const shift = ShiftDetailComponentTestData.getAssignedShiftsForToday()[1];
      shift.start = currentTimePlusDelta.toDate();

      const component = shallow(<ShiftDetailComponent
        authUser={{ userRole: 'Owner' }}
        scheduleState={{
            ...initialState,
            users: [{ id: 'user-id-1', userRoles: [] }],
            selectedShift: shift,
          }}
        setNavigator={jest.fn()}
      />).dive();
      component.instance().updateShiftState(shift);
      component.update();
      const clockInButton = component.find('#shift-item-clockin-shift-id-1');
      const expected = 0;
      expect(clockInButton).toHaveLength(expected);
    });

    it('should not render a clockIn component if greater to shift end time fixed shift', () => {
      const currentTime = moment();
      const shift = ShiftDetailComponentTestData.getAssignedShiftsForToday()[0];
      shift.id = 'shift-id-1';
      shift.start = currentTime.subtract(60, 'minutes').toDate();
      shift.end = currentTime.add(1, 'milliseconds').toDate();

      const component = shallow(<ShiftDetailComponent
        authUser={{ userRole: 'Owner' }}
        scheduleState={{
            ...initialState,
            users: [{ id: 'user-id-1', userRoles: [] }],
            selectedShift: shift,
          }}
        setNavigator={jest.fn()}
      />).dive();
      component.instance().updateShiftState(shift);
      component.update();
      const clockInButton = component.find('#shift-item-clockin-shift-id-1');
      const expected = 0;
      expect(clockInButton).toHaveLength(expected);
    });

    it('should not render a clockIn component if greater to shift end time repeatingshift', () => {
      const currentTime = moment();
      const shift = ShiftDetailComponentTestData.getAssignedShiftsForToday()[1];
      shift.start = currentTime.subtract(60, 'minutes').toDate();
      shift.end = currentTime.add(1, 'milliseconds').toDate();

      const component = shallow(<ShiftDetailComponent
        authUser={{ userRole: 'Owner' }}
        scheduleState={{
            ...initialState,
            users: [{ id: 'user-id-1', userRoles: [] }],
            selectedShift: shift,
          }}
        setNavigator={jest.fn()}
      />).dive();
      component.instance().updateShiftState(shift);
      component.update();
      const clockInButton = component.find('#shift-item-clockin-shift-id-1');
      const expected = 0;
      expect(clockInButton).toHaveLength(expected);
    });

    it('should not render a clockIn component if greater than 1 minutes prior to shift end time', () => {
      const currentTime = moment();
      const shift = ShiftDetailComponentTestData.getAssignedShiftsForToday()[0];
      shift.id = 'shift-id-1';
      shift.start = currentTime.subtract(59, 'minutes').toDate();
      shift.end = currentTime.add(1, 'minutes').toDate();

      const component = shallow(<ShiftDetailComponent
        authUser={{ userRole: 'Owner' }}
        scheduleState={{
            ...initialState,
            users: [{ id: 'user-id-1', userRoles: [] }],
            selectedShift: shift,
          }}
        setNavigator={jest.fn()}
      />).dive();
      component.instance().updateShiftState(shift);
      component.update();
      const clockInButton = component.find('#shift-item-clockin-shift-id-1');
      const expected = 0;
      expect(clockInButton).toHaveLength(expected);
    });

    it(
      'should render a clockIn component if 15 minutes prior to shift start time fixed shift' +
        ' if current user is assigned',
      () => {
        const currentTime = moment();
        const shift = ShiftDetailComponentTestData.getAssignedShiftsForToday()[0];
        shift.id = 'shift-id-1';
        shift.start = currentTime.add(15, 'minutes').toDate();
        shift.end = currentTime.add(60, 'minutes').toDate();
        shift.clockEvents = [];
        const authUser = { userId: 'user-id-1', userRole: 'Owner' };
        const component = shallow(<ShiftDetailComponent
          authUser={authUser}
          scheduleState={{
              ...initialState,
              users: [{ id: 'user-id-1', userRoles: [] }],
              selectedShift: shift,
            }}
          setNavigator={jest.fn()}
        />).dive();
        component.instance().updateShiftState(shift, authUser);
        component.update();
        const clockInButton = component.find('#shift-item-clockin-shift-id-1');
        const expected = 1;
        expect(clockInButton).toHaveLength(expected);
      },
    );

    it(
      'should render a clockIn component if 15 minutes prior to shift start time repeating shift' +
        ' if current user is assigned',
      () => {
        const currentTime = moment();
        const shift = ShiftDetailComponentTestData.getAssignedShiftsForToday()[1];
        shift.id = 'shift-id-1';
        shift.start = currentTime.add(15, 'minutes').toDate();
        shift.end = currentTime.add(60, 'minutes').toDate();
        shift.clockEvents = [];
        const authUser = { userId: 'user-id-3', userRole: 'Owner' };

        const component = shallow(<ShiftDetailComponent
          authUser={authUser}
          scheduleState={{
              ...initialState,
              users: [{ id: 'user-id-3', userRoles: [] }],
              selectedShift: shift,
            }}
          setNavigator={jest.fn()}
        />).dive();
        component.instance().updateShiftState(shift, authUser);
        component.update();
        const clockInButton = component.find('#shift-item-clockin-shift-id-1');
        const expected = 1;
        expect(clockInButton).toHaveLength(expected);
      },
    );

    it(
      'should render a clockIn component if 15 minutes prior to shift start time before end time fixed shift' +
        ' if current user is assigned',
      () => {
        const currentTime = moment();
        const shift = ShiftDetailComponentTestData.getAssignedShiftsForToday()[0];
        shift.id = 'shift-id-1';
        shift.start = currentTime.add(15, 'minutes').toDate();
        shift.end = currentTime.add(60, 'minutes').toDate();
        shift.shiftType = shiftTypeValue.fixed.value;
        shift.clockEvents = [];
        const authUser = { userId: 'user-id-1', userRole: 'Owner' };

        const component = shallow(<ShiftDetailComponent
          authUser={authUser}
          scheduleState={{
              ...initialState,
              users: [{ id: 'user-id-1', userRoles: [] }],
              selectedShift: shift,
            }}
          setNavigator={jest.fn()}
        />).dive();
        component.instance().updateShiftState(shift, authUser);
        component.update();
        const clockInButton = component.find('#shift-item-clockin-shift-id-1');
        const expected = 1;
        expect(clockInButton).toHaveLength(expected);
      },
    );

    it('should not show Clock In or Clock Out button if current user is different than user assigned', () => {
      const shift = ShiftDetailComponentTestData.getAssignedShiftsForToday()[0];
      shift.id = 'shift-id-1';
      const component = shallow(<ShiftDetailComponent
        authUser={{ id: 'user-id-12', userRole: 'Owner' }}
        scheduleState={{
            ...initialState,
            users: [{ id: 'user-id-1', userRoles: [] }],
            selectedShift: shift,
          }}
      />).dive();
      expect(component.find('#shift-item-clockin-shift-id-1')).toHaveLength(0);
      expect(component.find('#shift-item-clockOut-shift-id-1')).toHaveLength(0);
    });
  });
});
