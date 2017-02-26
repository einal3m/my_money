import React from 'react';
import { shallow } from 'enzyme';
import { LoanReportComponent as LoanReport } from '../loan-report';
import PageHeader from '../../common/page-header';
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
        />
      );
    });

    it('calls the report action', () => {
      expect(loanActions.getLoanReport).toHaveBeenCalled();
    });

    it('has a page header', () => {
      const header = report.childAt(0);

      expect(header.type()).toEqual(PageHeader);
      expect(header.prop('title')).toEqual('loan report');
      expect(header.prop('apiStatus')).toEqual({ status: 'DONE' });
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
        />
      );
      expect(report.find(D3LineChart).length).toEqual(0);
    });
  });
});
