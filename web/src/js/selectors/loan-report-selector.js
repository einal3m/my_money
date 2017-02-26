import { createSelector } from 'reselect';
import { List, Map } from 'immutable';
import moneyUtil from '../util/money-util';

const minimumRepaymentBalancesSelector = state => state.loanStore.get('minimumRepaymentBalances');

function convertLoanData(minimumRepaymentBalances) {
  if (!minimumRepaymentBalances) return List();

  const data = minimumRepaymentBalances.map(balance =>
    List.of(new Date(balance.get(0)), moneyUtil.centsToDollars(balance.get(1)))
  );
  const name = 'Minimum Repayments';
  const backgroundColour = '#9467bd';

  return List.of(Map({
    name,
    data,
    backgroundColour,
  }));
}

export default createSelector(
  minimumRepaymentBalancesSelector,
  minimumRepaymentBalances => convertLoanData(minimumRepaymentBalances)
);
