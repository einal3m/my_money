import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import ImportRow from './import-row';

require('../../../css/transaction.scss');

export default class ImportTable extends React.Component {

  renderTransactions() {
    return this.props.transactions.map((transaction, index) => (
      <ImportRow
        key={index}
        index={index}
        transaction={transaction}
        groupedCategories={this.props.groupedCategories}
        subcategories={this.props.subcategories}
      />
    ));
  }

  renderTable() {
    if (this.props.transactions.length > 0) {
      return (
        <Table hover id="transaction-table">
          <thead>
            <tr>
              <th className="date">date</th>
              <th className="memo">bank memo</th>
              <th className="notes">notes</th>
              <th className="category">category</th>
              <th className="subcategory">subcategory</th>
              <th className="currency">amount</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTransactions()}
          </tbody>
        </Table>
      );
    }
    return <div>No transactions to import</div>;
  }

  render() {
    return (
      <div>
        {this.renderTable()}
      </div>
    );
  }
}

ImportTable.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  groupedCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  subcategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
