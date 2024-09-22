import { configureStore } from '@reduxjs/toolkit'

import accountReducer from './account-reducer'
import dateRangeReducer from './date-range-reducer'
import transactionReducer from './transaction-reducer'
import matchingTransactionReducer from './matching-transactions-reducer'
import categoryReducer from './category-reducer'
import importReducer from './import-reducer'
import bankStatementsReducer from './bank-statement-reducer'
import apiReducer from './api-status-reducer'
import reportReducer from './report-reducer'
import currentReducer from './currentSlice'
import formReducer from './formSlice'
import transactionReducer from './transactionSlice'
import reconciliationReducer from './reconciliation-reducer'
import { applicationApi } from './applicationApi'

export const store = configureStore({
  reducer: {
    [applicationApi.reducerPath]: applicationApi.reducer,
    accountStore: accountReducer,
    dateRangeStore: dateRangeReducer,
    matchingTransactionStore: matchingTransactionReducer,
    categoryStore: categoryReducer,
    importStore: importReducer,
    bankStatementStore: bankStatementsReducer,
    apiStatusStore: apiReducer,
    reportStore: reportReducer,
    currentStore: currentReducer,
    formStore: formReducer,
    transactionStore: transactionReducer,
    reconciliationStore: reconciliationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(applicationApi.middleware)
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

export default store
