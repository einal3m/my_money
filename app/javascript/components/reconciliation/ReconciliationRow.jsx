import React, { PropTypes } from 'react';
import Balance from '../common/balance';
import Date from '../common/date';

export default class ReconciliationRow extends React.Component {

  renderReconciled() {
    if (this.props.reconciliation.reconciled) {
      return <i className="fa fa-check" aria-hidden="true" />;
    }
    return <i className="fa fa-times" aria-hidden="true" />;
  }

  render() {
    return (
      <tr>
        <td><Date date={this.props.reconciliation.statementDate} /></td>
        <td><Balance balance={this.props.reconciliation.statementBalance} /></td>
        <td>{this.renderReconciled()}</td>
      </tr>
    );
  }
}

ReconciliationRow.propTypes = {
  reconciliation: PropTypes.shape({
    statementDate: PropTypes.string.isRequired,
    statementBalance: PropTypes.number.isRequired,
    reconciled: PropTypes.bool.isRequired,
  }).isRequired,
};
