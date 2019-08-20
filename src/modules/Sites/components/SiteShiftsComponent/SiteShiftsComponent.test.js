/* eslint-disable import/first */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';

import type { ScheduleState } from '../../../../shared/types/reduxState.types';
import { shiftTypeValue } from '../../../../shared/types/schedule.types';
import ScheduleComponentTestData from '../../../Schedule/components/ScheduleComponent/ScheduleComponent.testdata';
import SiteShiftTestData from './SiteShiftsComponent.testdata';
import SiteShiftsComponent from './SiteShiftsComponent';
import 'moment/locale/es';

const mockPush = jest.fn();
const mockMergeOptions = jest.fn();

jest.mock('react-native-navigation', () => ({
  Navigation: {
    events: () => ({
      bindComponent: jest.fn(),
    }),
    mergeOptions: jest.fn(() => mockMergeOptions()),
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

jest.mock('react-i18next', () => ({
  withNamespaces: () => (sComponent) => {
    const scheduleComponent = sComponent;
    scheduleComponent.defaultProps = { ...sComponent.defaultProps, t: key => key };
    return scheduleComponent;
  },
  reactI18nextModule: jest.fn(),
}));

const initialState: ScheduleState = {
  unassignedShifts: [],
  assignedShifts: [],
  users: [],
  selectedDateOnSites: { start: moment(), end: moment() },
  selectedShift: {
    users: [{ id: 'testUser' }],
  },
  selectedSite: {
    id: 1,
    customerId: 7,
  },
  shifts: [],
  loading: false,
  loadingGetShifts: false,
};

const currentUser = {
  userRole: 'Admin',
  companyId: 1,
};

describe('SiteShiftsComponent', () => {
  let initialProps;

  beforeEach(() => {
    initialProps = {
      tenant: {
        shortDateFormat: 'MMM D',
      },
      setSelectedDateOnSites: jest.fn(),
      setNavigator: jest.fn(),
    };
  });

  it('renders properly without props', () => {
    // eslint-disable-next-line max-len
    shallow(<SiteShiftsComponent
      {...initialProps}
    />).dive();
  });

  it('renders properly with scheduleState null', () => {
    shallow(<SiteShiftsComponent
      {...initialProps}
      scheduleState={null}
      getShifts={jest.fn()}
      getShift={jest.fn()}
    />).dive();
  });

  it('renders properly with a scheduleState', () => {
    shallow(<SiteShiftsComponent
      {...initialProps}
      scheduleState={initialState}
      getShifts={jest.fn()}
      getShift={jest.fn()}
    />).dive();
  });

  it('should render the subtitle with the format `MMM D, YYYY` when we have shifts for today', () => {
    const scheduleState = { ...initialState, shifts: SiteShiftTestData.getShifts() };
    const siteShiftsComponent = shallow(<SiteShiftsComponent
      {...initialProps}
      scheduleState={scheduleState}
      getShifts={jest.fn()}
      getShift={jest.fn()}
    />);

    const date: moment = moment(SiteShiftTestData.getShifts()[0]);
    siteShiftsComponent
      .dive()
      .instance()
      .updateAppBar(date);
    expect(mockMergeOptions).toHaveBeenCalled();
  });

  it('should render the subtitle with the format `MMM D, YYYY` when we have shifts for tomorrow', () => {
    const scheduleState = { ...initialState, shifts: SiteShiftTestData.getShiftsTomorrow() };
    const siteShiftsComponent = shallow(<SiteShiftsComponent
      {...initialProps}
      scheduleState={scheduleState}
      getShifts={jest.fn()}
      getShift={jest.fn()}
    />);

    const date: moment = moment(SiteShiftTestData.getShiftsTomorrow()[0]);
    siteShiftsComponent
      .dive()
      .instance()
      .updateAppBar(date);
    expect(mockMergeOptions).toHaveBeenCalledWith();
  });

  it('should render the subtitle with the format `MMM D, YYYY` when we have shifts 4 days from now', () => {
    const scheduleState = { ...initialState, shifts: SiteShiftTestData.getShifts4daysFromNow() };
    const siteShiftsComponent = shallow(<SiteShiftsComponent
      {...initialProps}
      scheduleState={scheduleState}
      getShifts={jest.fn()}
      getShift={jest.fn()}
    />);

    const date: moment = moment().add(4, 'd');
    siteShiftsComponent
      .dive()
      .instance()
      .updateAppBar(date);
    expect(mockMergeOptions).toHaveBeenCalledWith();
  });

  it('should render the subtitle with the format `MMM D, YYYY` when we have shifts 4 days from now', () => {
    const scheduleState = { ...initialState, shifts: SiteShiftTestData.getShifts() };
    const siteShiftsComponent = shallow(<SiteShiftsComponent
      {...initialProps}
      scheduleState={scheduleState}
      getShifts={jest.fn()}
      getShift={jest.fn()}
    />);

    const date: moment = moment().add(-4, 'd');
    siteShiftsComponent
      .dive()
      .instance()
      .updateAppBar(date);
    expect(mockMergeOptions).toHaveBeenCalled();
  });

  it('should called updateIcon when we have shifts', () => {
    const scheduleState = { ...initialState, shifts: SiteShiftTestData.getShifts() };
    const siteShiftsComponent = shallow(<SiteShiftsComponent
      {...initialProps}
      scheduleState={scheduleState}
      getShifts={jest.fn()}
      getShift={jest.fn()}
    />);

    siteShiftsComponent
      .dive()
      .instance()
      .updateCalendarIcon();
    expect(mockMergeOptions).toHaveBeenCalled();
  });

  describe('onShiftSelected', () => {
    it('should push a new screen when user is an admin', () => {
      const container = shallow(<SiteShiftsComponent
        {...initialProps}
        scheduleState={initialState}
        currentUser={currentUser}
        setSelectedShift={jest.fn()}
        getShifts={jest.fn()}
        getShift={jest.fn()}
      />);
      const users = [{ id: '1', userRole: 'Admin' }];
      container.setProps({
        ...container.props(),
        scheduleState: { ...container.props().scheduleState, users },
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
      const container = shallow(<SiteShiftsComponent
        {...initialProps}
        scheduleState={initialState}
        currentUser={currentUser}
        setSelectedShift={jest.fn()}
        getShifts={jest.fn()}
        getShift={jest.fn()}
      />);
      const users = [{ id: '1', userRole: 'Admin' }];
      container.setProps({
        ...container.props(),
        scheduleState: {
          ...container.props().scheduleState,
          users,
          justThisShift: true,
        },
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
      const container = shallow(<SiteShiftsComponent
        {...initialProps}
        scheduleState={initialState}
        currentUser={currentUser}
        setSelectedShift={jest.fn()}
        getShifts={jest.fn()}
        getShift={jest.fn()}
      />);
      const users = ScheduleComponentTestData.getTestUsers();
      container.setProps({
        ...container.props(),
        scheduleState: {
          ...container.props().scheduleState,
          users,
          justThisShift: true,
        },
      });
      const shift = ScheduleComponentTestData.getRepeatingShift();
      container
        .dive()
        .instance()
        .onShiftSelected(shift);
      expect(mockPush).toHaveBeenCalled();
    });

    it('should call getShift with shiftId', () => {
      const container = shallow(<SiteShiftsComponent
        {...initialProps}
        scheduleState={initialState}
        currentUser={currentUser}
        setSelectedShift={jest.fn()}
        getShifts={jest.fn()}
        getShift={jest.fn()}
      />);
      const spy = jest.spyOn(container.props(), 'getShift');
      const shift = ScheduleComponentTestData.getRepeatingShift();
      container
        .dive()
        .instance()
        .onShiftSelected(shift);
      expect(spy).toHaveBeenCalledWith(shift.id);
    });
  });

  it('should render a InfoRosieMessage at the bottom of the shift list when there are shifts', () => {
    const scheduleState = { ...initialState, shifts: SiteShiftTestData.getShifts() };
    const siteShiftsComponent = shallow(<SiteShiftsComponent
      {...initialProps}
      scheduleState={scheduleState}
      getShifts={jest.fn()}
    />).dive();

    expect(siteShiftsComponent.find('withStyles(InfoRosieMessage)').length).toBe(1);
  });

  it('should render a InfoRosieMessage at the bottom of the shift list when there are no shifts', () => {
    const scheduleState = { ...initialState, shifts: {} };
    const siteShiftsComponent = shallow(<SiteShiftsComponent
      {...initialProps}
      scheduleState={scheduleState}
      getShifts={jest.fn()}
    />).dive();

    expect(siteShiftsComponent.find('withStyles(InfoRosieMessage)').length).toBe(1);
  });

  it('should not render a InfoRosieMessage at the bottom of the shift list when a single date is selected', () => {
    const scheduleState = { ...initialState, shifts: SiteShiftTestData.getShifts() };
    const siteShiftsComponent = shallow(<SiteShiftsComponent
      {...initialProps}
      scheduleState={scheduleState}
      getShifts={jest.fn()}
    />).dive();
    siteShiftsComponent.setState({ isSingleDate: true });

    expect(siteShiftsComponent.find('withStyles(InfoRosieMessage)').length).toBe(0);
  });

  it('should render a NothingToSeeHereMessage when there are no shifts on a single date', () => {
    const scheduleState = { ...initialState, shifts: [] };
    const siteShiftsComponent = shallow(<SiteShiftsComponent
      {...initialProps}
      scheduleState={scheduleState}
      getShifts={jest.fn()}
    />).dive();
    siteShiftsComponent.setState({ isSingleDate: true });

    expect(siteShiftsComponent.find('withStyles(NothingToSeeHereMessage)').length).toBe(1);
  });

  it('should not render a NothingToSeeHereMessage when there are shifts on a single date', () => {
    const scheduleState = { ...initialState, shifts: SiteShiftTestData.getShifts() };
    const siteShiftsComponent = shallow(<SiteShiftsComponent
      {...initialProps}
      scheduleState={scheduleState}
      getShifts={jest.fn()}
    />).dive();
    siteShiftsComponent.setState({ isSingleDate: true });

    expect(siteShiftsComponent.find('withStyles(NothingToSeeHereMessage)').length).toBe(0);
  });

  it('should render a refresh indicator when refreshing the shifts', () => {
    const scheduleState = { ...initialState, shifts: [], isRefreshing: true };
    const siteShiftsComponent = shallow(<SiteShiftsComponent
      {...initialProps}
      scheduleState={scheduleState}
      getShifts={jest.fn()}
    />)
      .dive()
      .dive();
    expect(siteShiftsComponent.find('RefreshControlMock').length).toBe(1);
    expect(siteShiftsComponent
      .find('RefreshControlMock')
      .first()
      .props().refreshing).toBe(true);
  });

  it('should not render a refresh indicator when not refreshing shifts', () => {
    const scheduleState = { ...initialState, shifts: {}, isRefreshing: false };
    const siteShiftsComponent = shallow(<SiteShiftsComponent
      {...initialProps}
      scheduleState={scheduleState}
      getShifts={jest.fn()}
    />)
      .dive()
      .dive();
    expect(siteShiftsComponent
      .find('RefreshControlMock')
      .first()
      .props().refreshing).toBe(false);
  });

  it('should fetch new shifts when refreshing the list', () => {
    const setSelectedDateOnSites = jest.fn();
    const scheduleState = { ...initialState, shifts: {}, isRefreshing: true };
    const siteShiftsComponent = shallow(<SiteShiftsComponent
      {...initialProps}
      scheduleState={scheduleState}
      getShifts={jest.fn()}
      setSelectedDateOnSites={setSelectedDateOnSites}
      showRefreshingIndicator={jest.fn()}
      currentUser={currentUser}
      requestTenant={() => {}}
    />);
    const spy = jest.spyOn(siteShiftsComponent.props(), 'setSelectedDateOnSites');
    siteShiftsComponent
      .dive()
      .instance()
      .onUserScheduleRefresh();
    expect(spy).toHaveBeenCalled();
  });
});
