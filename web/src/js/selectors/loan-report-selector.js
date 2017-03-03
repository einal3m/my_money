import { createSelector } from 'reselect';
import { List, Map } from 'immutable';
import moneyUtil from '../util/money-util';

const minimumRepaymentBalancesSelector = state => state.loanStore.get('minimumRepaymentBalances');
const budgetRepaymentBalancesSelector = state => state.loanStore.get('budgetRepaymentBalances');

function convertLoanData(minimumRepaymentBalances, budgetRepaymentBalances) {
  if (!minimumRepaymentBalances) return List();

  return List.of(
    convertAmortization(minimumRepaymentBalances, 'Minimum Repayments', '#9467bd'),
    convertAmortization(budgetRepaymentBalances, 'Budget Repayments', '#17becf')
  );
}

function convertAmortization(balances, name, backgroundColour) {
  const data = balances.map(balance =>
    List.of(new Date(balance.get(0)), moneyUtil.centsToDollars(balance.get(1)))
  );

  return Map({
    name,
    data,
    backgroundColour,
  });
}

export default createSelector(
  minimumRepaymentBalancesSelector,
  budgetRepaymentBalancesSelector,
  (minimumRepaymentBalances, budgetRepaymentBalances) =>
    convertLoanData(minimumRepaymentBalances, budgetRepaymentBalances)
);
