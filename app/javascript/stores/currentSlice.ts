import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { accountApi } from './accountApi'

import { Account, Category, DateRange, Subcategory } from 'types/models'
import { dateRangeApi } from './dateRangeApi'

type CurrentState = {
  currentAccount?: Account
  currentLoanView: string
  currentDateRange?: DateRange
  currentCategory?: Category
  currentSubcategory?: Subcategory
  currentSelectedAccounts: Account[]
}

const initialState: CurrentState = {
  currentLoanView: 'chart',
  currentSelectedAccounts: []
}

export const currentSlice = createSlice({
  name: 'currentStore',
  initialState,
  reducers: {
    setCurrentAccount: (state, action: PayloadAction<Account>) => {
      state.currentAccount = action.payload
    },
    setCurrentSelectedAccounts: (state, action: PayloadAction<Account[]>) => {
      state.currentSelectedAccounts = action.payload
    },
    setCurrentLoanView: (state, action: PayloadAction<string>) => {
      state.currentLoanView = action.payload
    },
    setCurrentDateRange: (state, action: PayloadAction<DateRange>) => {
      state.currentDateRange = action.payload
    },
    setCurrentFromDate: (state, action: PayloadAction<string>) => {
      if (state.currentDateRange) {
        state.currentDateRange.fromDate = action.payload
      }
    },
    setCurrentToDate: (state, action: PayloadAction<string>) => {
      if (state.currentDateRange) {
        state.currentDateRange.toDate = action.payload
      }
    },
    setCurrentCategory: (state, action: PayloadAction<Category>) => {
      state.currentCategory = action.payload
      state.currentSubcategory = undefined
    },
    setCurrentSubcategory: (state, action: PayloadAction<Subcategory>) => {
      state.currentSubcategory = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        accountApi.endpoints.getAccounts.matchFulfilled,
        (state, { payload }) => {
          if (!state.currentAccount) {
            state.currentAccount = payload[0]
          }
        },
      )
      .addMatcher(
        dateRangeApi.endpoints.getDateRanges.matchFulfilled,
        (state, { payload }) => {
          if (!state.currentDateRange) {
            state.currentDateRange = payload.find((dr) => dr.default)
          }
        },
      )
  },
})

export const {
  setCurrentAccount,
  setCurrentSelectedAccounts,
  setCurrentLoanView,
  setCurrentDateRange,
  setCurrentFromDate,
  setCurrentToDate,
  setCurrentCategory,
  setCurrentSubcategory,
} = currentSlice.actions
export default currentSlice.reducer
