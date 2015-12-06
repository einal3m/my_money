'use strict';

import React from 'react';
import PageHeader from '../common/page-header';
import SearchCriteria from './search-criteria';
import DatePicker from 'react-bootstrap-datetimepicker';
import TransactionTable from './transaction-table';
require("../../../css/common.scss");

export default class TransactionList extends React.Component {
  render() {
    return (
      <div>
        <PageHeader title="my transactions" />
        <div className="container">
          <SearchCriteria />
        </div>
        <div className="container">
          <TransactionTable />
        </div>
      </div>
    );
  }
}
