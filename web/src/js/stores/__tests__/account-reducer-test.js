import { List, Map, fromJS } from 'immutable';
import reducer from '../account-reducer';
import { toEqualImmutable } from 'jasmine-immutablejs-matchers';

describe('reducer', () => {
  let account1, account2;
  beforeEach(() => {    
    account1 = {id: 11, name: 'account1', accountType: 'share'};
    account2 = {id: 12, name: 'account2', accountType: 'savings'};
  });

  it('has a default state', () => {
    const state = reducer();
    expect(state.get('loaded')).toEqual(false);
    expect(state.get('accounts')).toEqualImmutable(List());
    expect(state.get('accountTypes').toJS()).toEqual([
      { id: 1, code: 'savings', name: 'Savings' },
      { id: 2, code: 'share', name: 'Share' }
    ]);
    expect(state.get('currentAccount').toJS()).toEqual({});
    expect(state.get('selectedAccounts').toJS()).toEqual([]);
  });

  describe('SET_ACCOUNTS', () => {
    let nextState;
    beforeEach(() => {
      const initialState = reducer();
      const action = {type: 'SET_ACCOUNTS', accounts: [account1, account2]};
      nextState = reducer(initialState, action);
    });

    it('sets loaded to true', () => {
      expect(nextState.get('loaded')).toEqual(true);
    });

    it('sets accounts state', () => {
      expect(nextState.get('accounts').toJS()).toEqual([account1, account2]);
    });

    it('sets currentAccount to first account', () => {
      expect(nextState.get('currentAccount').toJS()).toEqual(account1);
    });
  });

  describe('ADD_ACCOUNT', () => {
    describe('with empty initialState', () =>{
      let nextState;
      beforeEach(() => {
        const initialState = reducer();
        const action = {type: 'ADD_ACCOUNT', account: account2};
        nextState = reducer(initialState, action);
      });

      it('sets accounts state', () => {
        expect(nextState.get('accounts').toJS()).toEqual([account2]);
      });

      it('sets currentAccount to this account', () => {
        expect(nextState.get('currentAccount').toJS()).toEqual(account2);
      });
    });

    describe('with initialState', () =>{
      let nextState, account3;
      beforeEach(() => {
        account3 = {id: 13, name: 'account3', accountType: 'savings'};

        const initialState = reducer();
        const action1 = {type: 'SET_ACCOUNTS', accounts: [account1, account2]};
        const action2 = {type: 'ADD_ACCOUNT', account: account3};
        let midState = reducer(initialState, action1);
        nextState = reducer(midState, action2);
      });

      it('sets accounts state', () => {
        expect(nextState.get('accounts').toJS()).toEqual([account1, account2, account3]);
      });

      it('sets currentAccount to this account', () => {
        expect(nextState.get('currentAccount').toJS()).toEqual(account3);
      });
    });
  });

  describe('REMOVE_ACCOUNT', () => {
    let nextState;
    describe('with two accounts', () =>{
      beforeEach(() => {
        const initialState = reducer();
        const action1 = {type: 'SET_ACCOUNTS', accounts: [account1, account2]};
        const action2 = {type: 'REMOVE_ACCOUNT', id: account1.id};
        let midState = reducer(initialState, action1);
        nextState = reducer(midState, action2);
      });

      it('sets accounts state', () => {
        expect(nextState.get('accounts').toJS()).toEqual([account2]);
      });

      it('resets currentAccount', () => {
        expect(nextState.get('currentAccount').toJS()).toEqual(account2);
      });
    });

    describe('with last account', () =>{
      beforeEach(() => {
        const initialState = reducer();
        const action1 = {type: 'SET_ACCOUNTS', accounts: [account1]};
        const action2 = {type: 'REMOVE_ACCOUNT', id: account1.id};
        let midState = reducer(initialState, action1);
        nextState = reducer(midState, action2);
      });

      it('sets accounts state', () => {
        expect(nextState.get('accounts').toJS()).toEqual([]);
      });

      it('sets currentAccount null', () => {
        expect(nextState.get('currentAccount')).toEqual(null);
      });
    });
  });

  describe('SET_CURRENT_ACCOUNT', () => {
    let nextState;
    beforeEach(() => {
      const initialState = reducer();
      const action1 = {type: 'SET_ACCOUNTS', accounts: [account1, account2]};
      const action2 = {type: 'SET_CURRENT_ACCOUNT', id: account2.id};
      let midState = reducer(initialState, action1);
      nextState = reducer(midState, action2);
    });

    it('sets currentAccount based on account id', () => {
      expect(nextState.get('currentAccount').toJS()).toEqual(account2);
    });
  });

  describe('account filter selected accounts', () => {
    describe('ADD_SELECTED_ACCOUNT', () => {
      it('adds the next default account to the list', () => {
        let action = { type: 'ADD_SELECTED_ACCOUNT', accountId: 4 };
        let state = reducer(undefined, action);

        expect(state.get('selectedAccounts').toJS()).toEqual([4]);

        action = { type: 'ADD_SELECTED_ACCOUNT', accountId: 1 };
        let nextState = reducer(state, action);

        expect(nextState.get('selectedAccounts').toJS()).toEqual([4, 1]);
      });
    });

    describe('REMOVE_SELECTED_ACCOUNT', () => {
      it('removes the account from the list', () => {
        let initialState = fromJS({selectedAccounts: [4, 5, 6]});
        let action = { type: 'REMOVE_SELECTED_ACCOUNT', index: 1 };
        let state = reducer(initialState, action);

        expect(state.get('selectedAccounts').toJS()).toEqual([4, 6]);
      });
    });

    describe('SET_SELECTED_ACCOUNT', () => {
      it('sets the account in the list', () => {
        let initialState = fromJS({selectedAccounts: [4, 5, 6]});
        let action = { type: 'SET_SELECTED_ACCOUNT', index: 1, accountId: 7 };
        let state = reducer(initialState, action);

        expect(state.get('selectedAccounts').toJS()).toEqual([4, 7, 6]);
      });
    });
  });
});
