import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getAccounts } from '../../actions/account-actions';
import accountSelector from '../../selectors/account-selector';
import PageHeader from '../common/page-header';
import NewModelButtons from '../common/controls/new-model-buttons';
import AccountGroup from './account-group';
import AccountModal from './account-modal';

require('../../../css/common.scss');

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
        <PageHeader title="my accounts">
          <NewModelButtons modelTypes={['Savings Account', 'Share Account']} />
        </PageHeader>

        <div className="container">
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
};

function mapStateToProps(state) {
  return {
    accountGroups: accountSelector(state).toJS(),
    accountTypes: state.accountStore.get('accountTypes').toJS(),
  };
}

export default connect(mapStateToProps)(AccountListComponent);
