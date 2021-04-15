import React from 'react';
import PropTypes from 'prop-types';

const ChartTooltip = (props) => {
  const renderTooltipItems = () => {
    return props.tooltipData.seriesLabel.map((label, i) => (
      <div key={i} className="tooltip-item">
        <span className="tooltip-icon" style={{ color: props.tooltipData.colours[i] }}>
          <i className="fa fa-circle" />
        </span>
        <span className="tooltip-label">{label}</span>
        <span className="tooltip-value">{props.tooltipData.values[i]}</span>
      </div>
    ));
  }

  const tooltipStyle = () => {
    const style = { top: '40px' };
    if (props.tooltipData.tooltipPosition === 'right') {
      style.right = '100px';
    } else {
      style.left = '100px';
    }
    return style;
  }

  const renderTooltip = () => {
    if (props.show) {
      return (
        <div className="chart-tooltip" style={tooltipStyle()}>
          <div className="tooltip-title" data-testid="tooltip-title">{props.tooltipData.periodLabel}</div>
          <div className="tooltip-items">
            {renderTooltipItems()}
          </div>
        </div>
      );
    }
    return undefined;
  }

  return (
    <div style={{ position: 'relative' }}>
      {renderTooltip()}
    </div>
  );
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

export default ChartTooltip;
