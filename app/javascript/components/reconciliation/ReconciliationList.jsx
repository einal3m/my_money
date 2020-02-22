import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../common/page-header';
import ReconciliationTable from './reconciliation-table';
import ReconciliationModal from './reconciliation-modal';
import Button from '../common/controls/button';
import { getReconciliations } from '../../actions/reconciliation-actions';
import { showFormModal } from '../../actions/form-actions';

export class ReconciliationListComponent extends React.Component {
  constructor() {
    super();
    getReconciliations();
  }

  newReconciliation = () => {
    let reconciliation = {};
    if (this.props.reconciliations.length > 0 && !this.props.reconciliations[0].reconciled) {
      reconciliation = this.props.reconciliations[0];
    }
    showFormModal('Reconciliation', reconciliation, {});
  };

  render() {
    return (
      <div>
        <PageHeader title="account reconciliation" apiStatus={this.props.apiStatus}>
          <Button onClick={this.newReconciliation}>Start</Button>
        </PageHeader>
        <div className="container">
          <ReconciliationTable loaded={this.props.loaded} reconciliations={this.props.reconciliations} />
        </div>
        <ReconciliationModal account={this.props.currentAccount} />
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
    loaded: state.reconciliationStore.get('loaded'),
    currentAccount: state.accountStore.get('currentAccount').toJS(),
    reconciliations: state.reconciliationStore.get('reconciliations').toJS(),
    apiStatus: state.apiStatusStore.toJS(),
  };
}

export default connect(mapStateToProps)(ReconciliationListComponent);
