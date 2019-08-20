import userCanDo, { VIEW_EDIT_USER } from './canUserDo';

export default (currentUser, button) => (userCanDo(VIEW_EDIT_USER, currentUser) ? button : null);
