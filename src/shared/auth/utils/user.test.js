import { userRoles } from '../../constants/user';
import { isUser, isAdmin, isOwner } from './user';

describe('isUser, isAdmin, isOwner', () => {
  it('should return false if user is not defined', () => {
    const userMock = undefined;
    expect(isUser(userMock)).toBe(false);
    expect(isAdmin(userMock)).toBe(false);
    expect(isOwner(userMock)).toBe(false);
  });

  it('should return false if user is defined but dont have role', () => {
    const userMock = {};
    expect(isUser(userMock)).toBe(false);
  });

  it('should return true if user have user role', () => {
    const userMock = { userRole: userRoles.user };
    expect(isUser(userMock)).toBe(true);
  });

  it('should return false if user have different role', () => {
    const userMock = { userRole: userRoles.owner };
    expect(isUser(userMock)).toBe(false);
  });

  it('should return true if admin have admin role', () => {
    const userMock = { userRole: userRoles.admin };
    expect(isAdmin(userMock)).toBe(true);
  });

  it('should return false if admin have different role', () => {
    const userMock = { userRole: userRoles.user };
    expect(isAdmin(userMock)).toBe(false);
  });

  it('should return true if owner have owner role', () => {
    const userMock = { userRole: userRoles.owner };
    expect(isOwner(userMock)).toBe(true);
  });

  it('should return false if owner have different role', () => {
    const userMock = { userRole: userRoles.user };
    expect(isOwner(userMock)).toBe(false);
  });
});
