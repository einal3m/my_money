import { hashHistory } from 'react-router';
import { setCurrentAccount } from './account-actions';

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
