import React from 'react';
import { shallow } from 'enzyme';
import { LoanReportComponent as LoanReport } from '../loan-report';
import PageHeader from '../../common/page-header';
import LoanViewButtons from '../loan-view-buttons';
import D3LineChart from '../../reports/d3-line-chart';
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

    it('has a chart if seriesData is set', () => {
      const chart = report.find(D3LineChart);
      expect(chart.prop('chartData')).toEqual({ seriesData: [{ name: 'Series1' }] });
    });

    it('has no chart if seriesData is null', () => {
      report = shallow(
        <LoanReport
          apiStatus={{ status: 'DONE' }}
          seriesData={[]}
          view="chart"
        />
      );
      expect(report.find(D3LineChart).length).toEqual(0);
    });
  });
});
