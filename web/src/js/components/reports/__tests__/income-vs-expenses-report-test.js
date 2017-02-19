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

    beforeEach(() => {
      spyOn(reportActions, 'getIncomeVsExpensesReport');
      report = shallow(<IncomeVsExpensesReport loaded apiStatus={{ status: 'DONE' }} />);
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

      expect(expense.props.children.type).toEqual(PieAndTable);
      expect(expense.props.children.props.loaded).toEqual(true);
      expect(expense.props.children.props.title).toEqual('expenses');
    });
  });
});
