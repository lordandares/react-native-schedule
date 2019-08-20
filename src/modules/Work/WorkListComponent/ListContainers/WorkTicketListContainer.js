// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import WorkListComponent from '../WorkListComponent';
import actionCreators, {
  selectLoading,
  selectWorkTickets,
} from '../../../../shared/redux/workTicket';
import { renderWorkTicketItem } from '../../../WorkTicket/WorkTicketItem/RenderWorkTicketItem';

const mapStateToProps = (state, ownProps) => ({
  loading: selectLoading(state),
  workItems: selectWorkTickets(state),
  renderChild: renderWorkTicketItem,
  navigableComponentId: ownProps.navigableComponentId,
  tenant: state.tenant,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { requestWorkItems: actionCreators.requestWorkTickets, setSelectedItem: actionCreators.setSelectedWorkTicket },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(WorkListComponent);
