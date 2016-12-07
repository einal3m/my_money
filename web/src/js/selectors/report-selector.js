import { createSelector } from 'reselect';

const monthTotalSelector = state => state.reportStore.get('totals');

function convertMonthTotals(monthTotals) {
  const xAxisLabels = monthTotals.toJS().map(month => month[0]);
  const data = monthTotals.toJS().map(month => month[1]);

  return {
    seriesData: [{ name: 'Total', data, backgroundColour: '#61ABDB', borderColor: 'maroon' }],
    xAxisLabels,
  };
}

export const chartDataForMonthTotals = createSelector(
  monthTotalSelector,
  monthTotals => convertMonthTotals(monthTotals)
);

function convertMonthTotalsForCombo(monthTotals) {
  if (monthTotals.size === 0) return null;
  if (monthTotals.get(0).size !== 3) return null;

  const xAxisLabels = monthTotals.toJS().map(month => month[0]);
  const incomeData = monthTotals.toJS().map(month => month[1]);
  const expenseData = monthTotals.toJS().map(month => month[2]);

  return {
    xAxisLabels,
    seriesData: [
      { name: 'Income', data: incomeData, backgroundColour: '#66CC66' },
      { name: 'Expense', data: expenseData, backgroundColour: '#FF6666' },
    ],
  };
}

export const chartDataForCombo = createSelector(
  monthTotalSelector,
  monthTotals => convertMonthTotalsForCombo(monthTotals)
);
