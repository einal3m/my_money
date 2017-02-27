import { createStore, combineReducers } from 'redux';
import accountReducer from './account-reducer';
import dateRangeReducer from './date-range-reducer';
import transactionReducer from './transaction-reducer';
import matchingTransactionReducer from './matching-transactions-reducer';
import categoryReducer from './category-reducer';
import importReducer from './import-reducer';
import bankStatementsReducer from './bank-statement-reducer';
import apiReducer from './api-status-reducer';
import reportReducer from './report-reducer';
import formReducer from './form-reducer';
import patternReducer from './pattern-reducer';
import loanReducer from './loan-reducer';
import budgetReducer from './budget-reducer';

export default createStore(
  combineReducers({
    accountStore: accountReducer,
    dateRangeStore: dateRangeReducer,
    transactionStore: transactionReducer,
    matchingTransactionStore: matchingTransactionReducer,
    categoryStore: categoryReducer,
    importStore: importReducer,
    bankStatementStore: bankStatementsReducer,
    apiStatusStore: apiReducer,
    reportStore: reportReducer,
    formStore: formReducer,
    patternStore: patternReducer,
    loanStore: loanReducer,
    budgetStore: budgetReducer,
  })
);
