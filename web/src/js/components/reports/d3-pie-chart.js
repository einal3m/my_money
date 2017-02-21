import React, { PropTypes } from 'react';
import pieChart from './d3/pie-chart';

export default class D3PieChart extends React.Component {

  componentDidMount() {
    const options = {
      height: 450,
      width: 450,
    };

    pieChart(this.props.data, this.props.labels, `#d3-chart-${this.props.id}`, options);
  }

  render() {
    return (
      <div className="chart-container">
        <div id={`d3-chart-${this.props.id}`} />
      </div>
    );
  }
}

D3PieChart.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.number),
  labels: PropTypes.arrayOf(PropTypes.string),
};
