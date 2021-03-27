import React, { PropTypes } from 'react';
import ReconciliationRow from './ReconciliationRow';

export default class ReconciliationTable extends React.Component {

  renderRows() {
    return this.props.reconciliations.map(reconciliation =>
      <ReconciliationRow key={reconciliation.id} reconciliation={reconciliation} />
    );
  }

  render() {
    if (!this.props.loaded) {
      return <div />;
    }

    return (
      <div>
        <h3>Reconciliation History</h3>
        <table className="table table-hover" id="transaction-table">
          <thead>
            <tr>
              <th>statement date</th>
              <th>statement balance</th>
              <th>finished</th>
            </tr>
          </thead>
          <tbody>
            {this.renderRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

ReconciliationTable.propTypes = {
  loaded: PropTypes.bool.isRequired,
  reconciliations: PropTypes.arrayOf(PropTypes.shape({})),
};
