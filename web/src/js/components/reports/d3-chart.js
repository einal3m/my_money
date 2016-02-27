import React from 'react';
import barChart from './bar-chart';
import moneyUtil from '../../util/money-util';
import ChartTooltip from './chart-tooltip';

export default class D3Chart extends React.Component {

  constructor() {
    super();
    this.state = {tooltipData: null};
  }

  componentDidMount() {
    let seriesData = [
      {name: 'Actual', data: [400, 2300, -1000, -1005, -2345], backgroundColour: '#61ABDB', borderColor: 'maroon'},
      {name: 'Last Year', data: [4300, 2300, 1000, -1500, -2345], backgroundColour: '#FDCA3A', borderColor: 'maroon'},
      {name: 'Budget', data: [2500, -2300, -3330, -1500, 10], backgroundColour: '#80D8C4', borderColor: 'maroon'}
    ];

    let options = {
      height: 450,
      width: this.refs.chartContainer.getDOMNode().offsetWidth - 20
    };

    let callBacks = {
      showTooltip: this.showTooltip.bind(this),
      hideTooltip: this.hideTooltip.bind(this),
      formatYLabels: this.formatMoney.bind(this)
    };

    barChart(['Feb-15', 'Mar-15', 'Apr-15', 'May-15', 'Jun-15'], seriesData, '#d3-chart', options, callBacks);
  }

  showTooltip(tooltipData) {
    this.setState({tooltipData: tooltipData});
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
      <div className='text-center' ref='chartContainer' className='chart-container'>
        <ChartTooltip ref='tooltip' tooltipData={this.state.tooltipData} chartWidth={1000}/>
        <div id='d3-chart' />
      </div>
    );
  }
}