import React from 'react';
import PropTypes from 'prop-types';

const ChartLegend = (props) => {
  const renderLegendItems = () => {
    let style;
    return props.chartData.seriesData.map((series, i) => {
      style = {
        borderTop: `2px solid ${series.backgroundColour}`, borderLeft: `2px solid ${series.backgroundColour}`,
      };
      return (
        <div
          key={i}
          className="legend-item"
          style={style}
        >
          {series.name}
        </div>
      );
    });
  }

  const renderLegend = () => {
    return (
      <div className="chart-legend" style={{ top: '30px', right: '0px' }}>
        <div className="legend-items">
          {renderLegendItems()}
        </div>
      </div>
      );
  }

  return (
    <div style={{ position: 'relative' }}>
      {renderLegend()}
    </div>
  );
}

ChartLegend.propTypes = {
  chartData: PropTypes.shape({
    seriesData: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

export default ChartLegend;
