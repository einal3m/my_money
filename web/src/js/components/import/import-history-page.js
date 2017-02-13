import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../common/page-header';
import BankStatementTable from './bank-statement-table';
import SearchCriteria, { ACCOUNT_FILTER } from '../common/criteria/search-criteria';
import { getBankStatements } from '../../actions/import-actions';

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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loaded: state.bankStatementStore.get('loaded'),
    bankStatements: state.bankStatementStore.get('bankStatements').toJS(),
    apiStatus: state.apiStatusStore.toJS(),
  };
}

ImportHistoryPageComponent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  bankStatements: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  apiStatus: PropTypes.shape({}),
};

export default connect(mapStateToProps)(ImportHistoryPageComponent);
