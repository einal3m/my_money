import React from 'react';
import { shallow } from 'enzyme';
import { IncomeVsExpensesReportComponent as IncomeVsExpensesReport } from '../income-vs-expenses-report';
import PageHeader from '../../common/page-header';
import SearchCriteria, { DATE_RANGE_FILTER } from '../../common/criteria/search-criteria';
import PieAndTable from '../pie-and-table';
import * as reportActions from '../../../actions/report-actions';

describe('IncomeVsExpensesReport', () => {
  describe('render', () => {
    let report;
    const tableData = {
      income: { total: 500, rows: [] },
      expense: { total: 1000, rows: [] },
    };

    const pieChartData = {
      income: { total: 500, data: [500], labels: ['One'] },
      expense: { total: 1000, data: [400], labels: ['Two'] },
    };

    beforeEach(() => {
      spyOn(reportActions, 'getIncomeVsExpensesReport');
      report = shallow(
        <IncomeVsExpensesReport
          loaded
          apiStatus={{ status: 'DONE' }}
          tableData={tableData}
          pieChartData={pieChartData}
        />
      );
    });

    it('calls the report action', () => {
      expect(reportActions.getIncomeVsExpensesReport).toHaveBeenCalled();
    });

    it('has a page header', () => {
      const header = report.childAt(0);

      expect(header.type()).toEqual(PageHeader);
      expect(header.prop('title')).toEqual('income vs expenses');
      expect(header.prop('apiStatus')).toEqual({ status: 'DONE' });
    });

    it('has a date range filter', () => {
      const criteria = report.childAt(1);

      expect(criteria.type()).toEqual(SearchCriteria);
      const filters = criteria.prop('filters');
      expect(filters[0].name).toEqual(DATE_RANGE_FILTER);
    });

    it('has an income and expense pie chart and table', () => {
      const content = report.childAt(2);
      const [income, expense] = content.childAt(0).children();

      expect(income.props.children.type).toEqual(PieAndTable);
      expect(income.props.children.props.loaded).toEqual(true);
      expect(income.props.children.props.title).toEqual('income');
      expect(income.props.children.props.tableData).toEqual(tableData.income);
      expect(income.props.children.props.pieChartData).toEqual(pieChartData.income);

      expect(expense.props.children.type).toEqual(PieAndTable);
      expect(expense.props.children.props.loaded).toEqual(true);
      expect(expense.props.children.props.title).toEqual('expenses');
      expect(expense.props.children.props.tableData).toEqual(tableData.expense);
      expect(expense.props.children.props.pieChartData).toEqual(pieChartData.expense);
    });
  });
});
