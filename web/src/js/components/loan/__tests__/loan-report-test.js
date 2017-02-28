import React from 'react';
import { shallow } from 'enzyme';
import { LoanReportComponent as LoanReport } from '../loan-report';
import PageHeader from '../../common/page-header';
import LoanViewButtons from '../loan-view-buttons';
import LoanChartView from '../loan-chart-view';
import BudgetTable from '../budget-table';
import * as loanActions from '../../../actions/loan-actions';

describe('LoanReport', () => {
  describe('render', () => {
    let report;
    let props;

    beforeEach(() => {
      spyOn(loanActions, 'getLoanReport');
      props = {
        apiStatus: { status: 'DONE' },
        seriesData: [{ name: 'Series1' }],
        view: 'chart',
        account: { name: 'My Account', bank: 'My Bank' },
      };

      report = shallow(<LoanReport {...props} />);
    });

    it('calls the report action', () => {
      expect(loanActions.getLoanReport).toHaveBeenCalled();
    });

    it('has a page header with buttons', () => {
      const header = report.childAt(0);

      expect(header.type()).toEqual(PageHeader);
      expect(header.prop('title')).toEqual('loan report');
      expect(header.prop('apiStatus')).toEqual({ status: 'DONE' });

      const buttons = header.childAt(0);
      expect(buttons.type()).toEqual(LoanViewButtons);
      expect(buttons.prop('view')).toEqual('chart');
    });

    it('has a title', () => {
      const title = report.find('h3');

      expect(title.text()).toEqual('My Account (My Bank)');
    });

    describe('chart view', () => {
      it('renders the chart view', () => {
        const chart = report.find(LoanChartView);
        expect(chart.prop('seriesData')).toEqual([{ name: 'Series1' }]);
        expect(report.find(BudgetTable).length).toEqual(0);
      });
    });

    describe('budget table view', () => {
      it('renders the budget table', () => {
        report = shallow(<LoanReport {...props} view="budget" />);

        expect(report.find(LoanChartView).length).toEqual(0);
        expect(report.find(BudgetTable).length).toEqual(1);
      });
    });

    describe('summary view', () => {
      it('renders the summary', () => {
        report = shallow(<LoanReport {...props} view="summary" />);

        expect(report.find(LoanChartView).length).toEqual(0);
        expect(report.find(BudgetTable).length).toEqual(0);

        // expect summary table to exist
      });
    });
  });
});
