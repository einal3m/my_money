'use strict';

import connectToStores from 'alt/utils/connectToStores';
import React from 'react';
import AccountStore from '../../stores/account-store';
import accountActions from '../../actions/account-actions';
import PageHeader from '../common/page-header';
import AccountGroup from './account-group';
import { Button } from 'react-bootstrap';
import NewAccountModal from './new-account-modal';
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

  constructor() {
    super();
    this.state = {
      showNewAccountModal: false
    }
  }

  showNewAccountModal() {
    this.setState({showNewAccountModal: true});
  }

  closeNewAccountModal() {
    this.setState({showNewAccountModal: false});
  }

  createAccount(account) {
    accountActions.createAccount(account);
  }

  renderAccountGroups() {
    return this.props.accountGroups.filter((accountGroup) => {
      return accountGroup.accounts.length > 0;
    }).map((accountGroup) => {
      return <AccountGroup key={accountGroup.code} accountGroup={accountGroup} accounts={accountGroup.accounts} />;
    });
  }

  renderNewAccountModal() {
    if (this.state.showNewAccountModal) {
      return (
        <NewAccountModal show={this.state.showNewAccountModal} 
                         onClose={this.closeNewAccountModal.bind(this)} 
                         onSave={this.createAccount.bind(this)}
                         ref='newAccountModal' />
      );
    }
  }

  render() {
    return (
      <div>
        <PageHeader title="my accounts">
          <Button ref='newAccountButton' bsStyle="default" onClick={this.showNewAccountModal.bind(this)}>
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> New Account
          </Button>
        </PageHeader>

        <div className="container">
          {this.renderAccountGroups()}
        </div>
        
        {this.renderNewAccountModal()}
      </div>
    );
  }
}

export default connectToStores(AccountList);
