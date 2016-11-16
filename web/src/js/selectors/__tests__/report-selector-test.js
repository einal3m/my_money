import { fromJS } from 'immutable';
import chartDataForMonthTotals from '../report-selector';

describe('ReportSelector', () => {
  describe('chartDataForMonthTotals', () => {
    const totals = [['Aug-16', 4560], ['Sep-16', 1234]];
    const store = {
      reportStore: fromJS({ totals }),
    };

    const seriesData = [
      { name: 'Total', data: [4560, 1234], backgroundColour: '#61ABDB', borderColor: 'maroon' },
    ];
    const xAxisLabels = ['Aug-16', 'Sep-16'];
    const chartData = { seriesData, xAxisLabels };

    it('converts month totals into chartData', () => {
      expect(chartDataForMonthTotals(store)).toEqual(chartData);
    });
    it('converts month totals into chartData', () => {
      expect(chartDataForMonthTotals(store)).toEqual(chartData);
    });
  });
});
