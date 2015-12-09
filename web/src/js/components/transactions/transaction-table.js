'use strict';

import React from 'react';
import { Panel, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toJS } from 'immutable';
import TransactionRow from './transaction-row';
require("../../../css/transaction.scss");

export class TransactionTable extends React.Component {

  renderTransactions() {
    return this.props.transactions.map(transaction => {
      return <TransactionRow key={transaction.get('id')} transaction={transaction} />;
    }).toJS();
  }

  renderTitle() {
    if (this.props.searchCriteriaLoaded) {
      return <h3>Transactions for {this.props.account.get('name')}</h3>;
    }
  }

  renderTable() {
    if (!this.props.searchCriteriaLoaded) {
      return;
    }
    if (this.props.transactions.size > 0) {
      return (
        <Table hover id='transaction-table'>
          <thead>
            <tr>
              <th className='date'>date</th>
              <th>description</th>
              <th className='currency'>amount</th>
              <th className='currency'>balance</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTransactions()}
          </tbody>
        </Table>
      );
    } else {
      return <div>No transactions match the search criteria</div>;
    }
  }

  render() {
    return (
      <div>
        {this.renderTitle()}
        {this.renderTable()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.transactionStore.get('loading'),
    transactions: state.transactionStore.get('transactions'),
    account: state.accountStore.get('currentAccount'),
    searchCriteriaLoaded: state.accountStore.get('loaded') && state.dateRangeStore.get('loaded')
  };
}

export default connect(mapStateToProps)(TransactionTable);
