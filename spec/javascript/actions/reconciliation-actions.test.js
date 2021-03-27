import { fromJS } from 'immutable';
import * as reconciliationActions from 'actions/reconciliation-actions';
import * as reconciliationTransformer from 'transformers/reconciliation-transformer';
import store from 'stores/store';
import apiUtil from 'util/api-util';

describe('ReconciliationActions', () => {
  beforeEach(() => {
    spyOn(store, 'dispatch');
  });

  describe('fetchReconciliations', () => {
    beforeEach(() => {
      spyOn(apiUtil, 'get');
      spyOn(store, 'getState').and.returnValue({ accountStore: fromJS({ currentAccount: { id: 12 } }) });

      reconciliationActions.fetchReconciliations();
    });

    it('makes an ajax request to GET reconcilations for current account', () => {
      expect(apiUtil.get).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({ type: reconciliationActions.GET_RECONCILIATIONS });

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      expect(getArgs.url).toEqual('accounts/12/reconciliations');
    });

    it('makes an ajax request to GET reconcilations for current account', () => {
      spyOn(reconciliationTransformer, 'transformFromApi').and.returnValue('transformedReconciliation');

      const getArgs = apiUtil.get.calls.argsFor(0)[0];
      const successCallback = getArgs.onSuccess;
      successCallback({ reconciliations: ['reconciliation'] });

      expect(reconciliationTransformer.transformFromApi).toHaveBeenCalledWith('reconciliation');
      expect(store.dispatch).toHaveBeenCalledWith({
        type: reconciliationActions.SET_RECONCILIATIONS,
        reconciliations: ['transformedReconciliation'],
      });
    });
  });

  describe('saveReconciliation', () => {
    beforeEach(() => {
      spyOn(apiUtil, 'post').and.returnValue(Promise.resolve());
      spyOn(apiUtil, 'put').and.returnValue(Promise.resolve());
      spyOn(reconciliationTransformer, 'transformToApi').and.returnValue('transformedReconciliation');
      spyOn(store, 'getState').and.returnValue({ accountStore: fromJS({ currentAccount: { id: 12 } }) });
    });

    it('makes a post request if it has no id', () => {
      reconciliationActions.saveReconciliation({ statementBalance: 3000 });

      expect(store.dispatch).toHaveBeenCalledWith({ type: reconciliationActions.SAVE_RECONCILIATION });
      expect(apiUtil.post).toHaveBeenCalled();
      expect(reconciliationTransformer.transformToApi).toHaveBeenCalledWith({ statementBalance: 3000 });

      const postArgs = apiUtil.post.calls.argsFor(0)[0];
      expect(postArgs.url).toEqual('accounts/12/reconciliations');
      expect(postArgs.body).toEqual({ reconciliation: 'transformedReconciliation' });
    });

    it('makes a put request if it has an id', () => {
      reconciliationActions.saveReconciliation({ id: 1, statementBalance: 3000 });

      expect(store.dispatch).toHaveBeenCalledWith({ type: reconciliationActions.SAVE_RECONCILIATION });
      expect(apiUtil.put).toHaveBeenCalled();
      expect(reconciliationTransformer.transformToApi).toHaveBeenCalledWith({ id: 1, statementBalance: 3000 });

      const putArgs = apiUtil.put.calls.argsFor(0)[0];
      expect(putArgs.url).toEqual('accounts/12/reconciliations/1');
      expect(putArgs.body).toEqual({ reconciliation: 'transformedReconciliation' });
    });
  });
});
