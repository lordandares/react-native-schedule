import _ from 'lodash';
import { getUserTenantId } from '@next/auth/lib/redux/Auth';
import ErrorHandlerRedux from '@next/schedule/lib/redux/ErrorHandlerRedux';

import type { User } from '../types/schedule.types';
import type { AppServices } from '../types/app.types';
import { GET_USERS, SET_FILTERED_USERS, REQUEST_GET_USERS, ERROR_GET_USERS } from './schedule';

export function getUsers() {
  return async (dispatch: Function, getState: Function, { managementService }: AppServices) => {
    try {
      dispatch({ type: REQUEST_GET_USERS });
      const { schedule: { usersSearchTerm } } = getState();
      const tenantId = getUserTenantId(getState());
      const users: User[] = await managementService.getUsers(tenantId);

      users.sort((user1: User, user2: User) => {
        const fullName1: string = `${user1.firstName} ${user1.lastName}`;
        const fullName2: string = `${user2.firstName} ${user2.lastName}`;
        return fullName1.localeCompare(fullName2);
      });
      dispatch({ type: GET_USERS, payload: users });
      const filteredUsers = users.filter(user =>
        _.includes(_.toLower(`${user.firstName} ${user.lastName}`), _.toLower(_.trim(usersSearchTerm))));
      dispatch({ type: SET_FILTERED_USERS, payload: filteredUsers });
    } catch (error) {
      dispatch(ErrorHandlerRedux.addError('Failed to load users list.', error));
      dispatch({ type: ERROR_GET_USERS });
    }
  };
}
