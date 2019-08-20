import type { Saga } from 'redux-saga';
import type { IManagementService, Tenant } from '@next/schedule/types/management.types';
import { put, call, select } from 'redux-saga/effects';
import TenantActions from '../redux/tenant';
import { selectIsDateTimeOn } from '../redux/featureflags.selectors';

export function* getTenant(managementService: IManagementService, action: any): Saga<any> {
  try {
    const tenant: Tenant = yield call(managementService.getTenant, action.payload);
    const isDateTimeOn = yield select(selectIsDateTimeOn);

    if (!isDateTimeOn) {
      tenant.dateFormat = null;
      tenant.use24HourFormat = null;
    }

    yield put(TenantActions.successTenant(tenant));
  } catch (err) {
    yield put(TenantActions.errorTenant(err.message || err));
  }
}
