import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageHeader from '../common/PageHeader';
import SearchCriteria, { DATE_RANGE_FILTER } from '../common/criteria/SearchCriteria';
import PieAndTable from './PieAndTable';
import { getIncomeVsExpensesReport } from '../../actions/report-actions';
import { tableData, pieChartData } from '../../selectors/income-expense-selector';

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
        <PageHeader title="income vs expenses" apiStatus={this.props.apiStatus} />
        <SearchCriteria filters={[{ name: DATE_RANGE_FILTER }]} fetch={this.fetchReport} />
        <div id="report" className="container">
          <div className="row">
            <div className="col-xs-6">
              <PieAndTable
                loaded={this.props.loaded}
                title="income"
                tableData={this.props.tableData.income}
                pieChartData={this.props.pieChartData.income}
              />
            </div>
            <div className="col-xs-6">
              <PieAndTable
                loaded={this.props.loaded}
                title="expenses"
                tableData={this.props.tableData.expense}
                pieChartData={this.props.pieChartData.expense}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

IncomeVsExpensesReportComponent.propTypes = {
  loaded: PropTypes.bool.isRequired,
  tableData: PropTypes.shape({
    income: PropTypes.shape({}),
    expense: PropTypes.shape({}),
  }),
  pieChartData: PropTypes.shape({
    income: PropTypes.shape({}),
    expense: PropTypes.shape({}),
  }),
  apiStatus: PropTypes.shape({}).isRequired,
};

function mapStateToProps(state) {
  return {
    loaded: tableData(state).size > 0,
    tableData: tableData(state).toJS(),
    pieChartData: pieChartData(state).toJS(),
    apiStatus: state.apiStatusStore.toJS(),
  };
}

export default connect(mapStateToProps)(IncomeVsExpensesReportComponent);
