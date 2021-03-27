import React from 'react';
import PropTypes from 'prop-types';

export default class ChartLegend extends React.Component {

  renderLegendItems() {
    let style;
    return this.props.chartData.seriesData.map((series, i) => {
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

  renderLegend() {
    return (
      <div className="chart-legend" style={{ top: '30px', right: '0px' }}>
        <div className="legend-items">
          {this.renderLegendItems()}
        </div>
      </div>
      );
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        {this.renderLegend()}
      </div>
    );
  }
}

ChartLegend.propTypes = {
  chartData: PropTypes.shape({
    seriesData: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};
