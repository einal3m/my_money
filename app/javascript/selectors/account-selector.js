import { createSelector } from 'reselect';

const accountSelector = state => state.accountStore.get('accounts');
const accountTypeSelector = state => state.accountStore.get('accountTypes');

function groupedAccounts(accountTypes, accounts) {
  return accounts.groupBy(account => account.get('accountType'));
}

function groupedActiveAccounts(accounts) {
  console.log(accounts.filter(a => a.deletedAt != null).toJS())
  return accounts
    .filter(a => a.get('deletedAt') == null)
    .groupBy(account => account.get('accountType'));
}

export default createSelector(
  accountTypeSelector,
  accountSelector,
  (accountTypes, accounts) => groupedAccounts(accountTypes, accounts)
);

export const activeAccountSelector = createSelector(
  accountSelector,
  accounts => groupedActiveAccounts(accounts)
);
