import reducer from 'stores/matching-transactions-reducer';
import {
  GET_MATCHING_TRANSACTIONS,
  SET_MATCHING_TRANSACTIONS,
} from 'actions/action-types';

describe('reducer', () => {
  it('has a default state', () => {
    const state = reducer();
    expect(state.get('loading')).toEqual(false);
    expect(state.get('matchingTransactions').toJS()).toEqual([]);
  });

  describe('GET_MATCHING_TRANSACTIONS', () => {
    it('sets loading to true and list to empty', () => {
      const state = reducer(undefined, { type: GET_MATCHING_TRANSACTIONS });
      expect(state.get('loading')).toEqual(true);
      expect(state.get('matchingTransactions').toJS()).toEqual([]);
    });
  });

  describe('SET_MATCHING_TRANSACTIONS', () => {
    it('sets loading to false and sets list', () => {
      const transactions = ['transactions'];
      const state = reducer(undefined, { type: SET_MATCHING_TRANSACTIONS, transactions });

      expect(state.get('loading')).toEqual(false);
      expect(state.get('matchingTransactions').toJS()).toEqual(['transactions']);
    });
  });
});
