import React from 'react';
import PropTypes from 'prop-types';
import AccountSlat from './AccountSlat';

export default class AccountGroup extends React.Component {

  renderAccounts() {
    return this.props.accounts.map(account => (
      <AccountSlat key={account.id} account={account} />
    ));
  }

  accountGroupTitle() {
    return `${this.props.accountType.name} Accounts`;
  }

  render() {
    return (
      <div className="account-group">
        <h5 className="text-uppercase">{this.accountGroupTitle()}</h5>
        <div className="accounts">
          {this.renderAccounts()}
        </div>
      </div>
    );
  }
}

AccountGroup.propTypes = {
  accountType: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  accounts: PropTypes.arrayOf(PropTypes.shape({})),
};
