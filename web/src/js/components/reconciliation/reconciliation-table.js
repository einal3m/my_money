import React, { PropTypes } from 'react';
import ReconciliationRow from './reconciliation-row';

export default class ReconciliationTable extends React.Component {

  renderRows() {
    return this.props.reconciliations.map(reconciliation =>
      <ReconciliationRow key={reconciliation.id} reconciliation={reconciliation} />
    );
  }

  renderTable() {
    if (!this.props.loaded) {
      return undefined;
    }

    return (
      <table className="table table-hover" id="reconciliation-table">
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
    );
  }

  render() {
    return (
      <div>
        {this.renderTable()}
      </div>
    );
  }
}

ReconciliationTable.propTypes = {
  loaded: PropTypes.bool.isRequired,
  reconciliations: PropTypes.arrayOf(PropTypes.shape({})),
};
