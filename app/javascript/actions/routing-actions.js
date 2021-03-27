import { useHistory } from "react-router-dom";
import { setCurrentAccount } from './account-actions';
import { setCurrentCategory, setCurrentSubcategory } from './category-actions';

export function routeToTransactions(accountId) {
  if (accountId) setCurrentAccount(accountId);

  let history = useHistory();
  history.push('/transactions');
}

export function routeToImportTransactions() {
  let history = useHistory();
  history.push('/import');
}

export function routeToImportHistory(accountId) {
  setCurrentAccount(accountId);

  let history = useHistory();
  history.push('/import-history');
}

export function routeToCategoryReport(categoryId) {
  setCurrentCategory(categoryId);

  let history = useHistory();
  history.push('/reports/categoryReport');
}

export function routeToSubcategoryReport(categoryId, subcategoryId) {
  setCurrentCategory(categoryId);
  setCurrentSubcategory(subcategoryId);

  let history = useHistory();
  history.push('/reports/subcategoryReport');
}

export function routeToLoanReport(accountId) {
  setCurrentAccount(accountId);

  let history = useHistory();
  history.push('/reports/loanReport');
}
