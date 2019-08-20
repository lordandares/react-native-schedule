import type { ISiteSelectController } from '../SiteSelect.types';
import type { Site } from '../../../../shared/types/schedule.types';


export class SiteSelectController implements ISiteSelectController {
  isEnabled: boolean = false;
  site: Site;
  onPress: ()=> void;

  constructor(site: Site, onPress: () => void) {
    this.site = site;
    this.onPress = onPress;
    if (onPress) {
      this.isEnabled = true;
    }
  }

  onSitePressed = () => {
    this.onPress();
  }
}
