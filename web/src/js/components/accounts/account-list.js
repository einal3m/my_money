'use strict';

import connectToStores from 'alt/utils/connectToStores';
import React from 'react';
import AccountStore from '../../stores/account-store';
import accountActions from '../../actions/account-actions';
import PageHeader from '../common/page-header';
import AccountGroup from './account-group';
import { Button, DropdownButton, MenuItem, Dropdown, Glyphicon } from 'react-bootstrap';
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

  newAccountType(eventKey) {
    if (eventKey === '2') {
      return 'share'
    }
    return 'savings';
  }

  showNewAccountModal(event, eventKey) {
    this.setState({showNewAccountModal: this.newAccountType(eventKey)});
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
        <NewAccountModal show={!!this.state.showNewAccountModal} 
                         accountType={this.state.showNewAccountModal}
                         onClose={this.closeNewAccountModal.bind(this)} 
                         onSave={this.createAccount.bind(this)}
                         ref='newAccountModal' />
      );
    }
  }

  renderNewAccountButtons() {
    return (
      <Dropdown id='new-account' pullRight onSelect={this.showNewAccountModal.bind(this)} ref='newAccountButton'>
        <Dropdown.Toggle>
          <Glyphicon glyph='plus' />&nbsp;
          New Account
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <MenuItem eventKey='1' ref='newSavingsAccountButton'>New Savings Account</MenuItem>
          <MenuItem eventKey='2' ref='newShareAccountButton'>New Share Account</MenuItem>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  render() {
    return (
      <div>
        <PageHeader title="my accounts">
          {this.renderNewAccountButtons()}
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
