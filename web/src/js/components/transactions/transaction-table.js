'use strict';

import connectToStores from 'alt/utils/connectToStores';
import React from 'react';
import TransactionStore from '../../stores/transaction-store';
require("../../../css/common.scss");

export class TransactionTable extends React.Component {

  static getStores(props) {
    return [TransactionStore];
  }

  static getPropsFromStores(props) {
    return TransactionStore.getState();
  }

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        Transaction Table
      </div>
    );
  }
}

export default connectToStores(TransactionTable);
