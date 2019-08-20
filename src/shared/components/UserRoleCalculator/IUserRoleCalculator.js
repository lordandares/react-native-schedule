import type { User } from '../../types/schedule.types';

export interface IUserRoleCalculator {
  hasRole(role: string, user: User): boolean;
  isInRole(role: string, user: User): boolean;
}
