'use strict';
import React from 'react';
import PageHeader from '../common/page-header';
import AccountSlat from './account-slat';
import { Button } from 'react-bootstrap';
require("../../css/common.scss");

export default class AccountList extends React.Component {
  renderAccounts() {
    let accounts = [
      {id: 1, name: 'Savings Maximizer', bank: 'ING', current_balance: '50.44'},
      {id: 2, name: 'Everyday Savings', bank: 'CBA', current_balance: '2,456.09'}
    ]
    return accounts.map((account) => {
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