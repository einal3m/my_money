import { createSelector } from 'reselect';
import { Map, List } from 'immutable';

const accountSelector = state => state.accountStore.get('accounts');
const accountBalancesSelector = state => state.reportStore.get('accountBalances');
const selectedAccountsSelector = state => state.accountStore.get('selectedAccounts');

let chartColours = ['#61ABDB', '#FDCA3A', '#80D8C4'];

function lineSeriesData(accounts, accountBalances, selectedAccounts) {
  return selectedAccounts.map((accountId, index) => {
    return Map({
      name: accounts.find(account => account.get('id') == accountId).get('name'),
      data: accountBalances.get(accountId).map(point => List([new Date(point.get(0)), point.get(1)/100.0])),
      backgroundColour: chartColours[index]
    });
  });
}

export default createSelector(
  accountSelector,
  accountBalancesSelector,
  selectedAccountsSelector,
  (accounts, accountBalances, selectedAccounts) => lineSeriesData(accounts, accountBalances, selectedAccounts)
);
