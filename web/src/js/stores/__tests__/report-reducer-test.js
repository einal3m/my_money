import { List, Map, fromJS } from 'immutable';
import reportReducer from '../report-reducer';

describe('ReportReducer', () => {

  it('has a default state', () => {
    const state = reportReducer();
    expect(state.get('accountBalances').toJS()).toEqual({});
  });

  describe('SET_ACCOUNT_BALANCE_REPORT', () => {
    it('sets the balances for the account', () => {
      let action = { type: 'SET_ACCOUNT_BALANCE_REPORT', accountId: 3, report: ['report3'] };
      let state = reportReducer(undefined, action);
      expect(state.get('accountBalances').get(3).toJS()).toEqual(['report3']);

      action = { type: 'SET_ACCOUNT_BALANCE_REPORT', accountId: 4, report: ['report4'] };
      let nextState = reportReducer(state, action);
      expect(nextState.get('accountBalances').get(3).toJS()).toEqual(['report3']);
      expect(nextState.get('accountBalances').get(4).toJS()).toEqual(['report4']);
    });
  });
});
