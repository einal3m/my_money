import { Map } from 'immutable';
import * as transactionActions from 'actions/transaction-actions';
import transactionTransformer from 'transformers/transaction-transformer';
import store from 'stores/store';
import apiUtil from 'util/api-util';
import * as reportActions from 'actions/report-actions';
import { SOURCE_CATEGORY_REPORT, SOURCE_SUBCATEGORY_REPORT } from 'actions/form-actions';

describe('TransactionActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('fetchTransactions', () => {
    beforeEach(() => {
      spyOn(apiUtil, 'get');
    });

    it('makes a get request with data params', () => {
      spyOn(store, 'getState').and.returnValue({
        accountStore: Map({ currentAccount: Map({ id: 4 }) }),
        dateRangeStore: Map({ currentDateRange: Map({ fromDate: '2016-08-19', toDate: '2016-12-19' }) }),
        transactionStore: Map({ moreOptions: false }),
      });
      transactionActions.fetchTransactions();

      expect(apiUtil.get).toHaveBeenCalled();

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('accounts/4/transactions?from_date=2016-08-19&to_date=2016-12-19');
    });

    it('makes a get request with description, if it is set', () => {
      spyOn(store, 'getState').and.returnValue({
        accountStore: Map({ currentAccount: Map({ id: 4 }) }),
        dateRangeStore: Map({ currentDateRange: Map({ fromDate: '2016-08-19', toDate: '2016-12-19' }) }),
        transactionStore: Map({ moreOptions: true, searchDescription: 'hello' }),
      });
      transactionActions.fetchTransactions();

      expect(apiUtil.get).toHaveBeenCalled();

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('accounts/4/transactions?from_date=2016-08-19&to_date=2016-12-19&description=hello');
    });

    it('stores the transaction in the store, on success', () => {
      spyOn(store, 'getState').and.returnValue({
        accountStore: Map({ currentAccount: Map({ id: 4 }) }),
        dateRangeStore: Map({ currentDateRange: Map({ fromDate: '2016-08-19', toDate: '2016-12-19' }) }),
        transactionStore: Map({ moreOptions: false }),
      });

      spyOn(transactionTransformer, 'transformFromApi').and.returnValue('transformedTransaction');
      transactionActions.fetchTransactions();

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      getArgs.onSuccess({ transactions: ['transaction'] });

      expect(transactionTransformer.transformFromApi).toHaveBeenCalledWith('transaction');
      expect(store.dispatch).toHaveBeenCalledWith({
        type: transactionActions.SET_TRANSACTIONS,
        transactions: ['transformedTransaction'],
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

  describe('onSuccessCallback', () => {
    it('calls the getCategoryReport action if source is category report', () => {
      spyOn(store, 'getState').and.returnValue({ formStore: Map({ source: SOURCE_CATEGORY_REPORT }) });
      spyOn(reportActions, 'getCategoryReport');

      transactionActions.onSuccess();

      expect(reportActions.getCategoryReport).toHaveBeenCalled();
    });

    it('calls the getSubcategoryReport action if source is subcategory report', () => {
      spyOn(store, 'getState').and.returnValue({ formStore: Map({ source: SOURCE_SUBCATEGORY_REPORT }) });
      spyOn(reportActions, 'getSubcategoryReport');

      transactionActions.onSuccess();

      expect(reportActions.getSubcategoryReport).toHaveBeenCalled();
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
