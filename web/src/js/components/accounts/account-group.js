'use strict';

import React from 'react';
import AccountSlat from './account-slat';
import { toJS } from 'immutable';
require("../../../css/common.scss");

export default class AccountGroup extends React.Component {

  renderAccounts() {
    return this.props.accounts.map(account => {
      return <AccountSlat key={account.get('id')} account={account} />;
    }).toJS();
  }

  accountGroupTitle() {
    return `${this.props.accountType.get('name')} Accounts`;
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
