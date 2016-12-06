import { Map } from 'immutable';
import reportReducer from '../report-reducer';
import {
  GET_REPORT, SET_ACCOUNT_BALANCE_REPORT, SET_TRANSACTION_REPORT, TOGGLE_REPORT_VIEW, SET_TOTALS_REPORT,
} from '../../actions/report-actions';

describe('ReportReducer', () => {
  it('has a default state', () => {
    const state = reportReducer();
    expect(state.get('accountBalances').toJS()).toEqual({});
    expect(state.get('transactions').toJS()).toEqual([]);
    expect(state.get('totals').toJS()).toEqual([]);
    expect(state.get('loaded')).toEqual(false);
    expect(state.get('viewType')).toEqual('table');
  });

  describe('GET_REPORT', () => {
    it('sets loading to true, and resets report objects', () => {
      const action = { type: GET_REPORT };
      const state = reportReducer(Map({ loaded: true }), action);
      expect(state.get('loaded')).toEqual(false);
      expect(state.get('accountBalances').toJS()).toEqual({});
      expect(state.get('transactions').toJS()).toEqual([]);
      expect(state.get('totals').toJS()).toEqual([]);
    });
  });

  describe('SET_ACCOUNT_BALANCE_REPORT', () => {
    it('sets the balances for the account, and sets loading to false', () => {
      let action = { type: SET_ACCOUNT_BALANCE_REPORT, accountId: 3, report: ['report3'] };
      const state = reportReducer(undefined, action);
      expect(state.get('accountBalances').get(3).toJS()).toEqual(['report3']);
      expect(state.get('loaded')).toEqual(true);

      action = { type: SET_ACCOUNT_BALANCE_REPORT, accountId: 4, report: ['report4'] };
      const nextState = reportReducer(state, action);
      expect(nextState.get('accountBalances').get(3).toJS()).toEqual(['report3']);
      expect(nextState.get('accountBalances').get(4).toJS()).toEqual(['report4']);
      expect(state.get('loaded')).toEqual(true);
    });
  });

  describe('SET_TRANSACTION_REPORT', () => {
    it('sets the transactions and totals, and sets loading to false', () => {
      const action = { type: SET_TRANSACTION_REPORT, transactions: ['transaction'], totals: ['total'] };
      const state = reportReducer(undefined, action);
      expect(state.get('transactions').toJS()).toEqual(['transaction']);
      expect(state.get('totals').toJS()).toEqual(['total']);
      expect(state.get('loaded')).toEqual(true);
    });
  });

  describe('SET_TOTALS_REPORT', () => {
    it('sets the transactions and totals, and sets loading to false', () => {
      const action = { type: SET_TOTALS_REPORT, totals: ['total'] };
      const state = reportReducer(undefined, action);
      expect(state.get('totals').toJS()).toEqual(['total']);
      expect(state.get('loaded')).toEqual(true);
    });
  });

  describe('TOGGLE_REPORT_VIEW', () => {
    it('toggles the view from chart to table', () => {
      const action = { type: TOGGLE_REPORT_VIEW };
      const state = reportReducer(undefined, action);
      expect(state.get('viewType')).toEqual('chart');
    });
  });
});
