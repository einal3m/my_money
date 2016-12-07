import { fromJS } from 'immutable';
import { chartDataForMonthTotals, chartDataForCombo } from '../report-selector';

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

  describe('chartDataForCombo', () => {
    it('converts month totals into a combo chart format', () => {
      const store = {
        reportStore: fromJS({ totals: [['Aug-16', 1000, 2000], ['Sep-16', 3000, 4000], ['Oct-16', 5000, 6000]] }),
      };

      const chartData = chartDataForCombo(store);

      expect(chartData.xAxisLabels).toEqual(['Aug-16', 'Sep-16', 'Oct-16']);
      expect(chartData.seriesData).toEqual([
        { name: 'Income', data: [1000, 3000, 5000], backgroundColour: '#66CC66' },
        { name: 'Expense', data: [2000, 4000, 6000], backgroundColour: '#FF6666' },
      ]);
    });

    it('doesnt convert if there is no data', () => {
      const store = {
        reportStore: fromJS({ totals: [] }),
      };

      expect(chartDataForCombo(store)).toEqual(null);
    });

    it('doesnt convert if there are not 3 entries per month', () => {
      const store = {
        reportStore: fromJS({ totals: [['Aug-16', 1000], ['Sep-16', 3000]] }),
      };

      expect(chartDataForCombo(store)).toEqual(null);
    });
  });
});
