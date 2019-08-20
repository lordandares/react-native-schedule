// @flow
import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';
import workTicketStatusConstants from '@next/schedule/lib/constants/work';
import WorkTicketItemComponent from './WorkTicketItemComponent';

describe('WorkTicketSummaryComponent', () => {
  const tenant = { shortDateFormat: 'MMM D' };

  it('should shallow render', () => {
    shallow(<WorkTicketItemComponent />);
  });

  it('should render an avatar when the work has no user assigned', () => {
    const workListItemComponent = shallow(<WorkTicketItemComponent work={{}} tenant={tenant} />).dive();

    expect(workListItemComponent.find('Avatar').length).toBe(1);
  });

  it('should not pass a name as a props to the avatar when the work has no user assigned', () => {
    const workListItemComponent = shallow(<WorkTicketItemComponent work={{}} tenant={tenant} />).dive();

    expect(workListItemComponent.find('Avatar').props().name).toBeUndefined();
  });

  it('should render an avatar when the work has a user assigned', () => {
    // prettier-ignore
    const workListItemComponent = shallow(<WorkTicketItemComponent
      work={{ users: [{ firstName: 'John', lastName: 'Doe' }] }}
      tenant={tenant}
    />).dive();

    expect(workListItemComponent.find('Avatar').length).toBe(1);
  });

  it('should pass a name as a props to the avatar when the work has a user assigned', () => {
    // prettier-ignore
    const workListItemComponent = shallow(<WorkTicketItemComponent
      work={{ users: [{ firstName: 'John', lastName: 'Doe' }] }}
      tenant={tenant}
    />).dive();

    expect(workListItemComponent.find('Avatar').props().name).toBe('John Doe');
  });

  it('should put the work title to the title text component', () => {
    // prettier-ignore
    const workListItemComponent = shallow(<WorkTicketItemComponent
      work={{ title: 'Work Title' }}
      tenant={tenant}
    />).dive();

    expect(workListItemComponent.find('#title-text').props().children).toBe('Work Title');
  });

  it('should put the site name and customer name on the site-customer text component when both are provided', () => {
    // prettier-ignore
    const workListItemComponent = shallow(<WorkTicketItemComponent
      work={{ customer: { customerName: 'Customer 1' }, site: { siteName: 'Site 1' } }}
      tenant={tenant}
    />).dive();

    expect(workListItemComponent.find('#site-customer-text')).toHaveLength(1);
    expect(workListItemComponent.find('#site-customer-text').props().children).toBe('Site 1 · Customer 1');
  });

  it('should only put the site name on the site-customer text component when only site is provided', () => {
    // prettier-ignore
    const workListItemComponent = shallow(<WorkTicketItemComponent
      work={{ site: { siteName: 'Site 1' } }}
      tenant={tenant}
    />).dive();

    expect(workListItemComponent.find('#site-customer-text')).toHaveLength(1);
    expect(workListItemComponent.find('#site-customer-text').props().children).toBe('Site 1');
  });

  it('should only put the customer name on the site-customer text component when only customer is provided', () => {
    // prettier-ignore
    const workListItemComponent = shallow(<WorkTicketItemComponent
      work={{ customer: { customerName: 'Customer 1' } }}
      tenant={tenant}
    />).dive();

    expect(workListItemComponent.find('#site-customer-text')).toHaveLength(1);
    expect(workListItemComponent.find('#site-customer-text').props().children).toBe('Customer 1');
  });

  it('should not render the site-customer text component when none are provided', () => {
    // prettier-ignore
    const workListItemComponent = shallow(<WorkTicketItemComponent
      work={{}}
      tenant={tenant}
    />).dive();

    expect(workListItemComponent.find('#site-customer-text')).toHaveLength(0);
  });

  it("should put the user's name on the name text component when the work has a user assigned", () => {
    // prettier-ignore
    const workListItemComponent = shallow(<WorkTicketItemComponent
      work={{ users: [{ firstName: 'John', lastName: 'Doe' }] }}
      tenant={tenant}
    />).dive();

    expect(workListItemComponent.find('#unassigned-text')).toHaveLength(0);
    expect(workListItemComponent.find('#assigned-text')).toHaveLength(1);
    expect(workListItemComponent.find('#assigned-text').props().children).toBe('John Doe');
  });

  it('should put the "unassigned" label on the name text component when the work has not a user assigned', () => {
    // prettier-ignore
    const workListItemComponent = shallow(<WorkTicketItemComponent
      work={{ users: [] }}
      tenant={tenant}
    />).dive();

    expect(workListItemComponent.find('#assigned-text')).toHaveLength(0);
    expect(workListItemComponent.find('#unassigned-text')).toHaveLength(1);
    expect(workListItemComponent.find('#unassigned-text').props().children).toBe('Unassigned');
  });

  it('should show closed if work ticket status is closed & feature flag is active', () => {
    // prettier-ignore
    const workListItemComponent = shallow(<WorkTicketItemComponent
      work={{
        users: [{ firstName: 'John', lastName: 'Doe' }],
        workTicketStatus: {
          status: workTicketStatusConstants.closed,
          modified: moment(),
          modifiedBy: 'test',
        },
      }}
      tenant={tenant}
      mobileWorkTicketsFlag
    />).dive();
    expect(workListItemComponent.find('#closed-text').props().children).toBe('CLOSED');
  });

  it('should show closed info if work ticket status is closed and unassigned & feature flag is active', () => {
    // prettier-ignore
    const workListItemComponent = shallow(<WorkTicketItemComponent
      work={{
        users: [],
        workTicketStatus: {
          status: workTicketStatusConstants.closed,
          modified: moment(),
          modifiedBy: 'test',
        },
      }}
      tenant={tenant}
      mobileWorkTicketsFlag
    />).dive();
    expect(workListItemComponent.find('#closed-text').props().children).toBe('CLOSED');
  });
});
