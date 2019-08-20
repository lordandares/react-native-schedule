import type { Site } from '../../../shared/types/schedule.types';


export interface ISiteSelectController {
  isEnabled: boolean;
  site: Site;
  onSitePressed: () => void;
}

export type SiteSelectContainerProps = {
  site: Site,
  onPress: () => void,
}

export type SiteSelectProps = {
  viewModel: ISiteSelectController,
};
