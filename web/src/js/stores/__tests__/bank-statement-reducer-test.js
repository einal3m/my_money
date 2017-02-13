import { fromJS } from 'immutable';
import bankStatementReducer from '../bank-statement-reducer';
import {
  GET_BANK_STATEMENTS, SET_BANK_STATEMENTS, CONFIRM_DELETE_BANK_STATEMENT, CANCEL_DELETE_BANK_STATEMENT
} from '../../actions/bank-statement-actions';

describe('BankStatementReducer', () => {
  const bankStatements = [
    { id: 11, accountId: 2, fileName: 'one.ofx', transactionCount: 3, date: '2015-08-03' },
    { id: 12, accountId: 2, fileName: 'two.ofx', transactionCount: 4, date: '2015-08-23' },
  ];

  it('has a default state', () => {
    const state = bankStatementReducer();

    expect(state.get('loaded')).toEqual(false);
    expect(state.get('bankStatements').toJS()).toEqual([]);
    expect(state.get('bankStatementForDelete')).toEqual(null);
  });

  describe('GET_BANK_STATEMENTS', () => {
    it('sets loading to true', () => {
      const initialState = fromJS({ loaded: true, bankStatements: ['something'] });
      const action = { type: GET_BANK_STATEMENTS };
      const nextState = bankStatementReducer(initialState, action).toJS();

      expect(nextState.loaded).toEqual(false);
      expect(nextState.bankStatements).toEqual([]);
    });
  });

  describe('SET_BANK_STATEMENTS', () => {
    it('sets loading to false, and sets bank statements', () => {
      const action = { type: SET_BANK_STATEMENTS, bankStatements };
      const nextState = bankStatementReducer(undefined, action).toJS();

      expect(nextState.loaded).toEqual(true);
      expect(nextState.bankStatements).toEqual(bankStatements);
    });
  });

  describe('CONFIRM_DELETE_BANK_STATEMENT', () => {
    it('sets loading to false, and sets bank statements', () => {
      const action = { type: CONFIRM_DELETE_BANK_STATEMENT, bankStatement: bankStatements[1] };
      const nextState = bankStatementReducer(undefined, action).toJS();

      expect(nextState.bankStatementForDelete).toEqual(bankStatements[1]);
    });
  });

  describe('CANCEL_DELETE_BANK_STATEMENT', () => {
    it('sets loading to false, and sets bank statements', () => {
      const initialState = fromJS({ bankStatementForDelete: bankStatements[1] });
      const action = { type: CANCEL_DELETE_BANK_STATEMENT, bankStatements };
      const nextState = bankStatementReducer(initialState, action).toJS();

      expect(nextState.bankStatementForDelete).toEqual(null);
    });
  });
});
