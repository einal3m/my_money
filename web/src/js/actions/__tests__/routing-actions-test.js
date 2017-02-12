import { hashHistory } from 'react-router';
import { routeToTransactions, routeToImportTransactions, routeToImportHistory } from '../routing-actions';
import * as accountActions from '../account-actions';

describe('RoutingActions', () => {
  describe('routeToTransactions', () => {
    it('sets the current account and routes to the transaction page', () => {
      spyOn(accountActions, 'setCurrentAccount');
      spyOn(hashHistory, 'push');

      routeToTransactions(22);

      expect(accountActions.setCurrentAccount).toHaveBeenCalledWith(22);
      expect(hashHistory.push).toHaveBeenCalledWith('/transactions');
    });

    it('does not set current account if not provided', () => {
      spyOn(accountActions, 'setCurrentAccount');
      spyOn(hashHistory, 'push');

      routeToTransactions();

      expect(accountActions.setCurrentAccount).not.toHaveBeenCalled();
      expect(hashHistory.push).toHaveBeenCalledWith('/transactions');
    });
  });

  describe('routeToImportTransactions', () => {
    it('routes to the import component', () => {
      spyOn(hashHistory, 'push');
      routeToImportTransactions();
      expect(hashHistory.push).toHaveBeenCalledWith('/import');
    });
  });

  describe('routeToImportHistory', () => {
    it('routes to the import history page', () => {
      spyOn(accountActions, 'setCurrentAccount');
      spyOn(hashHistory, 'push');
      routeToImportHistory(22);
      expect(accountActions.setCurrentAccount).toHaveBeenCalledWith(22);
      expect(hashHistory.push).toHaveBeenCalledWith('/import-history');
    });
  });
});
