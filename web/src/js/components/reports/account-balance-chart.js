import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../common/page-header';
import SearchCriteria from '../common/criteria/search-criteria';
import D3LineChart from './d3-line-chart';
import reportActions from '../../actions/report-actions';
import accountBalanceSelector from '../../selectors/account-balance-selector';

require('../../../css/common.scss');
require('../../../css/report.scss');

export class AccountBalanceReport extends React.Component {

  componentDidUpdate(prevProps) {
    if (!prevProps.loaded && this.props.loaded) {
      this.fetchReport();
    }
  }

  fetchReport = () => {
    reportActions.getAccountBalanceReport();
  };

  renderChart() {
    if (this.props.seriesData.length > 0) {
      return <D3LineChart chartData={{ seriesData: this.props.seriesData }} />;
    }
    return undefined;
  }

  render() {
    return (
      <div>
        <PageHeader title="EOD Balance Report" />
        <SearchCriteria
          filters={[{ name: 'DATE_RANGE_FILTER' }, { name: 'ACCOUNT_FILTER' }]}
          fetch={this.fetchReport}
        />
        <div id="report" className="container">
          {this.renderChart()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loaded: state.accountStore.get('loaded') && state.dateRangeStore.get('loaded'),
    seriesData: accountBalanceSelector(state).toJS(),
  };
}

AccountBalanceReport.propTypes = {
  loaded: PropTypes.bool.isRequired,
  seriesData: PropTypes.arrayOf(PropTypes.shape({})),
};

export default connect(mapStateToProps)(AccountBalanceReport);
