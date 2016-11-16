import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import D3BarChart from '../d3-bar-chart';
import ReportTransactionTable from '../report-transaction-table';
import { ReportContentComponent as ReportContent } from '../report-content';

describe('ReportContent', () => {
  const transactions = [{ id: 1 }];
  const chartData = { xAxisLabels: [], seriesData: [] };
  describe('render', () => {
    it('displays a chart if viewType is chart', () => {
      const content = shallowRenderer(
        <ReportContent viewType="chart" chartData={chartData} transactions={transactions} />
      );

      expect(content.type).toEqual(D3BarChart);
      expect(content.props.chartData).toEqual(chartData);
    });

    it('displays a table if viewType is table', () => {
      const content = shallowRenderer(
        <ReportContent viewType="table" chartData={chartData} transactions={transactions} />
      );

      expect(content.type).toEqual(ReportTransactionTable);
    });
  });
});
