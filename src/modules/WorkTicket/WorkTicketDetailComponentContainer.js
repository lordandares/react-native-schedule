// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCurrentUser } from '@next/auth/lib/redux/Auth';

import WorkTicketDetailComponent from './WorkTicketDetail/WorkTicketDetailComponent';
import actionCreators, { selectWorkTicket } from '../../shared/redux/workTicket';

const mapStateToProps = state => ({
  workTicket: selectWorkTicket(state),
  currentUser: getCurrentUser(state),
  sites: state.schedule.sites,
  tenant: state.tenant,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateWorkTicket: actionCreators.requestUpdateWorkTicket }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WorkTicketDetailComponent);
