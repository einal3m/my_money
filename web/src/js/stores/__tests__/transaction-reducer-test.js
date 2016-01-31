import { List, Map, toJS } from 'immutable';
import transactionReducer from '../transaction-reducer';

describe('TransactionReducer', () => {
  let transactions;
  beforeEach(() => {
    transactions = [
      { id: 11, name: 'Name1', default: false, custom: true, fromDate: '2015-07-01', toDate: '2015-08-03' },
      { id: 22, name: 'Name2', default: true, custom: false, fromDate: '2014-06-23', toDate: '2014-09-03' }
    ];
  });

  it('has a default state', () => {
    const state = transactionReducer();

    expect(state.get('loading')).toEqual(false);
    expect(state.get('transactions').toJS()).toEqual([]);
    expect(state.get('moreOptions')).toEqual(false);
  });

  describe('FETCHING_TRANSACTIONS', () => {
    it('sets loading to true and resets transactions array', () => {
      const initialState = transactionReducer();
      let action1 = {type: 'SET_TRANSACTIONS', transactions: transactions};
      let action2 = {type: 'FETCHING_TRANSACTIONS'};
      let midState = transactionReducer(initialState, action1);
      let nextState = transactionReducer(midState, action2);

      expect(nextState.get('loading')).toEqual(true);
      expect(nextState.get('transactions').toJS()).toEqual([]);
    });
  });

  describe('SET_TRANSACTIONS', () => {
    it('sets loading to false and fills transactions array with transactions', () => {
      const initialState = transactionReducer();
      let action = {type: 'SET_TRANSACTIONS', transactions: transactions};
      let nextState = transactionReducer(initialState, action);

      expect(nextState.get('transactions').get(0).toJS()).toEqual(transactions[0]);
      expect(nextState.get('transactions').get(1).toJS()).toEqual(transactions[1]);
      expect(nextState.get('loading')).toEqual(false);    
    });
  });

  describe('SET_SEARCH_DESCRIPTION', () => {
    it('sets the search descriptin string', () => {
      let action = {type: 'SET_SEARCH_DESCRIPTION', description: 'my String'};
      let state = transactionReducer(undefined, action);

      expect(state.get('searchDescription')).toEqual('my String');
    });
  });

  describe('TOGGLE_MORE_OR_LESS', () => {
    it('sets the search descriptin string', () => {
      let action = {type: 'TOGGLE_MORE_OR_LESS'};
      let state = transactionReducer(undefined, action);

      expect(state.get('moreOptions')).toEqual(true);
    });
  });
});
