import React, { PropTypes } from 'react';
import D3LineChart from '../reports/d3-line-chart';

const LoanChartView = (props) => {
  if (props.seriesData.length === 0) {
    return <div />;
  }

  return (
    <div>
      <h3>Heading</h3>
      <D3LineChart chartData={{ seriesData: props.seriesData }} />;
    </div>
  );
};

LoanChartView.propTypes = {
  seriesData: PropTypes.arrayOf(PropTypes.shape({})),
};

export default LoanChartView;
