import React from 'react';
import { shallow } from 'enzyme';
import CoverageListItem from './CoverageListItem';
import { User } from '../../types/schedule.types';
import theme from '../../../shared/theme';

jest.mock('react-i18next', () => ({
  withNamespaces: () => (lComponent) => {
    const loginComponent = lComponent;
    loginComponent.defaultProps = { ...lComponent.defaultProps, t: key => key };
    return loginComponent;
  },
  reactI18nextModule: jest.fn(),
}));

describe('CoverageListItem', () => {
  it('renders properly without props', () => {
    shallow(<CoverageListItem />).dive();
  });

  it('renders properly with null user', () => {
    shallow(<CoverageListItem user={null} />).dive();
  });

  it('renders properly with an user', () => {
    const usr: User = {
      id: '1',
      firstName: 'Brian',
      lastName: 'Cary',
    };
    shallow(<CoverageListItem user={usr} />).dive();
  });

  it('should render a formatted the full name', () => {
    const usr: User = {
      id: '1',
      firstName: 'Brian',
      lastName: 'Cary',
      payRate: 15,
    };
    const coverageListItemWrapper = shallow(<CoverageListItem user={usr} />).dive();
    const fullNameTypographyWrapper = coverageListItemWrapper.find('#userFullName-1').dive();
    const textValue = fullNameTypographyWrapper.render().text();
    expect(textValue).toEqual('Brian Cary');
  });

  it('should render "Unassigned Shift" if the user is null', () => {
    const coverageListItemWrapper = shallow(<CoverageListItem />).dive();
    const fullNameTypographyWrapper = coverageListItemWrapper.find('#userFullName-1').dive();
    const textValue = fullNameTypographyWrapper.render().text();
    expect(textValue).toEqual('COMMON.UNASSIGNED');
  });

  it('should pass empty string to Avatar if the user is null', () => {
    const coverageListItemWrapper = shallow(<CoverageListItem />).dive();
    const avatarWrapper = coverageListItemWrapper.find('Avatar');
    expect(avatarWrapper.props().name).toBe('');
  });

  it('should pass the full name to the avatar through props', () => {
    const usr: User = {
      id: '1',
      firstName: 'Brian',
      lastName: 'Cary',
      payRate: 15,
    };
    const coverageListItemWrapper = shallow(<CoverageListItem user={usr} />).dive();
    const avatarWrapper = coverageListItemWrapper.find('Avatar');
    expect(avatarWrapper.props().name).toBe('Brian Cary');
  });

  it('should pass the a different color to the avatar through props when user is selected', () => {
    const usr: User = {
      id: '1',
      firstName: 'Brian',
      lastName: 'Cary',
      payRate: 15,
    };
    const coverageListItemWrapper = shallow(<CoverageListItem user={usr} isSelected />).dive();
    const avatarWrapper = coverageListItemWrapper.find('Avatar');
    expect(avatarWrapper.props().color).toBe(theme.palette.primary.dark);
  });

  it('should not render a pay rate', () => {
    const usr: User = {
      id: '1',
      firstName: 'Brian',
      lastName: 'Cary',
      payRate: 15,
    };
    const coverageListItemWrapper = shallow(<CoverageListItem user={usr} />).dive();
    const payRateTypographyWrapper = coverageListItemWrapper.find('#CoverageListItemPayRate-1');
    expect(payRateTypographyWrapper.length).toBe(0);
  });

  it('should render "Assign" if the user is unassigned', () => {
    const coverageListItemWrapper = shallow(<CoverageListItem />).dive();
    const payRateTypographyWrapper = coverageListItemWrapper.find('#CoverageListItemPayRate-1').dive();
    const textValue = payRateTypographyWrapper.render().text();
    expect(textValue).toEqual('COMMON.ASSIGN');
  });
});
