import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';
import workTicketStatusConstants from '@next/schedule/lib/constants/work';
import WorkTicketDetailComponent from './WorkTicketDetailComponent';

const navigator = {
  addOnNavigatorEvent: jest.fn(),
  setStyle: jest.fn(),
  pop: jest.fn(),
};

const site = {
  siteId: 1,
  id: 1,
};


const initialState = ({ status, dueDate }) => ({
  workTicket: {
    workTicketStatus: { status, modified: moment(), modifiedBy: 'John Doe' },
    users: [],
    dueDate,
    site,
    customer: {},
  },
  sites: [site],
});

const initialState2 = {
  workTicket: {
    workTicketStatus: {},
    users: [],
    site,
    customer: {},
  },
  sites: [site],
};

jest.mock('react-i18next', () => ({
  withNamespaces: () => (lComponent) => {
    const loginComponent = lComponent;
    loginComponent.defaultProps = { ...lComponent.defaultProps, t: key => key };
    return loginComponent;
  },
  reactI18nextModule: jest.fn(),
}));

describe('WorkTicketDetailComponent', () => {
  it('should shallow render', () => {
    shallow(<WorkTicketDetailComponent />);
  });

  it('should put OPEN status on the status text component', () => {
    // prettier-ignore
    const workDetailComponent = shallow(<WorkTicketDetailComponent
      {...initialState({ status: workTicketStatusConstants.open })}
      navigator={navigator}
      tenant={{ shortDateFormat: 'MMM D' }}
    />).dive();

    expect(workDetailComponent.find('#status-text')).toHaveLength(1);
    expect(workDetailComponent.find('#status-text').props().children).toBe('COMMON.OPEN');
  });

  it('should put CLOSED status on the status text component', () => {
    // prettier-ignore
    const workDetailComponent = shallow(<WorkTicketDetailComponent
      {...initialState({ status: workTicketStatusConstants.closed })}
      navigator={navigator}
      tenant={{ timeFormat: null, shortDateFormat: 'MMM D' }}
    />).dive();

    expect(workDetailComponent.find('#status-text')).toHaveLength(1);
    expect(workDetailComponent.find('#status-text').props().children).toBe('COMMON.CLOSE');
  });

  it('should not render modified text component when it is open', () => {
    // prettier-ignore
    const workDetailComponent = shallow(<WorkTicketDetailComponent
      {...initialState({ status: workTicketStatusConstants.open })}
      navigator={navigator}
      tenant={{ shortDateFormat: 'MMM D' }}
    />).dive();

    expect(workDetailComponent.find('#modified-text')).toHaveLength(0);
  });

  it('should not render modified text component when no modified and modifiedBy are passed', () => {
    const workDetailComponent = shallow(<WorkTicketDetailComponent
      {...initialState2}
      navigator={navigator}
      tenant={{ shortDateFormat: 'MMM D' }}
    />).dive();

    expect(workDetailComponent.find('#modified-text')).toHaveLength(0);
  });

  it('should render modified text component when work is closed and modified or modifiedBy are passed as props', () => {
    // prettier-ignore
    const workDetailComponent = shallow(<WorkTicketDetailComponent
      {...initialState({ status: workTicketStatusConstants.closed })}
      navigator={navigator}
      tenant={{ timeFormat: null, shortDateFormat: 'MMM D' }}
    />).dive();

    expect(workDetailComponent.find('#modified-text')).toHaveLength(1);
  });

  it('should call the updateWorkTicket when status button is pressed', () => {
    const callBackFunction = jest.fn();
    // prettier-ignore
    const workDetailComponent = shallow(<WorkTicketDetailComponent
      {...initialState({ status: workTicketStatusConstants.closed })}
      navigator={navigator}
      updateWorkTicket={callBackFunction}
      tenant={{ timeFormat: null, shortDateFormat: 'MMM D' }}
    />).dive();

    workDetailComponent.find('#change-status-button').simulate('press');
    expect(callBackFunction).toHaveBeenCalled();
  });

  it('should render due date section title once', () => {
    // prettier-ignore
    const workDetailComponent = shallow(<WorkTicketDetailComponent
      {...initialState({ status: workTicketStatusConstants.closed })}
      navigator={navigator}
      tenant={{ timeFormat: null, shortDateFormat: 'MMM D' }}
    />).dive();

    expect(workDetailComponent.find('#dd-section-title')).toHaveLength(1);
    expect(workDetailComponent.find('#dd-section-title').props().children).toBe('COMMON.DUE_DATE');
  });

  it('should render due date calendar icon once', () => {
    // prettier-ignore
    const workDetailComponent = shallow(<WorkTicketDetailComponent
      {...initialState({ status: workTicketStatusConstants.closed })}
      navigator={navigator}
      tenant={{ timeFormat: null, shortDateFormat: 'MMM D' }}
    />).dive();

    expect(workDetailComponent.find('#dd-section-icon')).toHaveLength(1);
    expect(workDetailComponent.find('#dd-section-icon').props().name).toBe('calendar');
  });

  it('should render due date text once', () => {
    // prettier-ignore
    const workDetailComponent = shallow(<WorkTicketDetailComponent
      {...initialState({ status: workTicketStatusConstants.closed, dueDate: moment('2018-08-07') })}
      navigator={navigator}
      tenant={{ timeFormat: null, shortDateFormat: 'MMM D' }}
    />).dive();

    expect(workDetailComponent.find('#dd-section-text')).toHaveLength(1);
    expect(workDetailComponent.find('#dd-section-text').props().children).toBe('Tue Aug 7');
  });

  it('should render due date diff as today when passed today through props', () => {
    // prettier-ignore
    const workDetailComponent = shallow(<WorkTicketDetailComponent
      {...initialState({ status: workTicketStatusConstants.closed, dueDate: moment() })}
      navigator={navigator}
      tenant={{ timeFormat: null, shortDateFormat: 'MMM D' }}
    />).dive();

    expect(workDetailComponent.find('#dd-section-diff')).toHaveLength(1);
    expect(workDetailComponent.find('#dd-section-diff').props().children).toBe('COMMON.TODAY');
  });

  it('should render due date diff as "in 1 day" when passed 1 day through props', () => {
    // prettier-ignore
    const workDetailComponent = shallow(<WorkTicketDetailComponent
      {...initialState({ status: workTicketStatusConstants.closed, dueDate: moment().add(1, 'd') })}
      navigator={navigator}
      tenant={{ timeFormat: null, shortDateFormat: 'MMM D' }}
    />).dive();

    expect(workDetailComponent.find('#dd-section-diff')).toHaveLength(1);
    expect(workDetailComponent.find('#dd-section-diff').props().children).toBe('in 1 day');
  });

  it('should render due date diff as "in X days" when passed X days through props, and 1<X<11', () => {
    // prettier-ignore
    const workDetailComponent = shallow(<WorkTicketDetailComponent
      {...initialState({ status: workTicketStatusConstants.closed, dueDate: moment().add(4, 'd') })}
      navigator={navigator}
      tenant={{ timeFormat: null, shortDateFormat: 'MMM D' }}
    />).dive();

    expect(workDetailComponent.find('#dd-section-diff')).toHaveLength(1);
    expect(workDetailComponent.find('#dd-section-diff').props().children).toBe('in 4 days');
  });

  it('should not render due date diff when passed X days through props, and X>10', () => {
    // prettier-ignore
    const workDetailComponent = shallow(<WorkTicketDetailComponent
      {...initialState({ status: workTicketStatusConstants.closed, dueDate: moment().add(11, 'd') })}
      navigator={navigator}
      tenant={{ timeFormat: null, shortDateFormat: 'MMM D' }}
    />).dive();

    expect(workDetailComponent.find('#dd-section-diff')).toHaveLength(1);
    expect(workDetailComponent.find('#dd-section-diff').props().children).toBe('');
  });

  it('should render due date diff as "Past Due" when passed X days through props, and X is before today', () => {
    // prettier-ignore
    const workDetailComponent = shallow(<WorkTicketDetailComponent
      {...initialState({
        status: workTicketStatusConstants.closed,
        dueDate: moment().subtract(1, 'd'),
      })}
      navigator={navigator}
      tenant={{ timeFormat: null, shortDateFormat: 'MMM D' }}
    />).dive();

    expect(workDetailComponent.find('#dd-section-diff')).toHaveLength(1);
    expect(workDetailComponent.find('#dd-section-diff').props().children).toBe('Past Due');
  });

  it('should render due date diff as "Past Due" when passed X days through props, and X is before today. Case2', () => {
    // prettier-ignore
    const workDetailComponent = shallow(<WorkTicketDetailComponent
      {...initialState({ status: workTicketStatusConstants.closed, dueDate: moment().subtract(100, 'd') })}
      navigator={navigator}
      tenant={{ timeFormat: null, shortDateFormat: 'MMM D' }}
    />).dive();

    expect(workDetailComponent.find('#dd-section-diff')).toHaveLength(1);
    expect(workDetailComponent.find('#dd-section-diff').props().children).toBe('Past Due');
  });
});
