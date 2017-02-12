import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../common/page-header';
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

  render() {
    return (
      <div>
        <PageHeader title="import history" apiStatus={this.props.apiStatus} />
        <SearchCriteria filters={[{ name: ACCOUNT_FILTER }]} fetch={this.fetchHistory} />
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