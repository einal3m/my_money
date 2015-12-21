import { createStore, combineReducers } from 'redux';
import accountReducer from './account-reducer';
import dateRangeReducer from './date-range-reducer';
import transactionReducer from './transaction-reducer';
import categoryReducer from './category-reducer';

export default createStore(
  combineReducers({
    accountStore: accountReducer,
    dateRangeStore: dateRangeReducer,
    transactionStore: transactionReducer,
    categoryStore: categoryReducer
  })
);
