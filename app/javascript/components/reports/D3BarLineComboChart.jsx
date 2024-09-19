import React from 'react';
import PropTypes from 'prop-types';

import barLineComboChart from './d3/BarLineComboChart';
import { centsToDollars, numberFormatWithSign } from 'util/moneyUtil';
import ChartTooltip from './ChartTooltip';

export default class D3BarLineComboChart extends React.Component {

  constructor() {
    super();
    this.state = { tooltipData: null, showTooltip: false };
  }

  componentDidMount() {
    this.drawBarChart(this.props.chartData);
  }

  componentWillReceiveProps(nextProps) {
    this.chart.removeChild(this.chart.firstChild);
    this.drawBarChart(nextProps.chartData);
  }

  drawBarChart(chartData) {
    barLineComboChart(
      chartData.xAxisLabels,
      chartData.seriesData,
      '#d3-chart',
      this.chartOptions(),
      this.chartCallbacks
    );
  }

  chartOptions = () => ({
    height: 350,
    width: this.chartContainer.offsetWidth - 20,
  });

  showTooltip = (tooltipData) => {
    this.setState({ tooltipData, showTooltip: true });
  };

  hideTooltip = () => {
    this.setState({ showTooltip: false });
  };

  formatMoney = amount => numberFormatWithSign(centsToDollars(amount));

  chartCallbacks = {
    showTooltip: this.showTooltip,
    hideTooltip: this.hideTooltip,
    formatYLabels: this.formatMoney,
  };

  render() {
    return (
      <div className="chart-container" ref={(container) => { this.chartContainer = container; }}>
        <ChartTooltip tooltipData={this.state.tooltipData} show={this.state.showTooltip} />
        <div id="d3-chart" ref={(chart) => { this.chart = chart; }} />
      </div>
    );
  }
}

D3BarLineComboChart.propTypes = {
  chartData: PropTypes.shape({
    xAxisLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    seriesData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
};
