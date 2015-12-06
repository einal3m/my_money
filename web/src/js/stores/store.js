import { createStore, combineReducers } from 'redux';
import accountReducer from './account-reducer';
import dateRangeReducer from './date-range-reducer';
import transactionReducer from './transaction-reducer';

export default createStore(
  combineReducers({
    accountStore: accountReducer,
    dateRangeStore: dateRangeReducer,
    transactionStore: transactionReducer
  })
);
