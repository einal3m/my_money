import React from 'react';
import {connect} from 'react-redux';
import accountActions from '../../../actions/account-actions';
import { Input } from 'react-bootstrap';

export class AccountFilter extends React.Component {
  constructor() {
    super();
    accountActions.getAccounts();
  }

  onChange(event) {
    accountActions.setCurrentAccount(Number(event.target.value));
    this.props.fetch();
  }

  renderAccountGroups() {
    let options = [];
    this.props.accountTypes.forEach((accountType) => {
      let accounts = this.props.accountGroups[accountType.code];
      if (accounts) {
        options.push(this.renderAccountGroup(accountType, accounts));
      }
    });
    return options;
  }

  renderAccountGroup(accountType, accounts) {
    return (
      <optgroup key={accountType.code} label={accountType.name + ' Accounts'}>
        {this.renderAccounts(accounts)}
      </optgroup>
    );
  }

  renderAccounts(accounts) {
    return accounts.map((account) => {
      return <option key={account.id} value={account.id}>{account.name}</option>;
    });
  }

  renderAccountFilter() {
    if (this.props.loaded) {
      return (
        <div className="form-horizontal col-xs-4">
          <Input type="select" label="Account" value={this.props.currentAccount.id} labelClassName="col-xs-4"
                 wrapperClassName="col-xs-8" onChange={this.onChange.bind(this)} ref='accountSelect'>
            {this.renderAccountGroups()}
          </Input>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="row">
        {this.renderAccountFilter()}
      </div>
    );
  }
}

AccountFilter.propTypes = {
  loaded: React.PropTypes.bool.isRequired,
  accountGroups: React.PropTypes.object.isRequired,
  accountTypes: React.PropTypes.array.isRequired,
  currentAccount: React.PropTypes.object.isRequired,
  fetch: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    loaded: state.accountStore.get('loaded'),
    accountGroups: state.accountStore.get('accountGroups').toJS(),
    accountTypes: state.accountStore.get('accountTypes').toJS(),
    currentAccount: state.accountStore.get('currentAccount').toJS()
  };
}

export default connect(mapStateToProps)(AccountFilter);
