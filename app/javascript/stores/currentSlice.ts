import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { accountApi } from './accountApi';

import { Account } from 'types/models';

type CurrentState = {
  currentAccount?: Account,
}

const initialState: CurrentState = {
}

export const currentSlice = createSlice({
  name: 'currentStore',
  initialState,
  reducers: {
    setCurrentAccount: (state, action: PayloadAction<Account>) => {
      state.currentAccount = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      accountApi.endpoints.getAccounts.matchFulfilled,
      (state, { payload }) => {
        if (!state.currentAccount) {
          state.currentAccount = payload[0]
        }
      }
    )
  },
})

export const { setCurrentAccount } = currentSlice.actions
export default currentSlice.reducer
