'use strict';

import React from 'react';
import { Table } from 'react-bootstrap';
import ImportRow from './import-row';
require("../../../css/transaction.scss");

export default class ImportTable extends React.Component {

  renderTransactions() {
    return this.props.transactions.map((transaction, index) => {
      return <ImportRow key={index} transaction={transaction} />;
    });
  }

  renderTable() {
    if (this.props.transactions.length > 0) {
      return (
        <Table hover id='transaction-table'>
          <thead>
            <tr>
              <th></th>
              <th className='date'>date</th>
              <th>bank memo</th>
              <th>notes</th>
              <th>category</th>
              <th>subcategory</th>
              <th className='currency'>amount</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTransactions()}
          </tbody>
        </Table>
      );
    } else {
      return <div>No transactions to import</div>;
    }
  }

  render() {
    return (
      <div>
        {this.renderTable()}
      </div>
    );
  }
}
