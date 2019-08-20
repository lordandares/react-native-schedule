import React from 'react';
import moment from 'moment-timezone';
import { Provider } from 'react-redux';
import { createMockStore } from 'redux-test-utils';
import { shallow, mount } from 'enzyme';
import CompanyTime from './CompanyTime';


describe('CompanyTime', () => {
  let store;
  moment.tz.setDefault('UTC');

  beforeEach(() => {
    store = createMockStore({
      tenant: {
        timeFormat: 'h:mm A',
      },
    });
  });

  it('renders properly without props', () => {
    shallow((
      <Provider store={store}>
        <CompanyTime />
      </Provider>
    ));
  });

  it('renders properly with date value props', () => {
    const date: moment = moment('2019-05-31 17:00');
    const wrapper = mount((
      <Provider store={store}>
        <CompanyTime value={date} />
      </Provider>
    ));
    const instanceOfWrapper = wrapper.children();
    expect(instanceOfWrapper.text()).toBe('5:00 PM');
  });

  it('renders properly with date value props and custom format', () => {
    const date: moment = moment('2019-05-31 17:00');
    const wrapper = mount((
      <Provider store={store}>
        <CompanyTime value={date} suffixFormat=" (dddd)" />
      </Provider>
    ));
    const instanceOfWrapper = wrapper.children();
    expect(instanceOfWrapper.text()).toBe('5:00 PM (Friday)');
  });

  it('renders properly with date value props in 24 hour format', () => {
    store = createMockStore({
      tenant: {
        timeFormat: 'HH:mm',
      },
    });
    const date: moment = moment('2019-05-31 17:00');
    const wrapper = mount((
      <Provider store={store}>
        <CompanyTime value={date} />
      </Provider>
    ));
    const instanceOfWrapper = wrapper.children();
    expect(instanceOfWrapper.text()).toBe('17:00');
  });
});
