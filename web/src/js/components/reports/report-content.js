import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import D3BarChart from './d3-bar-chart';
import chartDataForMonthTotals from '../../selectors/report-selector';

export class ReportContentComponent extends React.Component {

  renderTable = () => <div>this is a table</div>;

  renderChart = () => <D3BarChart chartData={this.props.chartData} />;

  renderNoTransactions = () => <div>There are no transactions</div>;

  render() {
    let content;
    if (this.props.transactions.length === 0) {
      content = this.renderNoTransactions();
    } else if (this.props.viewType === 'chart') {
      content = this.renderChart();
    } else {
      content = this.renderTable();
    }

    return content;
  }
}

ReportContentComponent.propTypes = {
  viewType: PropTypes.string.isRequired,
  chartData: PropTypes.shape({}),
  transactions: PropTypes.arrayOf(PropTypes.shape({})),
};

function mapStateToProps(state) {
  return {
    viewType: state.reportStore.get('viewType'),
    chartData: chartDataForMonthTotals(state),
    transactions: state.reportStore.get('transactions').toJS(),
  };
}

export default connect(mapStateToProps)(ReportContentComponent);
