import { userRoles } from '../../constants/user';

export const isUser = user => !!user && user.userRole === userRoles.user;

export const isAdmin = user => !!user && user.userRole === userRoles.admin;

export const isOwner = user => !!user && user.userRole === userRoles.owner;
