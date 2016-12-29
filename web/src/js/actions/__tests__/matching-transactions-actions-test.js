import { fromJS } from 'immutable';
import * as matchingTransactionsActions from '../matching-transactions-actions';
import apiUtil from '../../util/api-util';
import store from '../../stores/store';
import transactionTransformer from '../../transformers/transaction-transformer';

describe('MatchingTransactionsActions', () => {
  beforeEach(() => {
    spyOn(store, 'dispatch');
    spyOn(apiUtil, 'get');
    spyOn(store, 'getState').and.returnValue({ accountStore: fromJS({ currentAccount: { id: 12 } }) });
    matchingTransactionsActions.getMatchingTransactions(34);
  });

  describe('getMatchingTransactions', () => {
    it('calls the matching api', () => {
      expect(apiUtil.get).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: matchingTransactionsActions.GET_MATCHING_TRANSACTIONS });

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('accounts/12/transactions/34/matching');
    });

    it('stores the transactions on success', () => {
      spyOn(transactionTransformer, 'transformFromApi').and.returnValue('transformedTransaction');
      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      getArgs.onSuccess({ transactions: ['transaction'] });

      expect(transactionTransformer.transformFromApi).toHaveBeenCalledWith('transaction');
      expect(store.dispatch).toHaveBeenCalledWith({
        type: matchingTransactionsActions.SET_MATCHING_TRANSACTIONS,
        transactions: ['transformedTransaction'],
      });
    });
  });
});
