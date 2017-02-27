import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../common/page-header';
import LoanViewButtons from './loan-view-buttons';
import LoanChartView from './loan-chart-view';
import { getLoanReport } from '../../actions/loan-actions';
import seriesData from '../../selectors/loan-report-selector';
import { accountNameAndBank } from '../../util/text-util';

export class LoanReportComponent extends React.Component {
  constructor() {
    super();
    getLoanReport();
  }

  renderContent() {
    switch (this.props.view) {
      case 'chart':
        return <LoanChartView seriesData={this.props.seriesData} />;
      case 'budget':
        return <div />;
      case 'summary':
        return <div />;
      default:
        return <div />;
    }
  }

  render() {
    return (
      <div>
        <PageHeader title="loan report" apiStatus={this.props.apiStatus}>
          <LoanViewButtons view={this.props.view} />
        </PageHeader>
        <div id="report" className="container">
          <h3>{accountNameAndBank(this.props.account)}</h3>
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    apiStatus: state.apiStatusStore.toJS(),
    seriesData: seriesData(state).toJS(),
    view: state.loanStore.get('view'),
    account: state.accountStore.get('currentAccount').toJS(),
  };
}

LoanReportComponent.propTypes = {
  apiStatus: PropTypes.shape({}),
  seriesData: PropTypes.arrayOf(PropTypes.shape({})),
  view: PropTypes.string.isRequired,
  account: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps)(LoanReportComponent);
