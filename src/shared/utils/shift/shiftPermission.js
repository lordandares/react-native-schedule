import userCanDo, { VIEW_OTHERS_SHIFT_DETAIL } from '../../auth/utils/canUserDo';

const hasPermissionsForShift = (shift, currentUser) => {
  if (!userCanDo(VIEW_OTHERS_SHIFT_DETAIL, currentUser)) {
    let hasPermission = false;
    shift.users.forEach((user) => {
      if (currentUser && user.id === currentUser.userId) {
        hasPermission = true;
      }
    });
    return hasPermission;
  }
  return true;
};

export default hasPermissionsForShift;
