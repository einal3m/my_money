'use strict';

import React from 'react';
import { Input } from 'react-bootstrap';

export default class AccountFilter extends React.Component {
  onChange(event) {
    this.props.onChange(Number(event.target.value));
  }

  renderAccountGroups() {
    let options = [];
    this.props.accountGroups.forEach((accountGroup) => {
      if (accountGroup.accounts.length > 0) {
        options.push(this.renderAccountGroup(accountGroup));
      }
    });
    return options;
  }

  renderAccountGroup(accountGroup) {
    return (
      <optgroup key={accountGroup.code} label={accountGroup.name + ' Accounts'}>
        {this.renderAccounts(accountGroup.accounts)}
      </optgroup>
    );
  }

  renderAccounts(accounts) {
    return accounts.map((account) => {
      return <option key={account.id} value={account.id}>{account.name}</option>;
    });
  }

  render() {
    return (
      <div className="row">
        <div className="form-horizontal col-xs-4">
          <Input type="select" label="Account" defaultValue={this.props.currentAccount.id} labelClassName="col-xs-4" 
                 wrapperClassName="col-xs-8" onChange={this.onChange.bind(this)}>
            {this.renderAccountGroups()}
          </Input>
        </div>
      </div>      
    );
  }
}

let accountProps = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired
});

AccountFilter.propTypes = {
  currentAccount: accountProps.isRequired,
  accountGroups: React.PropTypes.arrayOf(React.PropTypes.shape({
    code: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    accounts: React.PropTypes.arrayOf(accountProps).isRequired
  })).isRequired
};

