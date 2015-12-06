import transactionActions from '../transaction-actions';
import transactionApi from '../../services/transaction-api';
import store from '../../stores/store';

describe('TransactionActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('fetchTransactions', () => {
    it('retrieves a list of transactions', () => {
      spyOn(transactionApi, 'index');
      transactionActions.fetchTransactions(56);
      expect(transactionApi.index).toHaveBeenCalledWith(56);
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
});
