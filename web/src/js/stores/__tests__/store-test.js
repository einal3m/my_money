import { Map, List, toJS } from 'immutable';
import store from '../store.js';

describe('store', () => {
  it('is a Redux store configured with the correct reducer', () => {
    expect(store.getState().get('accounts')).toEqual(List());

    let account1 = {id: 11, name: 'account1', accountType: 'share'};
    let account2 = {id: 12, name: 'account2', accountType: 'savings'};

    store.dispatch({
      type: 'SET_ACCOUNTS',
      accounts: [account1, account2]
    });

    expect(store.getState().get('accounts').toJS()).toEqual([account1, account2]);
  });
});
