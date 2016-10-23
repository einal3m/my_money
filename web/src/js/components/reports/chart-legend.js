import React from 'react';
import AccountPicker from '../common/controls/account-picker';

export default class ChartLegend extends React.Component {

  renderLegendItems() {
    return this.props.chartData.seriesData.map((series, i) => (
      <div key={i} className="legend-item" style={{ borderTop: `2px solid ${series.backgroundColour}`, borderLeft: `2px solid ${series.backgroundColour}` }}>
        {series.name}
      </div>
    ));
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
  chartData: React.PropTypes.shape({
    seriesData: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};
