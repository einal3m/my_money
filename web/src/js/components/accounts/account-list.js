'use strict';

import connectToStores from 'alt/utils/connectToStores';
import React from 'react';
import AccountStore from '../../stores/account-store';
import accountActions from '../../actions/account-actions';
import PageHeader from '../common/page-header';
import AccountSlat from './account-slat';
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

  renderAccounts() {
    return this.props.accounts.map((account) => {
      return <AccountSlat key={account.id} account={account} />;
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
          <h3>Savings Accounts</h3>
          <ul className='slats'>
            {this.renderAccounts()}
          </ul>
        </div>
      </div>
    );
  }
}

export default connectToStores(AccountList);
