import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OfxTransaction } from 'types/models'

type ImportState = {
  transactions: OfxTransaction[]
  filename: string
}

const initialState: ImportState = {
  transactions: [],
  filename: '',
}

type BooleanPayload = {
  index: number
  value: boolean
}

type NumberPayload = {
  index: number
  value: number
}

type StringPaylod = {
  index: number
  value?: string
}

export const importSlice = createSlice({
  name: 'importStore',
  initialState,
  reducers: {
    setOfxTransactions: (state, action: PayloadAction<ImportState>) => {
      state.transactions = action.payload.transactions
      state.filename = action.payload.filename
    },
    setImport: (state, action: PayloadAction<BooleanPayload>) => {
      state.transactions = state.transactions.map((transaction, i) => {
        if (i !== action.payload.index) {
          return transaction
        }
        return {
          ...transaction,
          import: action.payload.value,
        }
      })
    },
    setCategoryId: (state, action: PayloadAction<NumberPayload>) => {
      state.transactions = state.transactions.map((transaction, i) => {
        if (i !== action.payload.index) {
          return transaction
        }
        return {
          ...transaction,
          categoryId: action.payload.value,
        }
      })
    },
    setSubcategoryId: (state, action: PayloadAction<NumberPayload>) => {
      state.transactions = state.transactions.map((transaction, i) => {
        if (i !== action.payload.index) {
          return transaction
        }
        return {
          ...transaction,
          subcategoryId: action.payload.value,
        }
      })
    },
    setNotes: (state, action: PayloadAction<StringPaylod>) => {
      state.transactions = state.transactions.map((transaction, i) => {
        if (i !== action.payload.index) {
          return transaction
        }
        return {
          ...transaction,
          notes: action.payload.value,
        }
      })
    },
  },
})

export const {
  setOfxTransactions,
  setImport,
  setCategoryId,
  setSubcategoryId,
  setNotes,
} = importSlice.actions

export default importSlice.reducer
