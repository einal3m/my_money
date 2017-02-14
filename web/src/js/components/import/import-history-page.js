import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../common/page-header';
import BankStatementTable from './bank-statement-table';
import BankStatementDeleteModal from './bank-statement-delete-modal';
import SearchCriteria, { ACCOUNT_FILTER } from '../common/criteria/search-criteria';
import { getBankStatements } from '../../actions/bank-statement-actions';

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
      <div>
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
