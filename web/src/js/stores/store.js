import { createStore, combineReducers } from 'redux';
import accountReducer from './account-reducer';
import dateRangeReducer from './date-range-reducer';
import transactionReducer from './transaction-reducer';
import categoryReducer from './category-reducer';
import importReducer from './import-reducer';
import apiReducer from './api-status-reducer';
import reportReducer from './report-reducer';
import formReducer from './form-reducer';
import patternReducer from './pattern-reducer';

export default createStore(
  combineReducers({
    accountStore: accountReducer,
    dateRangeStore: dateRangeReducer,
    transactionStore: transactionReducer,
    categoryStore: categoryReducer,
    importStore: importReducer,
    apiStatusStore: apiReducer,
    reportStore: reportReducer,
    formStore: formReducer,
    patternStore: patternReducer,
  })
);
