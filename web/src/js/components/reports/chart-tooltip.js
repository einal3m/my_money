import React from 'react';

export default class ChartTooltip extends React.Component {

  show() {
  }

  hide() {
  }

  renderTooltipItems() {
    return this.props.tooltipData.seriesLabel.map((label, i) => (
      <div key={i} className='tooltip-item'>
        <span className='tooltip-icon' style={{color: this.props.tooltipData.colours[i]}}>{"\u25CF"}</span>
        <span className='tooltip-label'>{label}</span>
        <span className='tooltip-value'>{this.props.tooltipData.values[i]}</span>
      </div>
    ));
  }

  renderTooltip() {
    if (this.props.tooltipData) {
      let style = {top: '30px'};
      if (this.props.tooltipData.tooltipPosition === 'right') {
        style.left = (this.props.chartWidth - 10) + 'px';
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