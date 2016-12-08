import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setCurrentAccount, toggleSelectedAccount } from '../../../actions/account-actions';
import accountSelector from '../../../selectors/account-selector';
import AccountPicker from '../controls/account-picker';

export class AccountFilterComponent extends React.Component {
  onChange = (accountId) => {
    setCurrentAccount(accountId);
    if (this.props.multiple) {
      toggleSelectedAccount(accountId);
    }
    this.props.fetch();
  };

  renderAccountPicker() {
    if (this.props.loaded) {
      const value = this.props.multiple ? this.props.selectedAccounts : this.props.currentAccount.id;
      return (
        <AccountPicker
          multiple={this.props.multiple}
          accountTypes={this.props.accountTypes}
          accountGroups={this.props.accountGroups}
          value={value}
          onChange={this.onChange}
        />
      );
    }
    return <div />;
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

AccountFilterComponent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  accountGroups: PropTypes.shape({}).isRequired,
  accountTypes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  currentAccount: PropTypes.shape({
    id: PropTypes.number,
  }),
  selectedAccounts: PropTypes.arrayOf(PropTypes.number),
  fetch: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    loaded: state.accountStore.get('loaded'),
    accountGroups: accountSelector(state).toJS(),
    accountTypes: state.accountStore.get('accountTypes').toJS(),
    selectedAccounts: state.accountStore.get('selectedAccounts').toJS(),
    currentAccount: state.accountStore.get('currentAccount').toJS(),
  };
}

export default connect(mapStateToProps)(AccountFilterComponent);
