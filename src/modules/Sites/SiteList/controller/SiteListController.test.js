import SiteListController from './SiteListController';
import type { Site } from '../../../../shared/types/schedule.types';

describe('SiteListController', () => {
  it('should call onSelected when a site is selected', () => {
    const fake = jest.fn();
    const navigate = jest.fn();
    const controller = new SiteListController([], fake, jest.fn(), false, navigate);
    const site: Site = { name: 'yo' };
    controller.onSelected(site);
    expect(fake).toHaveBeenLastCalledWith(site);
  });
});
