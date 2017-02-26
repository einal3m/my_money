import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../common/page-header';
import D3LineChart from '../reports/d3-line-chart';
import { getLoanReport } from '../../actions/loan-actions';
import seriesData from '../../selectors/loan-report-selector';

export class LoanReportComponent extends React.Component {
  constructor() {
    super();
    getLoanReport();
  }

  renderChart() {
    if (this.props.seriesData.length === 0) {
      return <div />;
    }

    return <D3LineChart chartData={{ seriesData: this.props.seriesData }} />;
  }

  render() {
    return (
      <div>
        <PageHeader title="loan report" apiStatus={this.props.apiStatus} />
        <div id="report" className="container">
          {this.renderChart()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    apiStatus: state.apiStatusStore.toJS(),
    seriesData: seriesData(state).toJS(),
  };
}

LoanReportComponent.propTypes = {
  apiStatus: PropTypes.shape({}),
  seriesData: PropTypes.arrayOf(PropTypes.shape({})),
};

export default connect(mapStateToProps)(LoanReportComponent);
