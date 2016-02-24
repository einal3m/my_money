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

  describe('getTransactions', () => {
    xit('calls the api for accounts, date ranges and transactions', () => {
      spyOn(store, 'getState').and.returnValue({
        accountStore: fromJS({loaded: true, currentAccount: {id: 45}}),
        dateRangeStore: fromJS({loaded: true, currentDateRange: {fromDate: '2015-01-01', toDate: '2015-02-02'}}),
        transactionStore: fromJS({moreOptions: true, searchDescription: 'my String'})
      });
      spyOn(accountActions, 'getAccounts').and.returnValue(Promise.resolve());
      spyOn(dateRangeActions, 'getDateRanges').and.returnValue(Promise.resolve());
      spyOn(transactionApi, 'index');

      transactionActions.getTransactions();

      expect(transactionApi.index).toHaveBeenCalled();
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
