import userCanDo, { VIEW_OTHERS_WORK_DETAIL } from '../../auth/utils/canUserDo';

const hasPermissionsForWork = (work, currentUser) => {
  if (!userCanDo(VIEW_OTHERS_WORK_DETAIL, currentUser)) {
    let hasPermission = false;
    work.users.forEach((user) => {
      if (currentUser && user.id === currentUser.userId) {
        hasPermission = true;
      }
    });
    return hasPermission;
  }
  return true;
};

export default hasPermissionsForWork;
