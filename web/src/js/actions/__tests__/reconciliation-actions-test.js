import { fromJS } from 'immutable';
import * as reconciliationActions from '../reconciliation-actions';
import * as reconciliationTransformer from '../../transformers/reconciliation-transformer';
import store from '../../stores/store';
import apiUtil from '../../util/api-util';

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
});
