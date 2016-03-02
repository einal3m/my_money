import { Map, List, fromJS } from 'immutable';

const INITIAL_STATE = Map({
  accountBalances: Map({}),
  accountBalanceAccounts: List([])
});

export default function reducer(state = INITIAL_STATE, action = { type: 'NO_ACTION' }) {
  switch (action.type) {
    case 'SET_ACCOUNT_BALANCE_REPORT':
      return setAccountBalances(state, action.accountId, action.report);
  }
  return state;
}

function setAccountBalances(state, accountId, report) {
  return state.set('accountBalances', state.get('accountBalances').set(accountId, fromJS(report)))
              .set('accountBalanceAccounts', fromJS([accountId]));
}
