import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';

import ShiftInstructionsComponent from './ShiftInstructionsComponent';
import type { ScheduleState } from '../../../../shared/types/reduxState.types';
import { shiftTypeValue } from '../../../../shared/types/schedule.types';

jest.unmock('ScrollView');
jest.mock('react-native-fs', () => {});

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

const navigator = {
  setStyle: jest.fn(),
  setSubTitle: jest.fn(),
  setTitle: jest.fn(),
  setOnNavigatorEvent: jest.fn(),
  addOnNavigatorEvent: jest.fn(),
  push: jest.fn(),
};

describe('ShiftInstructionsComponent', () => {
  it('should shallow render', () => {
    shallow(<ShiftInstructionsComponent
      scheduleState={initialState}
      navigator={navigator}
      setNavigator={jest.fn()}
    />).dive();
  });

  it('should show the Instructions title', () => {
    // prettier-ignore
    const shiftDetailsComponent =
      shallow(<ShiftInstructionsComponent
        scheduleState={initialState}
        navigator={navigator}
        setNavigator={jest.fn()}
      />)
        .dive();
    const title = shiftDetailsComponent.find('#instructions-title').render().text();
    expect(title).toEqual('COMMON.INSTRUCTIONS');
  });

  it('should call goBack shift when I click on done', async () => {
    const updateRepeatingShift = () => new Promise(resolve => resolve());
    const updateShift = () => new Promise(resolve => resolve());
    const getBack = jest.fn();
    const shiftDetailsComponent = shallow(<ShiftInstructionsComponent
      navigator={navigator}
      scheduleState={initialState}
      updateRepeatingShift={updateRepeatingShift}
      updateShift={updateShift}
      getBack={getBack}
      setNavigator={jest.fn()}
    />).dive();
    await shiftDetailsComponent.instance().onSave({});
    expect(getBack).not.toHaveBeenCalled();
  });

  it('should call updateRepeatingShift when I click on done and we have a repeating shift', async () => {
    let callRepeated: boolean = false;
    const updateRepeatingShift = () =>
      new Promise((resolve) => {
        callRepeated = true;
        resolve();
      });
    const updateShift = () => new Promise(resolve => resolve());
    const getBack = jest.fn();
    const shiftDetailsComponent = shallow(<ShiftInstructionsComponent
      navigator={navigator}
      scheduleState={{
        ...initialState,
        selectedShift: {
          shiftType: shiftTypeValue.repeating.value,
          users: [],
        },
      }}
      updateRepeatingShift={updateRepeatingShift}
      updateShift={updateShift}
      getBack={getBack}
      setNavigator={jest.fn()}
    />).dive();
    await shiftDetailsComponent.instance().onSave({});
    expect(callRepeated).toBe(true);
  });

  it('should call updateShift when I click on done and we have a fixed shift', async () => {
    let callFixed: boolean = false;
    const updateRepeatingShift = () =>
      new Promise((resolve) => {
        resolve();
      });
    const updateShift = () =>
      new Promise((resolve) => {
        callFixed = true;
        resolve();
      });
    const getBack = jest.fn();
    const shiftDetailsComponent = shallow(<ShiftInstructionsComponent
      navigator={navigator}
      scheduleState={{
        ...initialState,
        selectedShift: {
          shiftType: shiftTypeValue.fixed.value,
          users: [],
        },
      }}
      updateRepeatingShift={updateRepeatingShift}
      updateShift={updateShift}
      getBack={getBack}
      setNavigator={jest.fn()}
    />).dive();
    await shiftDetailsComponent.instance().onSave({});
    expect(callFixed).toBe(true);
  });
});
