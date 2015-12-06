'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { toJS } from 'immutable';
require("../../../css/common.scss");

export class TransactionTable extends React.Component {
  render() {
    return (
      <div>
        Transaction Table
        {this.props.transactions.size}
      </div>
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
