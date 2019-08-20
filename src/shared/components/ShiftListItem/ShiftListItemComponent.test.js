import React from 'react';
import moment from 'moment-timezone';
import { shallow } from 'enzyme';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';
import TestData from '../../testUtils/TestData';
import ShiftListItemComponent from './ShiftListItemComponent';
import ShiftListItemComponentTestData from './ShiftListItemComponent.testdata';
import { ClockEventTypes, shiftTypeValue } from '../../types/schedule.types';
import CompanyTime from '../../../shared/components/DateTime/CompanyTime';

jest.mock('react-i18next', () => ({
  withNamespaces: () => (lComponent) => {
    const loginComponent = lComponent;
    loginComponent.defaultProps = { ...lComponent.defaultProps, t: key => key };
    return loginComponent;
  },
  reactI18nextModule: jest.fn(),
}));

describe('ShiftListItemComponent', () => {
  let dateNowSpy;

  beforeAll(() => {
    const now = moment();
    dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => now.toDate().valueOf());
  });

  afterAll(() => {
    dateNowSpy.mockReset();
    dateNowSpy.mockRestore();
  });

  it('should truncate text', () => {
    const valueToTruncate = 'this will be very long so truncate me';
    const truncateLength = 25;
    const actual = ShiftListItemComponent.TruncateStringWithEllipsis(valueToTruncate, truncateLength);
    expect(actual).toHaveLength(truncateLength);
  });

  it('should truncate text to end with elipsis', () => {
    const valueToTruncate = 'this will be very long so truncate me';
    const truncateLength = 25;
    const actual = ShiftListItemComponent.TruncateStringWithEllipsis(valueToTruncate, truncateLength);
    const expected = 'this will be very long...';
    expect(actual).toBe(expected);
  });

  it('should not render a clockIn component if no clockIn method is specified fixedshift', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={undefined} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const clockInButton = component.find('#shift-list-item-clockin-shift-id-1');
    const expected = 0;
    expect(clockInButton).toHaveLength(expected);
  });

  it('should not render a clockIn component if no clockIn method is specified repeatingshift', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[12];
    shift.id = 'shift-id-1';

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={undefined} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const clockInButton = component.find('#shift-list-item-clockin-shift-id-1');
    const expected = 0;
    expect(clockInButton).toHaveLength(expected);
  });

  it('should not render a clockIn component until 15 minutes or prior to start of the shift fixedshift', () => {
    const currentTime = moment();
    const currentTimePlusDelta = currentTime.add(15, 'minutes').add(1, 'milliseconds');
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = currentTimePlusDelta.toDate();
    // shift.clockEvents = {};

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const clockInButton = component.find('#shift-list-item-clockin-shift-id-1');
    const expected = 0;
    expect(clockInButton).toHaveLength(expected);
  });

  it('should not render a clockIn component until 15 minutes or prior to start of the shift repeatingshift', () => {
    const currentTime = moment();
    const currentTimePlusDelta = currentTime.add(15, 'minutes').add(1, 'milliseconds');
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[12];
    shift.id = 'shift-id-1';
    shift.start = currentTimePlusDelta.toDate();

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const clockInButton = component.find('#shift-list-item-clockin-shift-id-1');
    const expected = 0;
    expect(clockInButton).toHaveLength(expected);
  });

  it('should canClockOut if a clockOut method is specified and the shift is clocked in fixedshift', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).toDate();
    shift.end = moment(currentTime)
      .add(60, 'minutes')
      .toDate();
    shift.clockEvents = [
      {
        id: 'clockevent-id-1',
        eventTime: moment(currentTime).toDate(),
        eventType: ClockEventTypes.ClockIn,
        userId: 'user-id-3',
      },
    ];

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const clockOutButton = component.find('#shift-list-item-clockout-shift-id-1');
    const expected = 1;
    expect(clockOutButton).toHaveLength(expected);
  });

  it(
    'should render a clockOut component if a clockOut method is ' +
      'specified and the shift is clocked in repeatingshift',
    () => {
      const currentTime = moment();
      const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[12];
      shift.id = 'shift-id-1';
      shift.start = moment(currentTime).toDate();
      shift.end = moment(currentTime)
        .add(60, 'minutes')
        .toDate();
      shift.clockEvents = [
        {
          id: 'clockevent-id-1',
          eventTime: moment(currentTime).toDate(),
          eventType: ClockEventTypes.ClockIn,
          userId: 'user-id-3',
        },
      ];

      const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
      component.instance().updateShiftState();
      component.update();
      const clockOutButton = component.find('#shift-list-item-clockout-shift-id-1');
      const expected = 1;
      expect(clockOutButton).toHaveLength(expected);
    },
  );

  it('should render a clockOut component if shift is fixed shift', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).toDate();
    shift.end = moment(currentTime)
      .add(60, 'minutes')
      .toDate();
    shift.clockEvents = [
      {
        id: 'clockevent-id-1',
        eventTime: moment(currentTime).toDate(),
        eventType: ClockEventTypes.ClockIn,
        userId: 'user-id-3',
      },
    ];
    shift.shiftType = shiftTypeValue.fixed.value;

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const clockOutButton = component.find('#shift-list-item-clockout-shift-id-1');
    const expected = 1;
    expect(clockOutButton).toHaveLength(expected);
  });

  it('should render a clockOut component if shift is repeating shift', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[12];
    shift.id = 'shift-id-1';
    shift.start = moment(currentTime).toDate();
    shift.end = moment(currentTime)
      .add(60, 'minutes')
      .toDate();
    shift.clockEvents = [
      {
        id: 'clockevent-id-1',
        eventTime: moment(currentTime).toDate(),
        eventType: ClockEventTypes.ClockIn,
        userId: 'user-id-3',
      },
    ];
    shift.shiftType = shiftTypeValue.fixed.value;

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const clockOutButton = component.find('#shift-list-item-clockout-shift-id-1');
    const expected = 1;
    expect(clockOutButton).toHaveLength(expected);
  });

  it('should not render a clockIn component if greater to shift end time fixedshift', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = currentTime.subtract(60, 'minutes').toDate();
    shift.end = currentTime.add(1, 'milliseconds').toDate();

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const clockInButton = component.find('#shift-list-item-clockin-shift-id-1');
    const expected = 0;
    expect(clockInButton).toHaveLength(expected);
  });

  it('should not render a clockIn component if greater to shift end time repeatingshift', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[12];
    shift.id = 'shift-id-1';
    shift.start = currentTime.subtract(60, 'minutes').toDate();
    shift.end = currentTime.add(1, 'milliseconds').toDate();

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const clockInButton = component.find('#shift-list-item-clockin-shift-id-1');
    const expected = 0;
    expect(clockInButton).toHaveLength(expected);
  });

  it('should not render a clockIn component if greater than 1 minutes prior to shift end time', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = currentTime.subtract(59, 'minutes').toDate();
    shift.end = currentTime.add(1, 'minutes').toDate();

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const clockInButton = component.find('#shift-list-item-clockin-shift-id-1');
    const expected = 0;
    expect(clockInButton).toHaveLength(expected);
  });

  it('should not render a clockOut component if no clockOut method is specified fixedshift', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={undefined} />).dive();
    component.instance().updateShiftState();
    component.update();
    const clockOutButton = component.find('#shift-list-item-clockout-shift-id-1');
    const expected = 0;
    expect(clockOutButton).toHaveLength(expected);
  });

  it('should not render a clockOut component if no clockOut method is specified repeatingshift', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[12];
    shift.id = 'shift-id-1';

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={undefined} />).dive();
    component.instance().updateShiftState();
    component.update();
    const clockOutButton = component.find('#shift-list-item-clockout-shift-id-1');
    const expected = 0;
    expect(clockOutButton).toHaveLength(expected);
  });

  it('should render a clockIn component if 15 minutes prior to shift start time fixedshift', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    shift.start = currentTime.add(15, 'minutes').toDate();
    shift.end = currentTime.add(60, 'minutes').toDate();
    shift.clockEvents = [];

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const clockInButton = component.find('#shift-list-item-clockin-shift-id-1');
    const expected = 1;
    expect(clockInButton).toHaveLength(expected);
  });

  it('should render a clockIn component if 15 minutes prior to shift start time repeatingshift', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[12];
    shift.id = 'shift-id-1';
    shift.start = currentTime.add(15, 'minutes').toDate();
    shift.end = currentTime.add(60, 'minutes').toDate();
    shift.clockEvents = [];

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const clockInButton = component.find('#shift-list-item-clockin-shift-id-1');
    const expected = 1;
    expect(clockInButton).toHaveLength(expected);
  });

  it('should render a clockIn component if 15 minutes prior to shift start time before end time fixedshift', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];

    shift.id = 'shift-id-1';
    shift.start = currentTime.add(15, 'minutes').toDate();
    shift.end = currentTime.add(60, 'minutes').toDate();
    shift.shiftType = shiftTypeValue.fixed.value;

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const clockInButton = component.find('#shift-list-item-clockin-shift-id-1');
    const expected = 1;
    expect(clockInButton).toHaveLength(expected);
  });

  it('should hide clockIn and clockOut components if not enabled', () => {
    const currentTime = moment();
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];

    shift.id = 'shift-id-1';
    shift.start = currentTime.add(15, 'minutes').toDate();
    shift.end = currentTime.add(60, 'minutes').toDate();
    shift.shiftType = shiftTypeValue.fixed.value;

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    component.setState({ clockButtonEnabled: false });
    const clockInButton = component.find('#shift-list-item-clockin-shift-id-1');
    const clockOutButton = component.find('#shift-list-item-clockout-shift-id-1');
    const expected = 0;
    expect(clockInButton).toHaveLength(expected);
    expect(clockOutButton).toHaveLength(expected);
  });

  it('should not render Complete if before shift starts', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';

    shift.start = moment(shift.start).add(1, 'hours');
    shift.end = moment(shift.start).add(1, 'hours');
    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const completeText = component.find('#shift-list-item-complete-text-shift-id-1');
    const expected = 0;
    expect(completeText).toHaveLength(expected);
  });

  it('should not render Complete if before shift ends', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[2];
    shift.id = 'shift-id-1';

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const completeText = component.find('#shift-list-item-complete-text-shift-id-1');
    const expected = 0;
    expect(completeText).toHaveLength(expected);
  });

  it('should not render Complete if before shift ends 1 clockin 0 clockout', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[11];
    shift.id = 'shift-id-1';

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const completeText = component.find('#shift-list-item-complete-text-shift-id-1');
    const expected = 0;
    expect(completeText).toHaveLength(expected);
  });

  it('should not render Complete if before shift ends 1 clockin 1 clockout', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[10];
    shift.id = 'shift-id-1';

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const completeText = component.find('#shift-list-item-complete-text-shift-id-1');
    const expected = 0;
    expect(completeText).toHaveLength(expected);
  });

  it('should not render Complete if before shift ends 2 clockin 1 clockout', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[9];
    shift.id = 'shift-id-1';

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const completeText = component.find('#shift-list-item-complete-text-shift-id-1');
    const expected = 0;
    expect(completeText).toHaveLength(expected);
  });

  it('should not render Complete if before shift ends 2 clockin 2 clockout', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[8];
    shift.id = 'shift-id-1';

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const completeText = component.find('#shift-list-item-complete-text-shift-id-1');
    const expected = 0;
    expect(completeText).toHaveLength(expected);
  });

  it('should not render Complete if before shift ends', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[2];
    shift.id = 'shift-id-1';

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const completeText = component.find('#shift-list-item-complete-text-shift-id-1');
    const expected = 0;
    expect(completeText).toHaveLength(expected);
  });

  it('should render Complete after shift ends and 1 clockin 1 clockout', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[4];
    shift.id = 'shift-id-1';
    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const completeText = component.find('#shift-list-item-complete-text-shift-id-1');
    const expected = 1;
    expect(completeText).toHaveLength(expected);
  });

  it('should not render Complete after shift ends and 2 clockin 1 clockout', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[5];
    shift.id = 'shift-id-1';

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const completeText = component.find('#shift-list-item-complete-text-shift-id-1');
    const expected = 0;
    expect(completeText).toHaveLength(expected);
  });

  it('should render Complete after shift ends and 2 clockin 2 clockout', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[6];
    shift.id = 'shift-id-1';

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const completeText = component.find('#shift-list-item-complete-text-shift-id-1');
    const expected = 1;
    expect(completeText).toHaveLength(expected);
  });

  it('should not render Complete before shift ends and 1 clockin 0 clockout', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[6];
    shift.id = 'shift-id-1';

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const completeText = component.find('#shift-list-item-complete-text-shift-id-1');
    const expected = 1;
    expect(completeText).toHaveLength(expected);
  });

  it('should render Complete 1 second after shift ends', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[4];
    shift.id = 'shift-id-1';
    shift.start = moment().add(-1, 'hours');
    shift.end = moment().add(2, 'seconds');
    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    let completeText = component.find('#shift-list-item-complete-text-shift-id-1');
    expect(completeText).toHaveLength(0);
    setTimeout(() => {
      component.instance().updateShiftState();
      component.update();
      completeText = component.find('#shift-list-item-complete-text-shift-id-1');
      expect(completeText).toHaveLength(1);
    }, 2000);
  });

  it('should not render Incomplete if before shift starts', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[2];
    shift.id = 'shift-id-1';

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    const completeText = component.find('#shift-list-item-incomplete-text-shift-id-1');
    const expected = 0;
    expect(completeText).toHaveLength(expected);
  });

  it('should not render Incomplete if before shift ends', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[3];
    shift.id = 'shift-id-1';

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    const completeText = component.find('#shift-list-item-incomplete-text-shift-id-1');
    const expected = 0;
    expect(completeText).toHaveLength(expected);
  });

  it('should render Incomplete if after shift ends and no clock events', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[1];
    shift.id = 'shift-id-1';

    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    const completeText = component.find('#shift-list-item-incomplete-text-shift-id-1');
    const expected = 1;
    expect(completeText).toHaveLength(expected);
  });

  it('should render Incomplete 1 second after shift ends', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[1];
    shift.id = 'shift-id-1';
    shift.start = moment().add(-1, 'hours');
    shift.end = moment().add(2, 'seconds');
    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    component.update();
    let completeText = component.find('#shift-list-item-incomplete-text-shift-id-1');
    expect(completeText).toHaveLength(0);
    setTimeout(() => {
      component.instance().updateShiftState();
      component.update();
      completeText = component.find('#shift-list-item-incomplete-text-shift-id-1');
      expect(completeText).toHaveLength(1);
    }, 2000);
  });

  it('should have a repeating-icon in card when the shift is of type repeating', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[12];
    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    const repeatingIcon = component.find('#repeating-icon');
    const expected = 1;
    expect(repeatingIcon).toHaveLength(expected);
  });

  it('should not have a repeating-icon in card when the shift is of type fixed', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[3];
    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    const repeatingIcon = component.find('#repeating-icon');
    const expected = 0;
    expect(repeatingIcon).toHaveLength(expected);
  });

  it('should display starting and ending times correctly with the default TimeZone.', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[1];

    const store = createMockStore({
      tenant: {
        timeFormat: 'h:mm A',
      },
    });

    const wrapper = shallowWithStore(
      <ShiftListItemComponent
        shift={shift}
        clockIn={() => {}}
        clockOut={() => {}}
      />
      , store,
    ).dive();
    wrapper.instance().updateShiftState();
    wrapper.update();
    const prefixTextBox = wrapper.find(CompanyTime).at(0).dive().dive();
    const suffixTextBox = wrapper.find(CompanyTime).at(1).dive().dive();
    const prefixText = prefixTextBox.text();
    const suffixText = suffixTextBox.text();

    const formattedStart: string = shift ? moment(shift.start).format('h:mm A') : '';
    const formattedEnd: string = shift ? moment(shift.end).format('h:mm A') : '';
    const formattedTimezone: string = shift ? moment.tz(shift.siteTimeZone).format('z') : '';

    const expected: string = `${formattedStart} - ${formattedEnd} ${formattedTimezone} `;
    const result: string = `${prefixText} - ${suffixText} `;
    expect(result).toBe(expected);
  });

  it('should display starting and ending times correctly with the abbreviation for America/New_York.', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[1];
    shift.siteTimeZone = 'America/New_York';

    const store = createMockStore({
      tenant: {
        timeFormat: 'h:mm A',
      },
    });

    const wrapper = shallowWithStore(
      <ShiftListItemComponent
        exception={false}
        shift={shift}
        clockIn={() => {}}
        clockOut={() => {}}
      />
      , store,
    ).dive();
    wrapper.instance().updateShiftState();
    wrapper.update();
    const prefixTextBox = wrapper.find(CompanyTime).at(0).dive().dive();
    const suffixTextBox = wrapper.find(CompanyTime).at(1).dive().dive();
    const prefixText = prefixTextBox.text();
    const suffixText = suffixTextBox.text();

    const formattedStart: string = shift ? moment(shift.start).format('h:mm A') : '';
    const formattedEnd: string = shift ? moment(shift.end).format('h:mm A') : '';
    const formattedTimezone: string = shift ? moment.tz(shift.siteTimeZone).format('z') : '';

    const expected: string = `${formattedStart} - ${formattedEnd} ${formattedTimezone} `;
    const result: string = `${prefixText} - ${suffixText} `;
    expect(result).toBe(expected);
  });

  it('should display the users name', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[1];
    shift.siteTimeZone = 'America/New_York';

    const component = shallow(<ShiftListItemComponent
      shift={shift}
      clockIn={() => {}}
      clockOut={() => {}}
      exception
    />).dive();

    const completeNameText = component
      .find({ id: 'shift-list-item-name' })
      .dive()
      .render()
      .text();
    const expected: string = `${shift.users[0].firstName} ${shift.users[0].lastName}`;
    expect(completeNameText).toBe(expected);
  });

  it('should indicate a shift is active if now is between start and end', () => {
    const timeNow = moment();
    const startTime = moment(timeNow).add(-1, 'hours');
    const endTime = moment(timeNow).add(1, 'hours');

    const shouldIndicateActive = ShiftListItemComponent.isShiftActive(timeNow, startTime, endTime);

    expect(shouldIndicateActive).toBe(true);
  });

  it('should indicate a shift is active if now is at start', () => {
    const timeNow = moment();
    const startTime = moment(timeNow);
    const endTime = moment(timeNow).add(1, 'hours');

    const shouldIndicateActive = ShiftListItemComponent.isShiftActive(timeNow, startTime, endTime);

    expect(shouldIndicateActive).toBe(true);
  });

  it('should indicate a shift is active if now is 1 second before end', () => {
    const timeNow = moment();
    const startTime = moment(timeNow).add(-1, 'hours');
    const endTime = moment(timeNow).add(1, 'seconds');

    const shouldIndicateActive = ShiftListItemComponent.isShiftActive(timeNow, startTime, endTime);

    expect(shouldIndicateActive).toBe(true);
  });

  it('should indicate a shift is inactive if now is 1 second before start', () => {
    const timeNow = moment();
    const startTime = moment(timeNow).add(1, 'seconds');
    const endTime = moment(timeNow).add(1, 'hours');

    const shouldIndicateActive = ShiftListItemComponent.isShiftActive(timeNow, startTime, endTime);

    expect(shouldIndicateActive).toBe(false);
  });

  it('should indicate a shift is active if now is 1 second after start', () => {
    const timeNow = moment();
    const startTime = moment(timeNow).add(-1, 'seconds');
    const endTime = moment(timeNow).add(1, 'hours');

    const shouldIndicateActive = ShiftListItemComponent.isShiftActive(timeNow, startTime, endTime);

    expect(shouldIndicateActive).toBe(true);
  });

  it('should indicate a shift is inactive if now is equal to end', () => {
    const timeNow = moment();
    const startTime = moment(timeNow).add(-1, 'hours');
    const endTime = moment(timeNow);

    const shouldIndicateActive = ShiftListItemComponent.isShiftActive(timeNow, startTime, endTime);

    expect(shouldIndicateActive).toBe(false);
  });

  it('should indicate a shift is inactive if now is 1 second after end', () => {
    const timeNow = moment();
    const startTime = moment(timeNow).add(-1, 'hours');
    const endTime = moment(timeNow).add(-1, 'seconds');

    const shouldIndicateActive = ShiftListItemComponent.isShiftActive(timeNow, startTime, endTime);

    expect(shouldIndicateActive).toBe(false);
  });

  it('should indicate a shift is inactive if now well before start', () => {
    const timeNow = moment();
    const startTime = moment(timeNow).add(1, 'hours');
    const endTime = moment(timeNow).add(2, 'hours');

    const shouldIndicateActive = ShiftListItemComponent.isShiftActive(timeNow, startTime, endTime);

    expect(shouldIndicateActive).toBe(false);
  });

  it('should indicate a shift is inactive if now well after end', () => {
    const timeNow = moment();
    const startTime = moment(timeNow).add(-2, 'hours');
    const endTime = moment(timeNow).add(-1, 'hours');

    const shouldIndicateActive = ShiftListItemComponent.isShiftActive(timeNow, startTime, endTime);

    expect(shouldIndicateActive).toBe(false);
  });

  it('should update a shift to active within 1 second of start time', () => {
    // shift starts in 2 seconds
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[13];
    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.instance().updateShiftState();
    expect(component.state('isActive')).toBe(false);
    // shift should be active after 3 seconds
    setTimeout(() => {
      expect(component.state('isActive')).toBe(true);
    }, 3000);
  });

  it('should show the clock in button if canClockIn', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={undefined} clockOut={() => {}} />).dive();
    component.setState({
      canClockIn: true,
    });
    const clockInButton = component.find('#shift-list-item-clockin-shift-id-1');
    expect(clockInButton).toHaveLength(1);
  });

  it('should not show the clock in button if canClockIn is false', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.setState({
      canClockIn: false,
    });
    const clockInButton = component.find('#shift-list-item-clockin-shift-id-1');
    expect(clockInButton).toHaveLength(0);
  });

  it('should show the clock out button if canClockOut', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.setState({
      canClockOut: true,
    });
    const clockOutButton = component.find('#shift-list-item-clockout-shift-id-1');
    expect(clockOutButton).toHaveLength(1);
  });

  it('should not show the clock out button if canClockOut is false', () => {
    const shift = ShiftListItemComponentTestData.getAssignedShiftsForToday()[0];
    shift.id = 'shift-id-1';
    const component = shallow(<ShiftListItemComponent shift={shift} clockIn={() => {}} clockOut={() => {}} />).dive();
    component.setState({
      canClockOut: false,
    });
    const clockOutButton = component.find('#shift-list-item-clockout-shift-id-1');
    expect(clockOutButton).toHaveLength(0);
  });

  it('should show the time display with a shift with a clock out ', () => {
    const shift = TestData.getShiftOnlyClockOut();
    const component = shallow(<ShiftListItemComponent exception shift={shift} />).dive();

    const displayTime = '0 / 5 hrs';
    const time = component
      .find({ id: 'display-hours' }).dive().render().text();

    expect(time).toBe(displayTime);
  });

  it('should show the time display with a shift with a clock in ', () => {
    const shift = TestData.getShiftOnlyClockIn();
    const component = shallow(<ShiftListItemComponent exception shift={shift} />).dive();

    const displayTime = '0 / 5 hrs';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();

    expect(time).toBe(displayTime);
  });

  it('should show the time display with a shift with a pair clock in - clock out', () => {
    const shift = TestData.getShiftOnePairClockEvent();
    const component = shallow(<ShiftListItemComponent exception shift={shift} />).dive();

    const displayTime = '1 / 5 hrs';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();

    expect(time).toBe(displayTime);
  });

  it('should show the time display with a shift with multiples pairs clock in - clock out', () => {
    const shift = TestData.getShiftMultipleClockEvents();
    const component = shallow(<ShiftListItemComponent exception shift={shift} />).dive();

    const displayTime = '2 / 5 hrs';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();
    expect(time).toBe(displayTime);
  });

  it('should show the time display with a shift with odd pairs clock in - clock out', () => {
    const shift = TestData.getShiftOddClockEvents();
    const component = shallow(<ShiftListItemComponent exception shift={shift} />).dive();

    const displayTime = '2 / 5 hrs';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();
    expect(time).toBe(displayTime);
  });

  it('should round up the time 2.6 when the sum gives 2.566', () => {
    const shift = TestData.getShiftRoundedUpClockEvents()[0];
    const component = shallow(<ShiftListItemComponent exception shift={shift} />).dive();

    const displayTime = '2.6 / 5 hrs';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();
    expect(time).toBe(displayTime);
  });

  it('should round up the time 2.6 when the sum gives 2.5333', () => {
    const shift = TestData.getShiftRoundedUpClockEvents()[1];
    const component = shallow(<ShiftListItemComponent exception shift={shift} />).dive();

    const displayTime = '2.6 / 5 hrs';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();
    expect(time).toBe(displayTime);
  });

  it('should display the text with the styledRed - total actual hours > scheduled shift duration ', () => {
    const shift = TestData.getShiftMoreHoursWorkedClockEvents();
    const component = shallow(<ShiftListItemComponent exception shift={shift} />).dive();

    const styles = component
      .find({ id: 'display-hours' })
      .dive()
      .props().style;
    expect(styles.length).toBe(2);
  });

  it('should display the text with the styledRed of budgeted hours if its a flexFixed shift ', () => {
    const shift = TestData.getShiftMoreHoursWorkedClockEvents();
    const budgetedHours = 6;
    shift.shiftType = shiftTypeValue.flexFixed.value;
    shift.budgetedHours = budgetedHours;
    const component = shallow(<ShiftListItemComponent exception shift={shift} />).dive();

    const displayedTime = `10 / ${budgetedHours} hrs`;
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();

    expect(time).toBe(displayedTime);
  });

  it('should display the text with the styledRed of budgeted hours if its a flexRepeating shift ', () => {
    const shift = TestData.getShiftMoreHoursWorkedClockEvents();
    const budgetedHours = 6;
    shift.shiftType = shiftTypeValue.flexRepeating.value;
    shift.budgetedHours = budgetedHours;
    const component = shallow(<ShiftListItemComponent exception shift={shift} />).dive();

    const displayedTime = `10 / ${budgetedHours} hrs`;
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();

    expect(time).toBe(displayedTime);
  });

  it('should not display the text with the styledRed of budgeted hours if its a repeating shift ', () => {
    const shift = TestData.getShiftMoreHoursWorkedClockEvents();
    const budgetedHours = 6;
    shift.shiftType = shiftTypeValue.repeating.value;
    shift.budgetedHours = budgetedHours;
    const component = shallow(<ShiftListItemComponent exception shift={shift} />).dive();

    const displayedTime = '10 / 5 hrs';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();

    expect(time).toBe(displayedTime);
  });

  it('should not display the text with the styledRed of budgeted hours if its a fixed shift ', () => {
    const shift = TestData.getShiftMoreHoursWorkedClockEvents();
    const budgetedHours = 6;
    shift.shiftType = shiftTypeValue.fixed.value;
    shift.budgetedHours = budgetedHours;
    const component = shallow(<ShiftListItemComponent exception shift={shift} />).dive();

    const displayedTime = '10 / 5 hrs';
    const time = component
      .find({ id: 'display-hours' })
      .dive()
      .render()
      .text();

    expect(time).toBe(displayedTime);
  });
});
