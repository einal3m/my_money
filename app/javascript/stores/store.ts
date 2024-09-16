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
import formReducer from './form-reducer'
import patternReducer from './patterns-slice'
import loanReducer from './loan-reducer'
import budgetReducer from './budget-reducer'
import reconciliationReducer from './reconciliation-reducer'
import { categoryApi } from './categoryApi'

export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
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
    reconciliationStore: reconciliationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(categoryApi.middleware),
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

export default store
