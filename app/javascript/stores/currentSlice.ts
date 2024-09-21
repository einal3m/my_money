import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { accountApi } from './accountApi'

import { Account, DateRange } from 'types/models'
import { dateRangeApi } from './dateRangeApi'

type CurrentState = {
  currentAccount?: Account
  currentLoanView: string
  currentDateRange?: DateRange
}

const initialState: CurrentState = {
  currentLoanView: 'chart',
}

export const currentSlice = createSlice({
  name: 'currentStore',
  initialState,
  reducers: {
    setCurrentAccount: (state, action: PayloadAction<Account>) => {
      state.currentAccount = action.payload
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
  setCurrentLoanView,
  setCurrentDateRange,
  setCurrentFromDate,
  setCurrentToDate,
} = currentSlice.actions
export default currentSlice.reducer
