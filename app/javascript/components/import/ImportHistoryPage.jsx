import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageHeader from '../common/PageHeader';
import BankStatementTable from './BankStatementTable';
import BankStatementDeleteModal from './BankStatementDeleteModal';
import SearchCriteria, { ACCOUNT_FILTER } from '../common/criteria/SearchCriteria';
import { getBankStatements } from '../../actions/bank-statement-actions';

import '../../stylesheets/common.scss';

export class ImportHistoryPageComponent extends React.Component {

  constructor() {
    super();
    this.fetchHistory();
  }

  fetchHistory = () => {
    getBankStatements();
  };

  renderBankTransactionTable() {
    if (this.props.loaded) {
      return <div className="container"><BankStatementTable bankStatements={this.props.bankStatements} /></div>;
    }
    return <div />;
  }

  render() {
    return (
      <div className="import-history">
        <PageHeader title="import history" apiStatus={this.props.apiStatus} />
        <SearchCriteria filters={[{ name: ACCOUNT_FILTER }]} fetch={this.fetchHistory} />
        {this.renderBankTransactionTable()}
        <BankStatementDeleteModal bankStatement={this.props.bankStatementForDelete} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const bankStatementForDelete = state.bankStatementStore.get('bankStatementForDelete');

  return {
    loaded: state.bankStatementStore.get('loaded'),
    bankStatements: state.bankStatementStore.get('bankStatements').toJS(),
    apiStatus: state.apiStatusStore.toJS(),
    bankStatementForDelete: bankStatementForDelete ? bankStatementForDelete.toJS() : null,
  };
}

ImportHistoryPageComponent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  bankStatements: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  apiStatus: PropTypes.shape({}),
  bankStatementForDelete: PropTypes.shape({}),
};

export default connect(mapStateToProps)(ImportHistoryPageComponent);
