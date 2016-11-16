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

const chartDataForMonthTotals = createSelector(
  monthTotalSelector,
  monthTotals => convertMonthTotals(monthTotals)
);

export default chartDataForMonthTotals;
