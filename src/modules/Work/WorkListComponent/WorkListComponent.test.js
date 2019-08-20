import React from 'react';
import { shallow, render } from 'enzyme';
import moment from 'moment-timezone';
import WorkListComponent from './WorkListComponent';
import { workTicketDetailComponentContainer } from '../../WorkTicket/WorkTicketDetailComponentContainer';

const workItems = [
  {
    title: 'title',
    dueDate: moment(),
  },
];

describe('WorkListComponent', () => {
  it('should render a `SectionList`', () => {
    const worksComponent = shallow(<WorkListComponent
      requestWorkItems={jest.fn()}
      loading={false}
    />).dive();
    const sectionListWrapper = worksComponent.find('SectionList');
    expect(sectionListWrapper.length).toBe(1);
  });

  it('should render the title with the format `ddd, MMM D`', () => {
    const worksComponent = shallow(<WorkListComponent
      requestWorkItems={jest.fn()}
      loading={false}
      renderChild={workTicketDetailComponentContainer}
      tenant={{ shortDateFormat: 'MMM D' }}
    />).dive().instance();
    const time = moment().format('YYYY-MM-DD');
    const expectedText = moment(time).format('ddd, MMM D').toUpperCase();

    const actualText = render(worksComponent.renderTitle({}, time)).text();

    expect(actualText).toBe(expectedText);
  });

  it('should show ticket date', () => {
    const worksComponent = shallow(<WorkListComponent
      workItems={workItems}
      requestWorkItems={jest.fn()}
      loading={false}
      tenant={{ shortDateFormat: 'MMM D' }}
    />).dive();
    const sectionListWrapper = worksComponent.find('SectionList');
    const workListItemComponents = sectionListWrapper
      .dive()
      .dive()
      .dive();

    const headerWorkItem = workListItemComponents
      .find({ cellKey: '0:header' })
      .dive();
    const textHeader = headerWorkItem.render().text();
    const textExpected = moment()
      .format('ddd, MMM D')
      .toUpperCase();
    expect(textHeader).toBe(textExpected);
  });
});
