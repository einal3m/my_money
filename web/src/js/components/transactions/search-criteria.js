'use strict';

import connectToStores from 'alt/utils/connectToStores';
import React from 'react';
import AccountStore from '../../stores/account-store';
import StaticDataStore from '../../stores/static-data-store';
import accountActions from '../../actions/account-actions';
import transactionActions from '../../actions/transaction-actions';
import staticDataActions from '../../actions/static-data-actions';
import AccountFilter from '../common/account-filter';
import DateRangeFilter from '../common/date-range-filter';
require("../../../css/common.scss");

export class SearchCriteria extends React.Component {

  static getStores(props) {
    return [AccountStore, StaticDataStore];
  }

  static getPropsFromStores(props) {
    return {
      accountGroups: AccountStore.getState().accountGroups,
      currentAccount: AccountStore.getState().currentAccount,
      dateRanges: StaticDataStore.getState().dateRanges,
      currentDateRange: StaticDataStore.getState().currentDateRange,
      loaded: AccountStore.getState().loaded && StaticDataStore.getState().loaded
    };
  }

  static componentDidConnect(props) {
    if (!AccountStore.getState().loaded) {
      accountActions.fetchAccounts();
    }
    if (!StaticDataStore.getState().loaded) {
      staticDataActions.fetchDateRanges();
    }
  }

  onAccountChange(accountId) {
    accountActions.setCurrentAccount(accountId);
    this.fetch(accountId, this.props.currentDateRange.fromDate, this.props.currentDateRange.toDate);
  }

  onDateRangeChange(data) {
    if (data.id) {
      staticDataActions.setCurrentDateRange(data.id);
      let newDateRange = this.props.dateRanges.filter(dateRange => dateRange.id === data.id)[0];
      this.fetch(this.props.currentAccount.id, newDateRange.fromDate, newDateRange.toDate);
    } else if (data.fromDate) {
      staticDataActions.updateCurrentDateRange({fromDate: data.fromDate});
      this.fetch(this.props.currentAccount.id, data.fromDate, this.props.currentDateRange.toDate);
    } else if (data.toDate) {
      staticDataActions.updateCurrentDateRange({toDate: data.toDate});
      this.fetch(this.props.currentAccount.id, this.props.currentDateRange.fromDate, data.toDate);
    }
  }

  fetch(accountId, fromDate, toDate) {
    transactionActions.fetchTransactions(accountId, fromDate, toDate);
  }

  renderCriteria(){
    if (this.props.loaded) {
      return [
        <AccountFilter key='1' currentAccount={this.props.currentAccount} accountGroups={this.props.accountGroups} onChange={this.onAccountChange.bind(this)}/>,
        <DateRangeFilter key='2' dateRanges={this.props.dateRanges} currentDateRange={this.props.currentDateRange} 
          onChange={this.onDateRangeChange.bind(this)}/>
      ];
    }
  }

  render() {
    return (
      <div>
        {this.renderCriteria()}
      </div>
    );
  }
}

export default connectToStores(SearchCriteria);
