import _filter from 'lodash/filter';

const hasSiteAndUser = (site, shifts, user) => {
  if (user.userRole !== 'User') return true;

  const index = shifts.findIndex(shift => shift.siteId === site.id);
  if (index > -1) return shifts[index].users.findIndex(u => u.id === user.id) > -1;
  return false;
};

export const sitesSelector = ({ user: { value }, schedule: { sites, assignedShifts } }) =>
  _filter(sites, site => !site.archived && hasSiteAndUser(site, assignedShifts, value));
