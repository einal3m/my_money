import React, { PropTypes } from 'react';
import { MenuItem, DropdownButton } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { hashHistory } from 'react-router';
import moneyUtil from '../../util/money-util';
import Balance from '../common/balance';
import { setCurrentAccount, deleteAccount } from '../../actions/account-actions';

require('../../../css/common.scss');
require('../../../images/piggy-bank.gif');

export default class AccountSlat extends React.Component {
  accountActions = (eventKey) => {
    if (eventKey === '1') {
      this.viewTransactions();
    }
    if (eventKey === '3') {
      deleteAccount(this.props.account.id);
    }
  };

  viewTransactions = () => {
    setCurrentAccount(this.props.account.id);
    hashHistory.push('/transactions');
  };

  renderSlatImage(accountType) {
    if (accountType === 'savings') {
      return (
        <img src={require('../../../images/piggy-bank.gif')} height={35} width={35} />
      );
    } else {
      return (
        <span className="fa-stack fa-lg">
          <i className="fa fa-circle fa-stack-2x" />
          <i className="fa fa-bank fa-stack-1x fa-inverse" />
        </span>
      );
    }
  }

  renderButtonGroup() {
    return (
      <DropdownButton title="..." pullRight noCaret id={`action-button-${this.props.account.id}`}
        ref="accountActionsButton" onSelect={this.accountActions}
      >
        <LinkContainer to="/transactions"><MenuItem eventKey="1">View Transactions</MenuItem></LinkContainer>
        <MenuItem eventKey="2">Edit Account Details</MenuItem>
        <MenuItem eventKey="3">Delete Account</MenuItem>
      </DropdownButton>
    );
  }

  renderCurrentBalance() {
    const currentBalanceDollars = moneyUtil.centsToDollars(this.props.account.currentBalance);
    return moneyUtil.moneyFormat(currentBalanceDollars);
  }

  renderName() {
    return <a className="name-link" onClick={this.viewTransactions.bind(this)}><h4>{this.props.account.name}</h4></a>;
  }

  render() {
    return (
      <li className="slat-item">
        <div className="row">
          <div className="slat-icon col-sm-1 col-xs-2">
            {this.renderSlatImage(this.props.account.accountType)}
          </div>
          <div className="slat-detail col-sm-11 col-xs-10">
            <div className="row">
              <div className="col-xs-4 col-sm-6">
                {this.renderName()}
                <span className="text-muted">{this.props.account.bank}</span>
              </div>
              <div className="currency balance col-xs-4 col-sm-5">
                <Balance balance={this.props.account.currentBalance} />
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
  account: PropTypes.shape({
    id: PropTypes.number.isRequired,
    accountType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bank: PropTypes.string,
    currentBalance: PropTypes.number.isRequired,
  }),
};

