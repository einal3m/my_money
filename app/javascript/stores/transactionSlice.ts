import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TransactionState = {
  showMoreOptions: boolean
  searchDescription?: string
}

const initialState: TransactionState = {
  showMoreOptions: false,
}

export const transactionSlice = createSlice({
  name: 'transactionStore',
  initialState,
  reducers: {
    toggleShowMore: (state) => {
      state.showMoreOptions = !state.showMoreOptions
      if (!state.showMoreOptions) {
        state.searchDescription = undefined
      }
    },
    setSearchDescription: (state, action: PayloadAction<string | undefined>) => {
      state.searchDescription = action.payload
    },
  },
})

export const { toggleShowMore, setSearchDescription } = transactionSlice.actions
export default transactionSlice.reducer
