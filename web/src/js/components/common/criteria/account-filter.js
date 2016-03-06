import React from 'react';
import {connect} from 'react-redux';
import accountActions from '../../../actions/account-actions';
import accountSelector from '../../../selectors/account-selector';
import { Input, MenuItem, DropdownButton} from 'react-bootstrap';
import AccountPicker from '../controls/account-picker';

export class AccountFilter extends React.Component {
  constructor() {
    super();
    accountActions.getAccounts();
  }

  onChange(accountId) {
    accountActions.setCurrentAccount(accountId);
    if (this.props.multiple) {
      accountActions.toggleSelectedAccount(accountId);
    }
    this.props.fetch();
  }

  renderAccountPicker() {
    if (this.props.loaded) {
      let value = this.props.multiple ? this.props.selectedAccounts : this.props.currentAccount.id;
      return (
        <AccountPicker multiple={this.props.multiple} accountTypes={this.props.accountTypes}
                       accountGroups={this.props.accountGroups}
                       value={value} onChange={this.onChange.bind(this)}/>
      );
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-4">
          {this.renderAccountPicker()}
        </div>
      </div>
    );
  }
}

AccountFilter.propTypes = {
  loaded: React.PropTypes.bool.isRequired,
  accountGroups: React.PropTypes.object.isRequired,
  accountTypes: React.PropTypes.array.isRequired,
  currentAccount: React.PropTypes.object,
  selectedAccounts: React.PropTypes.arrayOf(React.PropTypes.number),
  fetch: React.PropTypes.func.isRequired,
  multiple: React.PropTypes.bool
};

function mapStateToProps(state) {
  return {
    loaded: state.accountStore.get('loaded'),
    accountGroups: accountSelector(state).toJS(),
    accountTypes: state.accountStore.get('accountTypes').toJS(),
    selectedAccounts: state.accountStore.get('selectedAccounts').toJS(),
    currentAccount: state.accountStore.get('currentAccount').toJS()
  };
}

export default connect(mapStateToProps)(AccountFilter);
