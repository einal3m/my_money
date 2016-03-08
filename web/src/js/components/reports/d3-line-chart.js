import React from 'react';
import lineChart from './line-chart';
import moneyUtil from '../../util/money-util';
import dateUtil from '../../util/date-util';
import ChartTooltip from './chart-tooltip';

export default class D3LineChart extends React.Component {

  constructor() {
    super();

    this.state = {tooltipData: null, showTooltip: false};
    this.callbacks = {
      showTooltip: this.showTooltip.bind(this),
      hideTooltip: this.hideTooltip.bind(this),
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

  shouldComponentUpdate(props, state) {
    if (props != this.props) {
      let options = {
        height: 450,
        width: this.refs.chartContainer.offsetWidth - 20
      };
      let svg = document.getElementsByTagName('svg')[0];
      svg.parentNode.removeChild(svg);
      lineChart(props.chartData.seriesData, '#d3-chart', options, this.callbacks);
    }

    return (state != this.state);
  }

  showTooltip(tooltipData) {
    this.setState({tooltipData: tooltipData, showTooltip: true});
  }

  hideTooltip() {
    this.setState({tooltipData: null, showTooltip: false});
  }

  formatMoney(amount) {
    return moneyUtil.numberFormatWithSign(amount);
  }

  formatDate(date) {
    return dateUtil.chartFormat(date);
  }

  render() {
    return (
      <div className='text-center' ref='chartContainer' className='chart-container'>
        <ChartTooltip ref='tooltip' show={this.state.showTooltip} tooltipData={this.state.tooltipData} chartWidth={1000}/>
        <div id='d3-chart' />
      </div>
    );
  }
}
