'use strict';

import React from 'react';
import { Input } from 'react-bootstrap';
import { toJS } from 'immutable';

export default class AccountFilter extends React.Component {
  onChange(event) {
    this.props.onChange(Number(event.target.value));
  }

  renderAccountGroups() {
    let options = [];
    this.props.accountTypes.forEach((accountType) => {
      let accounts = this.props.accountGroups.get(accountType.get('code'));
      if (accounts) {
        options.push(this.renderAccountGroup(accountType, accounts));
      }
    });
    return options;
  }

  renderAccountGroup(accountType, accounts) {
    return (
      <optgroup key={accountType.get('code')} label={accountType.get('name') + ' Accounts'}>
        {this.renderAccounts(accounts)}
      </optgroup>
    );
  }

  renderAccounts(accounts) {
    return accounts.map((account) => {
      return <option key={account.get('id')} value={account.get('id')}>{account.get('name')}</option>;
    }).toJS();
  }

  render() {
    return (
      <div className="row">
        <div className="form-horizontal col-xs-4">
          <Input type="select" label="Account" defaultValue={this.props.currentAccount.get('id')} labelClassName="col-xs-4" 
                 wrapperClassName="col-xs-8" onChange={this.onChange.bind(this)} ref='accountSelect'>
            {this.renderAccountGroups()}
          </Input>
        </div>
      </div>      
    );
  }
}

// let accountProps = React.PropTypes.shape({
//   id: React.PropTypes.number.isRequired,
//   name: React.PropTypes.string.isRequired
// });

// AccountFilter.propTypes = {
//   currentAccount: accountProps.isRequired,
//   accountGroups: React.PropTypes.arrayOf(React.PropTypes.shape({
//     code: React.PropTypes.string.isRequired,
//     name: React.PropTypes.string.isRequired,
//     accounts: React.PropTypes.arrayOf(accountProps).isRequired
//   })).isRequired
// };

