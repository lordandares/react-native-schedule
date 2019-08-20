import { userRoles } from '../../constants/user';
import canUserDo, { VIEW_EDIT_USER } from './canUserDo';

const mockAction = VIEW_EDIT_USER;
let mockUser = { userRole: 'User' };

describe('canUserDo', () => {
  it('should return false if the user is not defined', () => {
    mockUser = undefined;
    expect(canUserDo(mockAction, mockUser)).toBe(false);
  });

  it('should return false if user passed have not a role defined', () => {
    mockUser = {};
    expect(canUserDo(mockAction, mockUser)).toBe(false);
  });

  it('should return false if user role passed is not a valid role', () => {
    const mockUserRoles = {
      ...userRoles,
      mockRole: 'mockRole',
    };
    mockUser.userRole = mockUserRoles.mockRole;

    expect(canUserDo(mockAction, mockUser)).toBe(false);
  });

  it('should return false if user have a role but no have access to this action', () => {
    mockUser.userRole = userRoles.user;

    expect(canUserDo(mockAction, mockUser)).toBe(false);
  });

  it('should return true if user have a role and have access to this action', () => {
    mockUser.userRole = userRoles.admin;

    expect(canUserDo(mockAction, mockUser)).toBe(true);
  });
});
