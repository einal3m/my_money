import { configureStore } from '@reduxjs/toolkit'

import apiReducer from './api-status-reducer'
import currentReducer from './currentSlice'
import formReducer from './formSlice'
import importReducer from './importSlice'
import transactionReducer from './transactionSlice'
import { applicationApi } from './applicationApi'

export const store = configureStore({
  reducer: {
    [applicationApi.reducerPath]: applicationApi.reducer,
    apiStatusStore: apiReducer,
    currentStore: currentReducer,
    formStore: formReducer,
    importStore: importReducer,
    transactionStore: transactionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(applicationApi.middleware),
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

export default store
