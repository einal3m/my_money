import { createSelector } from 'reselect';
import { Map, List } from 'immutable';

const accountSelector = state => state.accountStore.get('accounts');
const accountBalancesSelector = state => state.reportStore.get('accountBalances');
const selectedAccountsSelector = state => state.accountStore.get('selectedAccounts');

let chartColours = ['#9467bd', '#bcbd22', '#17becf', '#e377c2', '#ffbb78'];

function lineSeriesData(accounts, accountBalances, selectedAccounts) {
  let seriesData = List([]);
  selectedAccounts.forEach((accountId, index) => {
    if (accountBalances.get(accountId)) {
      seriesData = seriesData.push(Map({
        name: accounts.find(account => account.get('id') == accountId).get('name'),
        data: accountBalances.get(accountId).map(point => List([new Date(point.get(0)), point.get(1)/100.0])),
        backgroundColour: chartColours[index % 5]
      }));
    }
  });
  return seriesData;
}

export default createSelector(
  accountSelector,
  accountBalancesSelector,
  selectedAccountsSelector,
  (accounts, accountBalances, selectedAccounts) => lineSeriesData(accounts, accountBalances, selectedAccounts)
);
