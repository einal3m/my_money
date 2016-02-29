import React from 'react';
import lineChart from './line-chart';
import moneyUtil from '../../util/money-util';
import dateUtil from '../../util/date-util';
import ChartTooltip from './chart-tooltip';

export default class D3LineChart extends React.Component {

  constructor() {
    super();

    this.state = {tooltipData: null};
    this.callbacks = {
      showTooltip: this.showTooltip.bind(this),
    //  hideTooltip: this.hideTooltip.bind(this),
      formatYLabels: this.formatMoney.bind(this),
      formatXLabels: this.formatDate.bind(this)

    };
  }

  componentDidMount() {
    let options = {
      height: 450,
      width: this.refs.chartContainer.offsetWidth - 20
    };

    lineChart(this.props.chartData.seriesData, '#d3-chart', options, this.callbacks);
  }

  showTooltip(tooltipData) {
    this.setState({tooltipData: tooltipData});
    this.refs.tooltip.show();
  }
  //
  //hideTooltip() {
  //  this.refs.tooltip.hide();
  //}

  formatMoney(amount) {
    return moneyUtil.numberFormatWithSign(amount);
  }

  formatDate(date) {
    return dateUtil.chartFormat(date);
  }

  render() {
    return (
      <div className='text-center' ref='chartContainer' className='chart-container'>
        <ChartTooltip ref='tooltip' tooltipData={this.state.tooltipData} chartWidth={1000}/>
        <div id='d3-chart' />
      </div>
    );
  }
}
