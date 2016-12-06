import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../common/page-header';
import D3BarLineComboChart from './d3-bar-line-combo-chart';
import { chartDataForCombo } from '../../selectors/report-selector';
import { getIncomeExpenseBarReport } from '../../actions/report-actions';

require('../../../css/common.scss');
require('../../../css/report.scss');

export class IncomeVsExpenseBarChartComponent extends React.Component {

  constructor() {
    super();
    getIncomeExpenseBarReport();
  }

  renderChart() {
    if (this.props.loaded) {
      return <D3BarLineComboChart chartData={this.props.chartData} />;
    }
    return undefined;
  }

  render() {
    return (
      <div>
        <PageHeader title="Income vs Expenses" />
        <div id="report" className="container">
          {this.renderChart()}
        </div>
      </div>
    );
  }
}

IncomeVsExpenseBarChartComponent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  chartData: PropTypes.shape({}),
};

function mapStateToProps(state) {
  return {
    loaded: state.reportStore.get('loaded'),
    chartData: chartDataForCombo(state),
  };
}

export default connect(mapStateToProps)(IncomeVsExpenseBarChartComponent);
