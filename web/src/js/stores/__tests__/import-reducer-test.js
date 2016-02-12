import { List, Map, toJS } from 'immutable';
import importReducer from '../import-reducer';

describe('ImportReducer', () => {
  let transactions;
  beforeEach(() => {
    transactions = [
      { id: 11, name: 'Name1', default: false, custom: true, fromDate: '2015-07-01', toDate: '2015-08-03' },
      { id: 22, name: 'Name2', default: true, custom: false, fromDate: '2014-06-23', toDate: '2014-09-03' }
    ];
  });

  it('has a default state', () => {
    const state = importReducer();

    expect(state.get('transactions').toJS()).toEqual([]);
  });

  describe('SET_OFX_TRANSACTIONS', () => {
    it('sets transactions array with transactions', () => {
      let action = {type: 'SET_OFX_TRANSACTIONS', transactions: transactions};
      let state = importReducer(undefined, action);

      expect(state.get('transactions').get(0).toJS()).toEqual(transactions[0]);
      expect(state.get('transactions').get(1).toJS()).toEqual(transactions[1]);
    });
  });
});
