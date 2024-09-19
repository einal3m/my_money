import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { accountApi } from './accountApi'

import { Account } from 'types/models'

type CurrentState = {
  currentAccount?: Account
  currentLoanView: string
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
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      accountApi.endpoints.getAccounts.matchFulfilled,
      (state, { payload }) => {
        if (!state.currentAccount) {
          state.currentAccount = payload[0]
        }
      },
    )
  },
})

export const { setCurrentAccount, setCurrentLoanView } = currentSlice.actions
export default currentSlice.reducer
