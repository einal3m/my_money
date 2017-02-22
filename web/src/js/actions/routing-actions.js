import { hashHistory } from 'react-router';
import { setCurrentAccount } from './account-actions';
import { setCurrentCategory, setCurrentSubcategory } from './category-actions';

export function routeToTransactions(accountId) {
  if (accountId) setCurrentAccount(accountId);
  hashHistory.push('/transactions');
}

export function routeToImportTransactions() {
  hashHistory.push('/import');
}

export function routeToImportHistory(accountId) {
  setCurrentAccount(accountId);
  hashHistory.push('/import-history');
}

export function routeToCategoryReport(categoryId) {
  setCurrentCategory(categoryId);
  hashHistory.push('/reports/categoryReport');
}

export function routeToSubcategoryReport(categoryId, subcategoryId) {
  setCurrentCategory(categoryId);
  setCurrentSubcategory(subcategoryId);
  hashHistory.push('/reports/subcategoryReport');
}
