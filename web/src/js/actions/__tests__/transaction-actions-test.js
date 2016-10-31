import * as transactionActions from '../transaction-actions';
import transactionTransformer from '../../transformers/transaction-transformer';
import store from '../../stores/store';
import apiUtil from '../../util/api-util';

describe('TransactionActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('getTransactions', () => {
    // TODO: learn how to test promises
  });

  describe('storeTransactions', () => {
    it('dispatches the transactions to the store', () => {
      transactionActions.storeTransactions(['transactions']);
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: transactionActions.SET_TRANSACTIONS,
        transactions: ['transactions'],
      });
    });
  });

  describe('saveTransaction', () => {
    it('makes post request with callback when id is not present', () => {
      const transaction = { notes: 'Cat', accountId: 4 };
      spyOn(apiUtil, 'post');
      spyOn(transactionTransformer, 'transformToApi').and.returnValue('transformedTransaction');

      transactionActions.saveTransaction(transaction);

      expect(transactionTransformer.transformToApi).toHaveBeenCalledWith(transaction);
      expect(apiUtil.post).toHaveBeenCalled();

      const postArgs = apiUtil.post.calls.argsFor(0)[0];
      expect(postArgs.url).toEqual('accounts/4/transactions');
      expect(postArgs.body).toEqual({ transaction: 'transformedTransaction' });
    });

    it('makes put request with callback when id is present', () => {
      const transaction = { id: 23, notes: 'Cat', accountId: 4 };
      spyOn(apiUtil, 'put');
      spyOn(transactionTransformer, 'transformToApi').and.returnValue('transformedTransaction');

      transactionActions.saveTransaction(transaction);

      expect(transactionTransformer.transformToApi).toHaveBeenCalledWith(transaction);
      expect(apiUtil.put).toHaveBeenCalled();

      const putArgs = apiUtil.put.calls.argsFor(0)[0];
      expect(putArgs.url).toEqual('accounts/4/transactions/23');
      expect(putArgs.body).toEqual({ transaction: 'transformedTransaction' });
    });
  });

  describe('deleteTransaction', () => {
    it('makes delete request', () => {
      const transaction = { id: 23, accountId: 4 };
      spyOn(apiUtil, 'delete');

      transactionActions.deleteTransaction(transaction);

      expect(apiUtil.delete).toHaveBeenCalled();

      const deleteArgs = apiUtil.delete.calls.argsFor(0)[0];
      expect(deleteArgs.url).toEqual('accounts/4/transactions/23');
    });
  });

  describe('setSearchDescription', () => {
    it('dispatches the description to the store', () => {
      transactionActions.setSearchDescription('my String');
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: transactionActions.SET_SEARCH_DESCRIPTION,
        description: 'my String',
      });
    });
  });

  describe('toggleMoreOrLess', () => {
    it('dispatches the toggle actions', () => {
      transactionActions.toggleMoreOrLess();
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: transactionActions.TOGGLE_MORE_OR_LESS,
      });
    });
  });
});
