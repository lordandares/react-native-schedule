import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  trackEvent: ['eventName'],
}, {
  prefix: 'Analytics/',
});

export const AnalyticsTypes = Types;
const AnalyticsRedux = Creators;
export default AnalyticsRedux;
