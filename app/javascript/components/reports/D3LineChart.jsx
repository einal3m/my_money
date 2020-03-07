import React from 'react';
import PropTypes from 'prop-types';
import lineChart from './d3/LineChart';
import moneyUtil from '../../util/money-util';
import dateUtil from '../../util/date-util';
import ChartTooltip from './ChartTooltip';
import ChartLegend from './ChartLegend';

export default class D3LineChart extends React.Component {

  constructor() {
    super();
    this.state = { tooltipData: null, showTooltip: false };
  }

  componentDidMount() {
    this.drawLineChart(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.chart.removeChild(this.chart.firstChild);
    this.drawLineChart(nextProps);
  }

  drawLineChart(props) {
    lineChart(
      props.chartData.seriesData,
      '#d3-chart',
      this.chartOptions(),
      this.chartCallbacks
    );
  }

  chartOptions = () => ({
    height: 450,
    width: this.chartContainer.offsetWidth - 20,
  });

  showTooltip = (tooltipData) => {
    this.setState({ tooltipData, showTooltip: true });
  };

  hideTooltip = () => {
    this.setState({ tooltipData: null, showTooltip: false });
  };

  formatMoney = amount => moneyUtil.numberFormatWithSign(amount);

  formatDate = date => dateUtil.chartFormat(date);

  chartCallbacks = {
    showTooltip: this.showTooltip,
    hideTooltip: this.hideTooltip,
    formatYLabels: this.formatMoney,
    formatXLabels: this.formatDate,
  };

  render() {
    return (
      <div className="chart-container" ref={(container) => { this.chartContainer = container; }}>
        <ChartTooltip show={this.state.showTooltip} tooltipData={this.state.tooltipData} chartWidth={1000} />
        <ChartLegend chartData={this.props.chartData} />
        <div id="d3-chart" ref={(chart) => { this.chart = chart; }} />
      </div>
    );
  }
}

D3LineChart.propTypes = {
  chartData: PropTypes.shape({
    seriesData: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};
