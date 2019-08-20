import type { ISiteListController } from '../SiteList.types';
import type { Site } from '../../../../shared/types/schedule.types';

class SiteListController implements ISiteListController {
  sites: Site[];
  onSelected: (site: Site) => void;
  getSites: () => void;
  loading: boolean;

  constructor(
    sites: Site[],
    onSiteSelected: (site: Site) => void,
    getSites: () => void,
    loading: boolean,
    navigate: () => void,
  ) {
    this.sites = sites;
    this.getSites = getSites;
    this.loading = loading;
    this.onSelected = (site: Site) => {
      onSiteSelected(site);
      navigate(site);
    };
  }
}

export default SiteListController;
