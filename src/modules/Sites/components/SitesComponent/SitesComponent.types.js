import type { ScheduleState } from '../../../../shared/types/reduxState.types';

export type SitesComponentStyles = {
  sitesContainer: any,
  title: any,
};

export type SitesComponentProps = {
  getSites(): void,
  scheduleState: ScheduleState,
  styles: SitesComponentStyles,
  selectTab(selectedTabIndex: number): void,
  reselectTab(selectedTabIndex: number): void,
  setNavigator(navigator: any): void,
};
