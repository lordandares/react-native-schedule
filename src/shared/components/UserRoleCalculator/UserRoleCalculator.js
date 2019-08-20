import type { IUserRoleCalculator } from './IUserRoleCalculator';
import User from '../../types/schedule.types';

export default class UserRoleCalculator implements IUserRoleCalculator {
  // eslint-disable-next-line class-methods-use-this
  hasRole(role: string, user: User): boolean {
    if (user) {
      if (user.userRole) {
        return user.userRole === role;
      }

      if (role === 'User') {
        return true;
      }

      return false;
    }
    return true;
  }

  isInRole(userId: string, role: string, users: User[]): boolean {
    let user;
    if (users && users.length > 0) {
      user = users.find(x => x.id === userId);
    }
    if (user) {
      return this.hasRole(role, user);
    }
    return true;
  }
}
