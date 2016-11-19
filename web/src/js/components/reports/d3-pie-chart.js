import React from 'react';
import pieChart from './pie-chart';

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
      <div ref="chartContainer" className="chart-container">
        <div id="d3-chart" />
      </div>
    );
  }
}
