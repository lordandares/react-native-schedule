import moment from 'moment-timezone';
import { connect } from 'react-redux';

const CompanyTime = ({
  value, format, prefixFormat = '', suffixFormat = '', timeZone, showTimeZone,
}) =>
  `${moment(value).format(`${prefixFormat}${format}${suffixFormat}`)}` +
  `${showTimeZone ? moment.tz(timeZone).format(' z') : ''}`;

const mapStateToProps = state => ({ format: state.tenant.timeFormat });

export default connect(mapStateToProps)(CompanyTime);
