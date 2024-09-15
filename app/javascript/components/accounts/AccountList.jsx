import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAccounts } from '../../actions/account-actions';
import { activeAccountSelector } from '../../selectors/account-selector';
import PageHeader from '../common/PageHeader';
import NewModelButtons from '../common/controls/NewModelButtons';
import AccountGroup from './AccountGroup';
import AccountModal from './AccountModal';

import '../../stylesheets/common.scss';
import '../../stylesheets/accounts.scss';

export class AccountListComponent extends React.Component {
  constructor() {
    super();
    getAccounts();
  }

  renderAccountGroups() {
    return this.props.accountTypes.filter(
      accountType => this.props.accountGroups[accountType.code]
    ).map((accountType) => {
      const accounts = this.props.accountGroups[accountType.code];
      return <AccountGroup key={accountType.code} accountType={accountType} accounts={accounts} />;
    });
  }

  render() {
    return (
      <div>
        <PageHeader title="my accounts" apiStatus={this.props.apiStatus}>
          <NewModelButtons modelTypes={['Savings Account', 'Share Account', 'Loan Account']} />
        </PageHeader>

        <div className="account-list">
          {this.renderAccountGroups()}
        </div>

        <AccountModal />
      </div>
    );
  }
}

AccountListComponent.propTypes = {
  accountGroups: PropTypes.shape({}).isRequired,
  accountTypes: PropTypes.arrayOf(PropTypes.shape({ code: PropTypes.string.isRequired })).isRequired,
  apiStatus: PropTypes.shape({}),
};

function mapStateToProps(state) {
  return {
    accountGroups: activeAccountSelector(state).toJS(),
    accountTypes: state.accountStore.get('accountTypes').toJS(),
    apiStatus: state.apiStatusStore.toJS(),
  };
}

export default connect(mapStateToProps)(AccountListComponent);
