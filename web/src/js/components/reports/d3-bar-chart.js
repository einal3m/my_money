import React from 'react';
import barChart from './bar-chart';
import moneyUtil from '../../util/money-util';
import ChartTooltip from './chart-tooltip';

export default class D3BarChart extends React.Component {

  constructor() {
    super();
    this.state = { tooltipData: null };
    this.callBacks = {
      showTooltip: this.showTooltip.bind(this),
      hideTooltip: this.hideTooltip.bind(this),
      formatYLabels: this.formatMoney.bind(this),
    };
  }

  componentDidMount() {
    const options = {
      height: 450,
      width: this.refs.chartContainer.getDOMNode().offsetWidth - 20,
    };

    barChart(this.props.chartData.xAxisLabels, this.props.chartData.seriesData, '#d3-chart', options, this.callBacks);
  }

  showTooltip(tooltipData) {
    this.setState({ tooltipData });
    this.refs.tooltip.show();
  }

  hideTooltip() {
    this.refs.tooltip.hide();
  }

  formatMoney(amount) {
    return moneyUtil.numberFormatWithSign(amount);
  }

  render() {
    return (
      <div className="text-center" ref="chartContainer" className="chart-container">
        <ChartTooltip ref="tooltip" tooltipData={this.state.tooltipData} chartWidth={1000} />
        <div id="d3-chart" />
      </div>
    );
  }
}
