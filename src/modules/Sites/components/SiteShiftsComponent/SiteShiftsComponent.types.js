import moment from 'moment-timezone';
import type { ScheduleState, Shift, Site } from '../../../../shared/types/schedule.types';

export type SiteShiftsComponentStyles = {
  scrollContainer: any,
};

export type SiteShiftsComponentProps = {
  navigator: any,
  withStylesTheme: any,
  scheduleState: ScheduleState,
  styles: SiteShiftsComponentStyles,
  getShifts(start: moment, end: moment, id: string, customerId: string): Shift[],
  setSelectedDateOnSites(start: moment, site: Site): void,
  selectTab(selectedTabIndex: number): void,
  reselectTab(selectedTabIndex: number): void,
  setNavigator(navigator: any): void,
};
