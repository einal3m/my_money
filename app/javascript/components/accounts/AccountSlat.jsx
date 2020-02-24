import React from 'react';
import PropTypes from 'prop-types';
import Balance from '../common/Balance';
import AccountIcon from './AccountIcon';
import AccountActionButtons from './AccountActionButtons';
import { routeToTransactions } from '../../actions/routing-actions';

export default class AccountSlat extends React.Component {

  viewTransactions = () => {
    routeToTransactions(this.props.account.id);
  };

  renderName() {
    return <a className="name-link" onClick={this.viewTransactions}><h6>{this.props.account.name}</h6></a>;
  }

  render() {
    return (
      <div className="account">
        <div className="account-icon">
          <AccountIcon accountType={this.props.account.accountType} />
        </div>
        <div className="account-detail">
          <div>
            {this.renderName()}
            <span className="text-muted">{this.props.account.bank}</span>
          </div>
          <div className="currency balance">
            <Balance balance={this.props.account.currentBalance} />
          </div>
        </div>
        <div className="button-group button-group-small button-group-secondary">
          <AccountActionButtons account={this.props.account} />
        </div>
      </div>
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

