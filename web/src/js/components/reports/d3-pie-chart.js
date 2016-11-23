import React from 'react';
import pieChart from './d3/pie-chart';

export default class D3PieChart extends React.Component {

  componentDidMount() {
    const options = {
      height: 450,
      width: 450,
    };

    const data = [100.34, 3445.22, 212, 2000.11];
    const labels = ['One', 'Two', 'Three', 'Four'];
    pieChart(data, labels, '#d3-chart', options);
  }

  render() {
    return (
      <div className="chart-container" ref={(container) => { this.chartContainer = container; }}>
        <div id="d3-chart" />
      </div>
    );
  }
}
