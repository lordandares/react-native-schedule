import validateOwnerRole from './validateOwnerRole';
import { userRoles } from '../../constants/user';

const mockButton = '<Button />';

describe('validateOwnerRole', () => {
  it('should return null is user is not owner', () => {
    const mockUser = { userRole: userRoles.user };
    expect(validateOwnerRole(mockUser, mockButton)).toBe(null);
  });

  it('should return node button if current user is owner', () => {
    const mockUser = { userRole: userRoles.owner };
    expect(validateOwnerRole(mockUser, mockButton)).toBe(mockButton);
  });
});
