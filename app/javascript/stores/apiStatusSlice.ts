import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum ApiStatus {
  NONE = '',
  DONE = 'done',
  LOADING = 'loading',
  SAVING = 'saving',
  DELETING = 'deleting',
  ERROR = 'error',
}

type ApiStatusState = {
  status: ApiStatus
  message?: string
}

const initialState: ApiStatusState = {
  status: ApiStatus.NONE,
}

export const apiStatusSlice = createSlice({
  name: 'apiStatusStore',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<ApiStatusState>) => {
      const { status } = action.payload
      state.status = status
      state.message = undefined
    },
    setStatusAndMessage: (state, action: PayloadAction<ApiStatusState>) => {
      const { status, message } = action.payload
      state.status = status
      state.message = message
    },
  },
})

export const { setStatus, setStatusAndMessage } = apiStatusSlice.actions
export default apiStatusSlice.reducer
