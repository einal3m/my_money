'use strict';

import React from 'react';
import AccountSlat from './account-slat';
require("../../../css/common.scss");

export default class AccountGroup extends React.Component {

  renderAccounts() {
    return this.props.accountGroup.accounts.map((account) => {
      return <AccountSlat key={account.id} account={account} />;
    });
  }

  accountGroupTitle() {
    return `${this.props.accountGroup.name} Accounts`;
  }

  render() {
    return (
      <div>
        <h3>{this.accountGroupTitle()}</h3>
        <ul className='slats'>
          {this.renderAccounts()}
        </ul>
        <br></br>
      </div>
    );
  }
}
