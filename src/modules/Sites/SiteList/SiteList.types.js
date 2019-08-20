import type { Site } from '../../../shared/types/schedule.types';

export interface ISiteListController {
  sites: Site[];
  onSelected: (site:Site) => void;
  getSites: () => void;
  loading: boolean;
}

export type SiteListProps =
  {
    viewModel: ISiteListController
  }

export type SiteListContainerProps =
  {
    callback: (site: Site) => void
  }
