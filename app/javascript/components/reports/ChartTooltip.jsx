import React from 'react';
import PropTypes from 'prop-types';

export default class ChartTooltip extends React.Component {

  renderTooltipItems() {
    return this.props.tooltipData.seriesLabel.map((label, i) => (
      <div key={i} className="tooltip-item">
        <span className="tooltip-icon" style={{ color: this.props.tooltipData.colours[i] }}>
          <i className="fa fa-circle" />
        </span>
        <span className="tooltip-label">{label}</span>
        <span className="tooltip-value">{this.props.tooltipData.values[i]}</span>
      </div>
    ));
  }

  tooltipStyle() {
    const style = { top: '40px' };
    if (this.props.tooltipData.tooltipPosition === 'right') {
      style.right = '100px';
    } else {
      style.left = '100px';
    }
    return style;
  }

  renderTooltip() {
    if (this.props.show) {
      return (
        <div className="chart-tooltip" style={this.tooltipStyle()}>
          <div className="tooltip-title">{this.props.tooltipData.periodLabel}</div>
          <div className="tooltip-items">
            {this.renderTooltipItems()}
          </div>
        </div>
      );
    }
    return undefined;
  }
  render() {
    return (
      <div style={{ position: 'relative' }}>
        {this.renderTooltip()}
      </div>
    );
  }
}


ChartTooltip.propTypes = {
  show: PropTypes.bool.isRequired,
  tooltipData: PropTypes.shape({
    tooltipPosition: PropTypes.oneOf(['right', 'left']),
    periodLabel: PropTypes.string.isRequired,
    seriesLabel: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.string).isRequired,
    colours: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

