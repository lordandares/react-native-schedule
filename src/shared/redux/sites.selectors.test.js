import { sitesSelector } from './sites.selectors';

const user = { id: 'a' };
const sites = [{ id: '1', archived: false }, { id: '2', archived: false }, { id: '3', archived: true }];
const assignedShifts = [{ siteId: '2', users: [{ id: 'a' }] }];
const state = {
  user: { value: user },
  schedule: {
    sites,
    assignedShifts,
  },
};

describe('sitesSelector', () => {
  describe('when user has user role', () => {
    state.user.value.userRole = 'User';

    it('filters out archived sites', () => {
      const results = sitesSelector(state);

      expect(results).not.toContain(sites[2]);
    });

    it('restricts sites to those having shifts assigned to user', () => {
      const results = sitesSelector(state);

      expect(results).toHaveLength(1);
      expect(results).toContain(sites[1]);
    });
  });

  describe('when role is not user', () => {
    it('filters out archived sites', () => {
      state.user.value.userRole = 'Admin';
      const results = sitesSelector(state);

      expect(results).not.toContain(sites[2]);
    });

    it('does not restrict sites', () => {
      state.user.value.userRole = 'Owner';
      const results = sitesSelector(state);

      expect(results).toHaveLength(2);
    });
  });
});
