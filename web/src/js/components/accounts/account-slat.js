'use strict';
import React from 'react';
import { MenuItem, DropdownButton, Menu, Glyphicon } from 'react-bootstrap';
import moneyUtil from '../../util/money-util';
import accountActions from '../../actions/account-actions';
require("../../../css/common.scss");
require('../../../images/piggy-bank.gif');

export default class AccountSlat extends React.Component {
  accountActions(event, eventKey) {
    if (eventKey === '3') {
      accountActions.deleteAccount(this.props.account.id);
    }
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
        <MenuItem eventKey="1">View Transactions</MenuItem>
        <MenuItem eventKey="2">Edit Account Details</MenuItem>
        <MenuItem eventKey="3">Delete Account</MenuItem>
      </DropdownButton>
    );
  }

  renderCurrentBalance() {
    let currentBalanceDollars = moneyUtil.centsToDollars(this.props.account.currentBalance);
    return moneyUtil.moneyFormat(currentBalanceDollars);
  }

  render() {
    return (
      <li className='slat-item'>
        <div className="row">
          <div className="slat-icon col-sm-1 col-xs-2">
            {this.renderSlatImage(this.props.account.accountType)}
          </div>
          <div className="slat-detail col-sm-11 col-xs-10">
            <div className="row">
              <div className="col-xs-4 col-sm-6">
                <h4>{this.props.account.name}</h4>
                <span className="text-muted">{this.props.account.bank}</span>
              </div>
              <div className="currency col-xs-4 col-sm-5">
                <h3>{this.renderCurrentBalance()}</h3>
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

AccountSlat.propTypes = {
  account: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    name: React.PropTypes.string.isRequired,
    bank: React.PropTypes.string,
    currentBalance: React.PropTypes.number.isRequired
  })
};

