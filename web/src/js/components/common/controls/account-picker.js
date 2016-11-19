import React, { PropTypes } from 'react';
import { MenuItem, DropdownButton } from 'react-bootstrap';

require('../../../../css/picker.scss');

export default class AccountPicker extends React.Component {

  onSelect = (key) => {
    this.props.onChange(Number(key));
  };

  sortedAccounts = accounts => (
    accounts.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    })
  );

  renderAccountName(account) {
    let selected;
    if (this.props.multiple) {
      selected = this.props.value.filter(accountId => accountId === account.id).length > 0;
    } else {
      selected = this.props.value === account.id;
    }
    const prefix = selected ? '\u2713' : '\u00A0\u00A0';
    return `${prefix} ${account.name}`;
  }

  renderMultiAccounts() {
    const menuItems = [];
    this.props.accountTypes.forEach((accountType) => {
      if (this.props.accountGroups[accountType.code]) {
        menuItems.push(<MenuItem key={`account_type_${accountType.code}`} header>{accountType.name}</MenuItem>);
        this.sortedAccounts(this.props.accountGroups[accountType.code]).forEach((account) => {
          menuItems.push(
            <MenuItem key={`account_${account.id}`} eventKey={account.id}>{this.renderAccountName(account)}</MenuItem>
          );
        });
        menuItems.push(<MenuItem key={`divider_${accountType.code}`} divider />);
      }
    });

    menuItems.pop();
    return menuItems;
  }

  renderTitle() {
    let title;
    if (this.props.multiple) {
      title = 'Add/Remove Accounts...';
    } else {
      this.props.accountTypes.forEach((accountType) => {
        if (this.props.accountGroups[accountType.code]) {
          this.props.accountGroups[accountType.code].forEach((account) => {
            if (account.id === this.props.value) {
              title = account.name;
            }
          });
        }
      });
    }

    return title;
  }

  render() {
    return (
      <div className="picker form-horizontal">
        <div className="form-group">
          <label htmlFor="account-dropdown" className="control-label col-xs-4">Accounts</label>
          <div className="col-xs-8">
            <DropdownButton
              title={this.renderTitle()}
              pullRight
              id="account-dropdown"
              onSelect={this.onSelect}
            >
              {this.renderMultiAccounts()}
            </DropdownButton>
          </div>
        </div>
      </div>
    );
  }
}

AccountPicker.propTypes = {
  multiple: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]).isRequired,
  accountGroups: PropTypes.shape({}).isRequired,
  accountTypes: PropTypes.arrayOf(PropTypes.shape({ code: PropTypes.string.isRequired })).isRequired,
  onChange: PropTypes.func.isRequired,
};
