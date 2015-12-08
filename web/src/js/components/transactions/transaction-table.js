'use strict';

import React from 'react';
import { Panel, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toJS } from 'immutable';
import TransactionRow from './transaction-row';

export class TransactionTable extends React.Component {

  renderTransactions() {
    return this.props.transactions.map(transaction => {
      return <TransactionRow key={transaction.get('id')} transaction={transaction} />;
    }).toJS();
  }

  render() {
    return (
        <Panel collapsible defaultExpanded header="Panel heading">
          <Table fill>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Money In</th>
                <th>Money Out</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {this.renderTransactions()}
            </tbody>
          </Table>
      </Panel>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.transactionStore.get('loading'),
    transactions: state.transactionStore.get('transactions')
  };
}

export default connect(mapStateToProps)(TransactionTable);
