import { createStore, combineReducers } from 'redux';
import accountReducer from './account-reducer';
import dateRangeReducer from './date-range-reducer';

export default createStore(
  combineReducers({
    accountStore: accountReducer,
    dateRangeStore: dateRangeReducer
  })
);
