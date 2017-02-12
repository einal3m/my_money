import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../common/page-header';
import SearchCriteria, { ACCOUNT_FILTER } from '../common/criteria/search-criteria';
import { getAccounts } from '../../actions/account-actions';

export class ImportHistoryPageComponent extends React.Component {

  constructor() {
    super();
    getAccounts({ useStore: true });
  }

  fetchHistory = () => {
    console.log('fetchHistory');
  };

  render() {
    return (
      <div>
        <PageHeader title="import history" />
        <SearchCriteria filters={[{ name: ACCOUNT_FILTER }]} fetch={this.fetchHistory} />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
  };
}

ImportHistoryPageComponent.propTypes = {
};

export default connect(mapStateToProps)(ImportHistoryPageComponent);