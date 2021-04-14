import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import pieChart from './d3/PieChart';

const D3PieChart = (props) => {
    const d3Container = useRef(null);
    const options = {
      height: 450,
      width: 450,
    };

    useEffect(
      () => {
          if (props.data && d3Container.current) {
            pieChart(props.data, props.labels, d3Container, options);
          }
      },
      [props.data, d3Container.current]
    )

    return (
      <div className="chart-container">
        <div ref={d3Container}/>
      </div>
    );
}

D3PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number),
  labels: PropTypes.arrayOf(PropTypes.string),
};

export default D3PieChart;
