import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../common/page-header';
import { getReconciliations } from '../../actions/reconciliation-actions';

export class ReconciliationListComponent extends React.Component {
  constructor() {
    super();
    getReconciliations();
  }

  render() {
    return (
      <div>
        <PageHeader title="account reconciliation" apiStatus={this.props.apiStatus} />
      </div>
    );
  }
}

ReconciliationListComponent.propTypes = {
  loaded: PropTypes.bool,
  currentAccount: PropTypes.shape({ id: PropTypes.number }),
  reconciliations: PropTypes.arrayOf(PropTypes.shape({})),
  apiStatus: PropTypes.shape({}),
};

function mapStateToProps(state) {
  return {
    loaded: state.patternStore.get('loaded'),
    currentAccount: state.accountStore.get('currentAccount').toJS(),
    reconciliations: state.reconciliationStore.get('reconciliations').toJS(),
    apiStatus: state.apiStatusStore.toJS(),
  };
}

export default connect(mapStateToProps)(ReconciliationListComponent);
