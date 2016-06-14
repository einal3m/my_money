'use strict';
import React from 'react';
import { MenuItem, DropdownButton, Menu, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { hashHistory } from 'react-router';
import moneyUtil from '../../util/money-util';
import Balance from '../common/balance';
import accountActions from '../../actions/account-actions';
import transactionActions from '../../actions/transaction-actions';
require("../../../css/common.scss");
require('../../../images/piggy-bank.gif');

export default class AccountSlat extends React.Component {
  accountActions(event, eventKey) {
    if (eventKey === '1') {
      this.viewTransactions();
    }
    if (eventKey === '3') {
      accountActions.deleteAccount(this.props.account.get('id'));
    }
  }

  viewTransactions() {
    accountActions.setCurrentAccount(this.props.account.get('id'));
    hashHistory.push('/transactions');
  }

  renderSlatImage(accountType) {
    if (accountType === 'savings') {
      return (
        <img src={require("../../../images/piggy-bank.gif")} height={35} width={35} />
      );
    } else {
      return (
        <span className="fa-stack fa-lg">
          <i className="fa fa-circle fa-stack-2x"></i>
          <i className="fa fa-bank fa-stack-1x fa-inverse"></i>
        </span>
      );
    }
  }

  renderButtonGroup() {
    return (
      <DropdownButton title="..." pullRight noCaret id={'action-button-' + this.props.account.id} 
                      ref='accountActionsButton' onSelect={this.accountActions.bind(this)}>
        <LinkContainer to="/transactions"><MenuItem eventKey='1'>View Transactions</MenuItem></LinkContainer>
        <MenuItem eventKey="2">Edit Account Details</MenuItem>
        <MenuItem eventKey="3">Delete Account</MenuItem>
      </DropdownButton>
    );
  }

  renderCurrentBalance() {
    let currentBalanceDollars = moneyUtil.centsToDollars(this.props.account.get('currentBalance'));
    return moneyUtil.moneyFormat(currentBalanceDollars);
  }

  renderName() {
    return <a className='name-link' onClick={this.viewTransactions.bind(this)}><h4>{this.props.account.get('name')}</h4></a>;
  }

  render() {
    return (
      <li className='slat-item'>
        <div className="row">
          <div className="slat-icon col-sm-1 col-xs-2">
            {this.renderSlatImage(this.props.account.get('accountType'))}
          </div>
          <div className="slat-detail col-sm-11 col-xs-10">
            <div className="row">
              <div className="col-xs-4 col-sm-6">
                {this.renderName()}
                <span className="text-muted">{this.props.account.get('bank')}</span>
              </div>
              <div className="currency balance col-xs-4 col-sm-5">
                <Balance balance={this.props.account.get('currentBalance')} />
              </div>
              <div className="slat-icon col-xs-4 col-sm-1">
                {this.renderButtonGroup()}
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

// AccountSlat.propTypes = {
//   account: React.PropTypes.shape({
//     id: React.PropTypes.number.isRequired,
//     name: React.PropTypes.string.isRequired,
//     bank: React.PropTypes.string,
//     currentBalance: React.PropTypes.number.isRequired
//   })
// };

