import React from 'react';
import PropTypes from 'prop-types';
import D3LineChart from '../reports/D3LineChart';
import { getLoanReport } from '../../actions/loan-actions';

export default class LoanChartView extends React.Component {
  constructor() {
    super();
    getLoanReport();
  }

  render() {
    if (this.props.seriesData.length === 0) {
      return <div />;
    }

    return (
      <div>
        <D3LineChart chartData={{ seriesData: this.props.seriesData }} />
      </div>
    );
  }
}

LoanChartView.propTypes = {
  seriesData: PropTypes.arrayOf(PropTypes.shape({})),
};
