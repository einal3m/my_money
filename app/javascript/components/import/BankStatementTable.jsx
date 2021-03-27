import React from 'react';
import PropTypes from 'prop-types';
import BankStatementRow from './BankStatementRow';

export default class BankStatementTable extends React.Component {

  renderBankStatements = () => this.props.bankStatements.map(bankStatement => (
    <BankStatementRow key={bankStatement.id} bankStatement={bankStatement} />
  ));

  render() {
    if (this.props.bankStatements.length > 0) {
      return (
        <table className="table" id="transaction-table">
          <thead>
            <tr>
              <th>date</th>
              <th>file name</th>
              <th className="right-justify">transaction count</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.renderBankStatements()}
          </tbody>
        </table>
      );
    }
    return <div className="empty-state">Nothing imported into this account</div>;
  }
}

BankStatementTable.propTypes = {
  bankStatements: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number.isRequired })).isRequired,
};
