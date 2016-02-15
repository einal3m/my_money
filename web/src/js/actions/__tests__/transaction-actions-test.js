import transactionActions from '../transaction-actions';
import accountActions from '../account-actions';
import dateRangeActions from '../date-range-actions';
import transactionApi from '../../apis/transaction-api';
import store from '../../stores/store';
import { fromJS } from 'immutable';

describe('TransactionActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('fetchTransactions', () => {
    it('retrieves a list of transactions if accounts and dates are loaded', () => {
      spyOn(store, 'getState').and.returnValue({
        accountStore: fromJS({loaded: true, currentAccount: {id: 45}}),
        dateRangeStore: fromJS({loaded: true, currentDateRange: {fromDate: '2015-01-01', toDate: '2015-02-02'}}),
        transactionStore: fromJS({moreOptions: true, searchDescription: 'my String'})
      });
      spyOn(transactionApi, 'index');
      transactionActions.fetchTransactions();
      expect(transactionApi.index).toHaveBeenCalledWith(45, '2015-01-01', '2015-02-02', 'my String');
    });

    it('retrieves accounts if accounts are not loaded', () => {
      spyOn(store, 'getState').and.returnValue({
        accountStore: fromJS({loaded: false}),
        dateRangeStore: fromJS({loaded: true})
      });
      spyOn(transactionApi, 'index');
      spyOn(accountActions, 'fetchAccounts');
      transactionActions.fetchTransactions();
      expect(transactionApi.index).not.toHaveBeenCalled();
      expect(accountActions.fetchAccounts).toHaveBeenCalled();
    });

    it('retrieves date ranges if accounts are loaded', () => {
      spyOn(store, 'getState').and.returnValue({
        accountStore: fromJS({loaded: true}),
        dateRangeStore: fromJS({loaded: false})
      });
      spyOn(transactionApi, 'index');
      spyOn(dateRangeActions, 'fetchDateRanges');
      transactionActions.fetchTransactions();
      expect(transactionApi.index).not.toHaveBeenCalled();
      expect(dateRangeActions.fetchDateRanges).toHaveBeenCalled();
    });
  });

  describe('storeTransactions', () => {
    it('dispatches the transactions to the store', () => {
      transactionActions.storeTransactions(['transactions']);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_TRANSACTIONS',
        transactions: ['transactions']
      });
    });
  });

  describe('setSearchDescription', () => {
    it('dispatches the description to the store', () => {
      transactionActions.setSearchDescription('my String');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'SET_SEARCH_DESCRIPTION',
        description: 'my String'
      });
    });
  });

  describe('toggleMoreOrLess', () => {
    it('dispatches the toggle actions', () => {
      transactionActions.toggleMoreOrLess();
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: 'TOGGLE_MORE_OR_LESS'
      });
    });
  });
});
