import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageHeader from '../common/PageHeader';
import SearchCriteria, { DATE_RANGE_FILTER, ACCOUNT_FILTER } from '../common/criteria/SearchCriteria';
import D3LineChart from './D3LineChart';
import { getAccountBalanceReport } from '../../actions/report-actions';
import accountBalanceSelector from '../../selectors/account-balance-selector';

import '../../stylesheets/common.scss';
import '../../stylesheets/report.scss';

export class AccountBalanceReport extends React.Component {

  constructor() {
    super();
    this.fetchReport();
  }

  fetchReport = () => {
    getAccountBalanceReport();
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
          filters={[{ name: DATE_RANGE_FILTER }, { name: ACCOUNT_FILTER, options: { multiple: true } }]}
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
    seriesData: accountBalanceSelector(state).toJS(),
  };
}

AccountBalanceReport.propTypes = {
  seriesData: PropTypes.arrayOf(PropTypes.shape({})),
};

export default connect(mapStateToProps)(AccountBalanceReport);
