import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageHeader from '../common/PageHeader';
import D3BarLineComboChart from './D3BarLineComboChart';
import { chartDataForCombo } from '../../selectors/report-selector';
import { getIncomeExpenseBarReport } from '../../actions/report-actions';

import '../../stylesheets/common.scss';
import '../../stylesheets/report.scss';

export class IncomeVsExpenseBarChartComponent extends React.Component {

  constructor() {
    super();
    getIncomeExpenseBarReport();
  }

  renderChart() {
    if (this.props.loaded && this.props.chartData) {
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
