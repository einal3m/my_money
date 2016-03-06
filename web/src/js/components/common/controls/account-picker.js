import React from 'react';
import ReactDOM from 'react-dom';
import accountActions from '../../../actions/account-actions';
import { MenuItem, DropdownButton} from 'react-bootstrap';

export default class AccountPicker extends React.Component {

  onSelect(event, key) {
    this.props.onChange(Number(key));
  }

  renderAccountName(account) {
    let selected;
    if (this.props.multiple) {
      selected = this.props.value.filter(accountId => accountId === account.id).length > 0;
    } else {
      selected = this.props.value === account.id;
    }
    let prefix = selected ? '\u2713' : '\u00A0\u00A0';
    return `${prefix} ${account.name}`;
  }

  renderMultiAccounts() {
    let menuItems = [];
    this.props.accountTypes.forEach(accountType => {
      if (this.props.accountGroups[accountType.code]) {
        menuItems.push(<MenuItem key={`account_type_${accountType.code}`} header>{accountType.name}</MenuItem>);
        this.props.accountGroups[accountType.code].map(account => {
          menuItems.push(<MenuItem key={`account_${account.id}`} eventKey={account.id}>{this.renderAccountName(account)}</MenuItem>);
        });
        menuItems.push(<MenuItem key={`divider_${accountType.code}`} divider/>);
      }
    });

    menuItems.pop();
    return menuItems;
  }

  render() {
    return (
      <div className='form-horizontal'>
        <div className='form-group'>
          <label className="control-label col-xs-4">Accounts</label>
          <div className='col-xs-8'>
            <DropdownButton ref='dropdown' title='Add/Remove Accounts...' pullRight id='account-dropdown' onSelect={this.onSelect.bind(this)}>
              {this.renderMultiAccounts()}
            </DropdownButton>
          </div>
        </div>
      </div>
    );
  }
}

AccountPicker.propTypes = {
  multiple: React.PropTypes.bool,
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.arrayOf(React.PropTypes.number)
  ]).isRequired,
  accountGroups: React.PropTypes.object.isRequired,
  accountTypes: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired
};
