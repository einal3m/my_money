import accountReducer from 'stores/account-reducer';
import {
  SET_ACCOUNTS,
  SET_CURRENT_ACCOUNT,
  SET_SELECTED_ACCOUNTS,
  SET_ACCOUNT_TYPES,
} from 'actions/action-types';

describe('reducer', () => {
  const account1 = { id: 11, name: 'account1', accountType: 'share' };
  const account2 = { id: 12, name: 'account2', accountType: 'savings' };
  const accountTypes = [
    { id: 1, code: 'savings', name: 'Savings' },
    { id: 2, code: 'share', name: 'Share' },
  ];

  it('has a default state', () => {
    expect(1).toEqual(1);
    const state = accountReducer();
    expect(state.get('loaded')).toEqual(false);
    expect(state.get('accountTypesLoaded')).toEqual(false);
    expect(state.get('accounts').toJS()).toEqual([]);
    expect(state.get('accountTypes').toJS()).toEqual([]);
    expect(state.get('currentAccount').toJS()).toEqual({});
    expect(state.get('selectedAccounts').toJS()).toEqual([]);
  });

  describe('SET_ACCOUNT_TYPES', () => {
    it('stores the given account types into the store', () => {
      const action = { type: SET_ACCOUNT_TYPES, accountTypes };
      const nextState = accountReducer(undefined, action);

      expect(nextState.get('accountTypes').toJS()).toEqual(accountTypes);
      expect(nextState.get('accountTypesLoaded')).toEqual(true);
    });
  });


  describe('SET_ACCOUNTS', () => {
    let nextState;
    beforeEach(() => {
      const initialState = accountReducer();
      const action = { type: SET_ACCOUNTS, accounts: [account1, account2] };
      nextState = accountReducer(initialState, action);
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

    it('sets selectedAccounts to id of first account', () => {
      expect(nextState.get('selectedAccounts').toJS()).toEqual([11]);
    });

    it('does not reset currentAccount if already set', () => {
      const newState = accountReducer(nextState, { type: SET_CURRENT_ACCOUNT, id: account2.id });
      const reloadedState = accountReducer(newState, { type: SET_ACCOUNTS, accounts: [account1, account2] });
      expect(reloadedState.get('currentAccount').toJS()).toEqual(account2);
    });

    it('does reset currentAccount if it has been removed', () => {
      expect(nextState.get('currentAccount').toJS()).toEqual(account1);

      const action = { type: SET_ACCOUNTS, accounts: [account2] };
      const newState = accountReducer(nextState, action);

      expect(newState.get('currentAccount').toJS()).toEqual(account2);
    });

    it('does not set current account or selected accounts if there are no accounts', () => {
      const action = { type: SET_ACCOUNTS, accounts: [] };
      nextState = accountReducer(undefined, action);
      expect(nextState.get('accounts').toJS()).toEqual([]);
      expect(nextState.get('currentAccount').toJS()).toEqual({});
      expect(nextState.get('selectedAccounts').toJS()).toEqual([]);
    });
  });

  describe('SET_CURRENT_ACCOUNT', () => {
    let nextState;
    beforeEach(() => {
      const initialState = accountReducer();
      const action1 = { type: SET_ACCOUNTS, accounts: [account1, account2] };
      const action2 = { type: SET_CURRENT_ACCOUNT, id: account2.id };
      const midState = accountReducer(initialState, action1);
      nextState = accountReducer(midState, action2);
    });

    it('sets currentAccount based on account id', () => {
      expect(nextState.get('currentAccount').toJS()).toEqual(account2);
    });
  });

  describe('SET_SELECTED_ACCOUNTS', () => {
    it('sets selectedAccounts to account ids', () => {
      const action = { type: SET_SELECTED_ACCOUNTS, accountIds: [1, 2] };
      const state = accountReducer(undefined, action);
      expect(state.get('selectedAccounts').toJS()).toEqual([1, 2]);
    });
  });
});
