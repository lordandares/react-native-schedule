import { userRoles } from '../../constants/user';

export const EDIT_OWNER = 'authorization/EDIT_OWNER';
export const VIEW_EDIT_USER = 'authorization/VIEW_EDIT_USER';
export const EDIT_SHIFT = 'authorization/EDIT_SHIFT';
export const SEE_SHIFT_DETAILS = 'authorization/SEE_SHIFT_DETAILS';
export const ASSIGN_USER = 'authorization/ASSIGN_USER';
export const VIEW_PAY_RATE = 'authorization/VIEW_PAY_RATE';
export const VIEW_COMPLETE_HOME = 'authorization/VIEW_COMPLETE_HOME';
export const VIEW_OTHERS_SHIFT_DETAIL = 'authorization/VIEW_OTHERS_SHIFT_DETAIL';
export const VIEW_OTHERS_WORK_DETAIL = 'authorization/VIEW_OTHERS_WORK_DETAIL';

const userCan = [];
const adminCan = userCan.concat([
  VIEW_EDIT_USER,
  EDIT_SHIFT,
  SEE_SHIFT_DETAILS,
  ASSIGN_USER,
  VIEW_PAY_RATE,
  VIEW_COMPLETE_HOME,
  VIEW_OTHERS_SHIFT_DETAIL,
  VIEW_OTHERS_WORK_DETAIL,
]);
const ownerCan = adminCan.concat([]);

const authList = {
  user: userCan,
  admin: adminCan,
  owner: ownerCan,
};

export default (action, user) => {
  if (user && user.userRole && userRoles[user.userRole.toLowerCase()]) {
    return authList[user.userRole.toLowerCase()].includes(action);
  }
  return false;
};
