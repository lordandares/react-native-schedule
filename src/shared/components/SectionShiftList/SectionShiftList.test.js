import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';
import SectionShiftList from './SectionShiftList';
import TestData from '../../../shared/testUtils/TestData';
import SiteShiftTestData from '../../../modules/Sites/components/SiteShiftsComponent/SiteShiftsComponent.testdata';

jest.mock('react-native-localize', () => ({
  RNLocalize: {
    language: 'en',
    languages: ['en'],
  },
  getLocales: jest.fn(() => [{ languageCode: 'en' }]),
}));

jest.mock('react-i18next', () => ({
  withNamespaces: () => (lComponent) => {
    const loginComponent = lComponent;
    loginComponent.defaultProps = { ...lComponent.defaultProps, t: key => key };
    return loginComponent;
  },
  reactI18nextModule: jest.fn(),
}));

describe('SectionShiftList', () => {
  it('should render a `SectionList`', () => {
    const siteShiftsComponent = shallow(<SectionShiftList shifts={TestData.getShifts()} />).dive();
    const sectionListWrapper = siteShiftsComponent.find('SectionList');

    expect(sectionListWrapper.length).toBe(1);
  });

  it('should render a `SectionShiftList` for each shift', () => {
    const siteShiftsComponent = shallow(<SectionShiftList shifts={SiteShiftTestData.getShiftsOnSameDay()} />).dive();

    const sectionListWrapper = siteShiftsComponent.find('SectionList');
    const siteShiftListItemComponents = sectionListWrapper
      .dive()
      .dive()
      .dive();
    const cellRendererWrapper = siteShiftListItemComponents
      .find('CellRenderer')
      .not({ cellKey: '0:header' })
      .not({ cellKey: '0:footer' });
    expect(cellRendererWrapper.length).toBe(SiteShiftTestData.getShiftsOnSameDay().length);
  });

  it('should render the title `TODAY` when the first shift is today', () => {
    const siteShiftsComponent = shallow(<SectionShiftList shifts={SiteShiftTestData.getShiftsToday()} />).dive();

    const sectionListWrapper = siteShiftsComponent.find('SectionList');
    const siteShiftListItemComponents = sectionListWrapper
      .dive()
      .dive()
      .dive();
    const headerShiftItem = siteShiftListItemComponents.find({ cellKey: '0:header' }).dive();
    const textHeader = headerShiftItem.render().text();

    expect(textHeader).toBe('TODAY');
  });

  it('should render the title `TOMORROW` when the first shift is tomorrow', () => {
    const siteShiftsComponent = shallow(<SectionShiftList shifts={SiteShiftTestData.getShiftsTomorrow()} />).dive();

    const sectionListWrapper = siteShiftsComponent.find('SectionList');
    const siteShiftListItemComponents = sectionListWrapper
      .dive()
      .dive()
      .dive();
    const headerShiftItem = siteShiftListItemComponents.find({ cellKey: '0:header' }).dive();
    const textHeader = headerShiftItem.render().text();

    expect(textHeader).toBe('TOMORROW');
  });

  it('should render the title `TOMORROW` when the first shift is today', () => {
    const siteShiftsComponent = shallow(<SectionShiftList shifts={SiteShiftTestData.getShifts()} />).dive();

    const sectionListWrapper = siteShiftsComponent.find('SectionList');
    const siteShiftListItemComponents = sectionListWrapper
      .dive()
      .dive()
      .dive();
    const headerShiftItem = siteShiftListItemComponents.find({ cellKey: '1:header' }).dive();
    const textHeader = headerShiftItem.render().text();

    expect(textHeader).toBe('TOMORROW');
  });

  it('should render the title with the format `ddd, MMM D` when we have shifts for today and tomorrow', () => {
    // eslint-disable-next-line max-len
    const siteShiftsComponent = shallow(<SectionShiftList shifts={SiteShiftTestData.getShifts()} shortDateFormat="MMM D" />).dive();

    const sectionListWrapper = siteShiftsComponent.find('SectionList');
    const siteShiftListItemComponents = sectionListWrapper
      .dive()
      .dive()
      .dive();
    const headerShiftItem = siteShiftListItemComponents.find({ cellKey: '2:header' }).dive();
    const textHeader = headerShiftItem.render().text();
    const textExpected = moment().add(2, 'd').format('ddd, MMM D').toUpperCase();

    expect(textHeader).toBe(textExpected);
  });

  it('should render the title with the format `ddd, MMM D` when we have shifts for today and not for tomorrow', () => {
    // eslint-disable-next-line max-len
    const siteShiftsComponent = shallow(<SectionShiftList shifts={SiteShiftTestData.getShiftsWithoutTomorrow()} shortDateFormat="MMM D" />).dive();

    const sectionListWrapper = siteShiftsComponent.find('SectionList');
    const siteShiftListItemComponents = sectionListWrapper
      .dive()
      .dive()
      .dive();
    const headerShiftItem = siteShiftListItemComponents.find({ cellKey: '1:header' }).dive();
    const textHeader = headerShiftItem.render().text();
    const textExpected = moment
      .utc()
      .add(4, 'd')
      .format('ddd, MMM D')
      .toUpperCase();

    expect(textHeader).toBe(textExpected);
  });
});
