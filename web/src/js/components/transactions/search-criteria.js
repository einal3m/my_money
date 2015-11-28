'use strict';

import connectToStores from 'alt/utils/connectToStores';
import React from 'react';
import AccountStore from '../../stores/account-store';
import StaticDataStore from '../../stores/static-data-store';
import accountActions from '../../actions/account-actions';
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

  renderCriteria(){
    if (this.props.loaded) {
      return [
        <AccountFilter key='1' accountGroups={this.props.accountGroups} />,
        <DateRangeFilter key='2' dateRanges={this.props.dateRanges} currentDateRange={this.props.currentDateRange}/>
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
