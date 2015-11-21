'use strict';

import connectToStores from 'alt/utils/connectToStores';
import React from 'react';
import AccountStore from '../../stores/account-store';
import accountActions from '../../actions/account-actions';
import PageHeader from '../common/page-header';
import AccountGroup from './account-group';
import { Button } from 'react-bootstrap';
require("../../../css/common.scss");

export class AccountList extends React.Component {

  static getStores(props) {
    return [AccountStore]
  }

  static getPropsFromStores(props) {
    return AccountStore.getState()
  }

  static componentDidConnect(props) {
    accountActions.fetchAccounts();
  }

  renderAccountGroups() {
    return this.props.accountGroups.filter((accountGroup) => {
      return accountGroup.accounts.length > 0;
    }).map((accountGroup) => {
      return <AccountGroup key={accountGroup.code} accountGroup={accountGroup} accounts={accountGroup.accounts} />;
    });
  }

  render() {
    return (
      <div>
        <PageHeader title="my accounts">
          <Button bsStyle="default">
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> New Account
          </Button>
        </PageHeader>

        <div className="container">
          {this.renderAccountGroups()}
        </div>
      </div>
    );
  }
}

export default connectToStores(AccountList);
