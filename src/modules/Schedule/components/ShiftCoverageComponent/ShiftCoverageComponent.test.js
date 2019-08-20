import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';
import MockDate from 'mockdate';

import ShiftCoverageComponent from './ShiftCoverageComponent';
import CustomIcon from '../../../../shared/customIcons/NextIcons';
import ShiftCoverageTestData from './ShiftCoverageComponent.testdata';
import type { ScheduleState } from '../../../../shared/types/reduxState.types';

jest.mock('react-native-navigation', () => ({
  Navigation: {
    events: () => ({
      bindComponent: jest.fn(),
    }),
    mergeOptions: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
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
  unassignedShifts: [],
  assignedShifts: [],
  users: [],
  usersSearchTerm: '',
  filteredUsers: [],
  selectedDate: moment(),
  selectedShift: {
    users: [{ id: 'testUser' }],
  },
};

describe('ShiftCoverageComponent', () => {
  it('renders properly without props', () => {
    shallow(<ShiftCoverageComponent />).dive();
  });

  it('renders properly with scheduleState null', () => {
    shallow(<ShiftCoverageComponent scheduleState={null} />).dive();
  });

  it('renders properly with a scheduleState', () => {
    shallow(<ShiftCoverageComponent scheduleState={initialState} />).dive();
  });

  it('should call the FlatList', () => {
    // prettier-ignore
    const shiftCoverageWrapper = shallow(<ShiftCoverageComponent
      scheduleState={initialState}

    />).dive();
    const flatListWrapper = shiftCoverageWrapper.find('FlatList').first();
    expect(flatListWrapper.length).toEqual(1);
  });

  it('should call the CustomIcon', () => {
    // prettier-ignore
    const shiftCoverageWrapper = shallow(<ShiftCoverageComponent
      scheduleState={initialState}

    />).dive();
    const customIconWrapper = shiftCoverageWrapper.find(CustomIcon);
    expect(customIconWrapper.length).toEqual(1);
  });

  it('should call the TextInput', () => {
    // prettier-ignore
    const shiftCoverageWrapper = shallow(<ShiftCoverageComponent
      scheduleState={initialState}

    />).dive();
    const textInputWrapper = shiftCoverageWrapper.find('TextInput').first();
    expect(textInputWrapper.length).toEqual(1);
  });

  it('should save the state with `user` onPressItem', () => {
    const testUser = { id: 'testUser' };
    const shiftCoverageWrapper =
      shallow(<ShiftCoverageComponent scheduleState={initialState} />).dive();
    shiftCoverageWrapper.instance().onPressItem(testUser);
    expect(shiftCoverageWrapper.instance().state.selectedUsers).toEqual([testUser]);
  });

  it('should call updateShift with the new Shift onAssign', () => {
    const updateShift = jest.fn();
    const setShiftSelectedUsers = jest.fn();
    const shiftCoverageWrapper = shallow(<ShiftCoverageComponent
      scheduleState={initialState}
      updateShift={updateShift}

      setShiftSelectedUsers={setShiftSelectedUsers}
    />).dive();

    shiftCoverageWrapper.instance().onAssign();

    expect(updateShift).toHaveBeenCalledWith({
      ...initialState.selectedShift,
      users: [...initialState.selectedShift.users],
    });
  });

  it('should call updateRepeatingShift with the new Shift onAssign', () => {
    const updateRepeatingShift = jest.fn();
    const setShiftSelectedUsers = jest.fn();
    MockDate.set(moment().toString());
    const shiftCoverageWrapper = shallow(<ShiftCoverageComponent
      scheduleState={{
          ...initialState,
          selectedShift: ShiftCoverageTestData.getRepeatingShift(),
        }}
      updateRepeatingShift={updateRepeatingShift}

      setShiftSelectedUsers={setShiftSelectedUsers}
      justThisShift
    />).dive();

    shiftCoverageWrapper.instance().onAssign();

    expect(updateRepeatingShift).toHaveBeenCalledWith({
      shift: {
        ...shiftCoverageWrapper.instance().props.scheduleState.selectedShift,
        users: shiftCoverageWrapper.instance().props.scheduleState.selectedShift.users,
      },
      allFutureShifts: !shiftCoverageWrapper.instance().props.scheduleState.justThisShift,
      returnBoundaryStart: moment().add(-15, 'hours'),
      returnBoundaryEnd: moment().add(15, 'hours'),
    });
    MockDate.reset();
  });

  // it('should call navigator.pop() when calling goBack()', () => {
  //   // prettier-ignore
  //   const shiftCoverageWrapper = shallow(<ShiftCoverageComponent
  //     scheduleState={initialState}

  //   />).dive();

  //   shiftCoverageWrapper.instance().goBack();

  //   expect(navigator.pop).toHaveBeenCalled();
  // });

  describe('isSelected()', () => {
    it('should return false when selectedShift is null', () => {
      const scheduleState = { ...initialState };
      scheduleState.selectedShift = null;
      const userId = 'testUser';
      // prettier-ignore
      const shiftCoverageWrapper = shallow(<ShiftCoverageComponent
        scheduleState={scheduleState}

      />).dive();

      expect(shiftCoverageWrapper.instance().isSelected(userId)).toBe(false);
    });
    it('should return false when selectedShift.users is null', () => {
      const scheduleState = { ...initialState };
      scheduleState.selectedShift.users = null;
      const userId = 'testUser';
      // prettier-ignore
      const shiftCoverageWrapper = shallow(<ShiftCoverageComponent
        scheduleState={scheduleState}

      />).dive();

      expect(shiftCoverageWrapper.instance().isSelected(userId)).toBe(false);
    });
    it('should return false when selectedShift.users is an empty array', () => {
      const scheduleState = { ...initialState };
      scheduleState.selectedShift.users = [];
      const userId = 'testUser';
      // prettier-ignore
      const shiftCoverageWrapper = shallow(<ShiftCoverageComponent
        scheduleState={scheduleState}

      />).dive();

      expect(shiftCoverageWrapper.instance().isSelected(userId)).toBe(false);
    });
    it('should return false when selectedShift.users[0].id is not equal to given userId', () => {
      const scheduleState = { ...initialState };
      scheduleState.selectedShift.users = [];
      const userId = 'differentTestUser';
      // prettier-ignore
      const shiftCoverageWrapper = shallow(<ShiftCoverageComponent scheduleState={scheduleState} />).dive();

      expect(shiftCoverageWrapper.instance().isSelected(userId)).toBe(false);
    });
    it('should return true when selectedShift.users[0].id is equal to given userId', () => {
      const scheduleState = { ...initialState };
      scheduleState.selectedShift.users = [{ id: 'testUser' }];
      const userId = 'testUser';
      // prettier-ignore
      const shiftCoverageWrapper = shallow(<ShiftCoverageComponent
        scheduleState={scheduleState}

      />).dive();

      expect(shiftCoverageWrapper.instance().isSelected(userId)).toBe(true);
    });
  });
});
