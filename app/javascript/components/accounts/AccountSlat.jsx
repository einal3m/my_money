import React from 'react';
import PropTypes from 'prop-types';
import Balance from '../common/Balance';
import AccountIcon from './AccountIcon';
import AccountActionButtons from './AccountActionButtons';
import { routeToTransactions } from '../../actions/routing-actions';

const AccountSlat = (props) => {

  const viewTransactions = () => {
    routeToTransactions(props.account.id);
  };

  return (
    <div className="account">
      <div className="account-icon">
        <AccountIcon accountType={props.account.accountType} />
      </div>
      <div className="account-detail">
        <div>
          <a className="name-link" onClick={viewTransactions}><h6>{props.account.name}</h6></a>
          <span className="text-muted">{props.account.bank}</span>
        </div>
        <div className="currency balance">
          <Balance balance={props.account.currentBalance} />
        </div>
      </div>
      <div className="button-group button-group-small button-group-secondary">
        <AccountActionButtons account={props.account} />
      </div>
    </div>
  );
}

export default AccountSlat;

AccountSlat.propTypes = {
  account: PropTypes.shape({
    id: PropTypes.number.isRequired,
    accountType: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bank: PropTypes.string,
    currentBalance: PropTypes.number.isRequired,
  }),
};

