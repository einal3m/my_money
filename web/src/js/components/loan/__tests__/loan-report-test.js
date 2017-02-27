import React from 'react';
import { shallow } from 'enzyme';
import { LoanReportComponent as LoanReport } from '../loan-report';
import PageHeader from '../../common/page-header';
import LoanViewButtons from '../loan-view-buttons';
import LoanChartView from '../loan-chart-view';
import * as loanActions from '../../../actions/loan-actions';

describe('LoanReport', () => {
  describe('render', () => {
    let report;

    beforeEach(() => {
      spyOn(loanActions, 'getLoanReport');
      report = shallow(
        <LoanReport
          apiStatus={{ status: 'DONE' }}
          seriesData={[{ name: 'Series1' }]}
          view="chart"
        />
      );
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

    describe('chart view', () => {
      it('renders the chart view', () => {
        const chart = report.find(LoanChartView);
        expect(chart.prop('chartData')).toEqual({ seriesData: [{ name: 'Series1' }] });
      });
    });

    describe('budget table view', () => {
      it('renders the budget table', () => {
        report = shallow(
          <LoanReport
            apiStatus={{ status: 'DONE' }}
            seriesData={[{ name: 'Series1' }]}
            view="budget"
          />
        );

        expect(report.find(LoanChartView).length).toEqual(0);

        // expect budget table to exist
      });
    });

    describe('summary view', () => {
      it('renders the summary', () => {
        report = shallow(
          <LoanReport
            apiStatus={{ status: 'DONE' }}
            seriesData={[{ name: 'Series1' }]}
            view="summary"
          />
        );

        expect(report.find(LoanChartView).length).toEqual(0);

        // expect summary table to exist
      });
    });
  });
});
