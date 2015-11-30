import alt from '../../alt';
import transactionActions from '../transaction-actions';
import transactionService from '../../services/transaction-service';

describe('TransactionActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(alt.dispatcher, 'dispatch');
  });

  describe('fetchTransactions', () => {
    it('retrieves a list of transactions', () => {
      spyOn(transactionService, 'list');
      transactionActions.fetchTransactions(56);
      expect(transactionService.list).toHaveBeenCalledWith(56);
      expect(dispatcherSpy).toHaveBeenCalled();
    });
  });

  describe('receiveTransactions', () => {
    it('dispatches the transactions to the store', () => {
      transactionActions.receiveTransactions(['transactions']);
      expect(dispatcherSpy).toHaveBeenCalled();
      expect(dispatcherSpy.calls.mostRecent().args[0].data).toEqual(['transactions']);
    });
  });
});
