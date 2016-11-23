import React, { PropTypes } from 'react';
import barChart from './d3/bar-chart';
import moneyUtil from '../../util/money-util';
import ChartTooltip from './chart-tooltip';

export default class D3BarChart extends React.Component {

  constructor() {
    super();
    this.state = { tooltipData: null, showTooltip: false };
  }

  componentDidMount() {
    barChart(
      this.props.chartData.xAxisLabels,
      this.props.chartData.seriesData,
      '#d3-chart',
      this.chartOptions(),
      this.chartCallbacks
    );
  }

  componentWillReceiveProps(nextProps) {
    this.chart.removeChild(this.chart.firstChild);

    barChart(
      nextProps.chartData.xAxisLabels,
      nextProps.chartData.seriesData,
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

  formatMoney = amount => moneyUtil.numberFormatWithSign(moneyUtil.centsToDollars(amount));

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

D3BarChart.propTypes = {
  chartData: PropTypes.shape({
    xAxisLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    seriesData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
};
