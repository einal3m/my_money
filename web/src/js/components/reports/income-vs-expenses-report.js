import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../common/page-header';
import SearchCriteria, { DATE_RANGE_FILTER } from '../common/criteria/search-criteria';
import PieAndTable from './pie-and-table';
import { getIncomeVsExpensesReport } from '../../actions/report-actions';

export class IncomeVsExpensesReportComponent extends React.Component {

  constructor() {
    super();
    this.fetchReport();
  }

  fetchReport = () => {
    getIncomeVsExpensesReport();
  };

  render() {
    return (
      <div>
        <PageHeader title="income vs expenses" apiStatus={this.props.apiStatus}/>
        <SearchCriteria filters={[{ name: DATE_RANGE_FILTER }]} fetch={this.fetchReport} />
        <div id="report" className="container">
          <div className="row">
            <div className="col-xs-6">
              <PieAndTable loaded={this.props.loaded} title="income" />
            </div>
            <div className="col-xs-6">
              <PieAndTable loaded={this.props.loaded} title="expenses" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

IncomeVsExpensesReportComponent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  reportData: PropTypes.shape({}),
  apiStatus: PropTypes.shape({}).isRequired,
};

function mapStateToProps(state) {
  return {
    loaded: state.reportStore.get('loaded'),
    reportData: state.reportStore.get('reportData'),
    apiStatus: state.apiStatusStore.toJS(),
  };
}

export default connect(mapStateToProps)(IncomeVsExpensesReportComponent);
