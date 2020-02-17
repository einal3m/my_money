import React, { PropTypes } from 'react';
import AccountSlat from './account-slat';

require('../../../css/common.scss');

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
        <h3>{this.accountGroupTitle()}</h3>
        <ul className="slats">
          {this.renderAccounts()}
        </ul>
        <br />
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
