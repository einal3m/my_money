import React from 'react';

export default class ChartTooltip extends React.Component {

  renderTooltipItems() {
    return this.props.tooltipData.seriesLabel.map((label, i) => (
      <div key={i} className='tooltip-item'>
        <span className='tooltip-icon' style={{color: this.props.tooltipData.colours[i]}}><i className='fa fa-circle'/></span>
        <span className='tooltip-label'>{label}</span>
        <span className='tooltip-value'>{this.props.tooltipData.values[i]}</span>
      </div>
    ));
  }

  renderTooltip() {
    if (this.props.show) {
      let style = {top: '40px'};
      if (this.props.tooltipData.tooltipPosition === 'right') {
        style.right = '100px';//(this.props.chartWidth - 10) + 'px';
      } else {
        style.left = '100px';
      }

      return (
        <div className='chart-tooltip' style={style}>
          <div className='tooltip-title'>{this.props.tooltipData.periodLabel}</div>
          <div className='tooltip-items'>
            {this.renderTooltipItems()}
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div style={{position: 'relative'}}>
        {this.renderTooltip()}
      </div>
    )
  }
}