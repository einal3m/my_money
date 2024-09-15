import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type Pattern = {
  id: number,
  accountId: number,
  matchText: string,
  notes: string,
  categoryId: number,
  subcategoryId: number,
}

export interface PatternState {
  loaded: boolean,
  patterns: Pattern[]
}

const initialState: PatternState = {
  loaded: false,
  patterns: []
}

export const patternsSlice = createSlice({
  name: 'patternStore',
  initialState,
  reducers: {
    setPatterns: (state, action: PayloadAction<Pattern[]>) => {
      state.loaded = true
      state.patterns = action.payload
    },
    getPatterns: (state) => { 
      state.loaded = false
    },
    savePattern: () => { },
    deletePattern: () => { },
  }
})

export const { setPatterns, getPatterns, savePattern, deletePattern } = patternsSlice.actions
export default patternsSlice.reducer
