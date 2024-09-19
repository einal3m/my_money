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
import reconciliationReducer from './reconciliation-reducer'
import { accountApi } from './accountApi'
import { budgetApi } from './budgetApi'
import { categoryApi } from './categoryApi'
import { patternApi } from './patternApi'

export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    [budgetApi.reducerPath]: budgetApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [patternApi.reducerPath]: patternApi.reducer,
    accountStore: accountReducer,
    dateRangeStore: dateRangeReducer,
    transactionStore: transactionReducer,
    matchingTransactionStore: matchingTransactionReducer,
    categoryStore: categoryReducer,
    importStore: importReducer,
    bankStatementStore: bankStatementsReducer,
    apiStatusStore: apiReducer,
    reportStore: reportReducer,
    currentStore: currentReducer,
    formStore: formReducer,
    reconciliationStore: reconciliationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(accountApi.middleware)
      .concat(budgetApi.middleware)
      .concat(categoryApi.middleware)
      .concat(patternApi.middleware),
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

export default store
