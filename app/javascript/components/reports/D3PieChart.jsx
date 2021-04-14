import React from 'react';
import PropTypes from 'prop-types';
import pieChart from './d3/PieChart';
import { useD3 } from '../../hooks/useD3';

const D3PieChart = (props) => {
    const options = {
      height: 450,
      width: 450,
    };

    const ref = useD3(
      (d3Container) => {
          if (props.data && d3Container) {
            pieChart(props.data, props.labels, d3Container, options);
          }
      },
      [props.data]
    )

    return (
      <div className="chart-container">
        <svg width={`${options.width}px`} height={`${options.height}px`} ref={ref} />
      </div>
    );
}

D3PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
  labels: PropTypes.arrayOf(PropTypes.string),
};

export default D3PieChart;
