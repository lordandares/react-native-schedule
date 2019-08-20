import React from 'react';
import { shallow } from 'enzyme';
import ShiftListItemComponent from './ShiftListItemComponent';

describe('SiteShiftListItemComponent', () => {
  it('should render', () => {
    const shift = { users: [] };
    const shiftItem = shallow(<ShiftListItemComponent
      shift={shift}
      clockIn={undefined}
      clockOut={() => { }}
    />).dive();
    expect(shiftItem).toBeDefined();
  });
});
