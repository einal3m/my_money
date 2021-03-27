import { hashHistory } from 'react-router';
import { routeToTransactions, routeToImportTransactions, routeToImportHistory, routeToCategoryReport,
  routeToSubcategoryReport, routeToLoanReport } from 'actions/routing-actions';
import * as accountActions from 'actions/account-actions';
import * as categoryActions from 'actions/category-actions';

xdescribe('RoutingActions', () => {
  beforeEach(() => {
    spyOn(hashHistory, 'push');
  });

  describe('routeToTransactions', () => {
    it('sets the current account and routes to the transaction page', () => {
      spyOn(accountActions, 'setCurrentAccount');

      routeToTransactions(22);

      expect(accountActions.setCurrentAccount).toHaveBeenCalledWith(22);
      expect(hashHistory.push).toHaveBeenCalledWith('/transactions');
    });

    it('does not set current account if not provided', () => {
      spyOn(accountActions, 'setCurrentAccount');

      routeToTransactions();

      expect(accountActions.setCurrentAccount).not.toHaveBeenCalled();
      expect(hashHistory.push).toHaveBeenCalledWith('/transactions');
    });
  });

  describe('routeToImportTransactions', () => {
    it('routes to the import component', () => {
      routeToImportTransactions();
      expect(hashHistory.push).toHaveBeenCalledWith('/import');
    });
  });

  describe('routeToImportHistory', () => {
    it('routes to the import history page', () => {
      spyOn(accountActions, 'setCurrentAccount');
      routeToImportHistory(22);
      expect(accountActions.setCurrentAccount).toHaveBeenCalledWith(22);
      expect(hashHistory.push).toHaveBeenCalledWith('/import-history');
    });
  });

  describe('routeToLoanReport', () => {
    it('routes to the loan report page', () => {
      spyOn(accountActions, 'setCurrentAccount');
      routeToLoanReport(22);
      expect(accountActions.setCurrentAccount).toHaveBeenCalledWith(22);
      expect(hashHistory.push).toHaveBeenCalledWith('/reports/loanReport');
    });
  });

  describe('routeToCategoryReport', () => {
    it('sets the current category and routes to the report', () => {
      spyOn(categoryActions, 'setCurrentCategory');

      routeToCategoryReport(45);

      expect(categoryActions.setCurrentCategory).toHaveBeenCalledWith(45);
      expect(hashHistory.push).toHaveBeenCalledWith('/reports/categoryReport');
    });
  });

  describe('routeToSubcategoryReport', () => {
    it('sets the current category and subcategory and routes to the report', () => {
      spyOn(categoryActions, 'setCurrentCategory');
      spyOn(categoryActions, 'setCurrentSubcategory');

      routeToSubcategoryReport(45, 12);

      expect(categoryActions.setCurrentCategory).toHaveBeenCalledWith(45);
      expect(categoryActions.setCurrentSubcategory).toHaveBeenCalledWith(12);
      expect(hashHistory.push).toHaveBeenCalledWith('/reports/subcategoryReport');
    });
  });
});
