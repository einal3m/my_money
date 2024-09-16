import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ModelType } from 'types/models';

type FormModalState = {
  allowDelete: boolean,
  model?: any,
  modelType?: ModelType,
  show: boolean,
  source: string,
}

const initialState: FormModalState = {
  allowDelete: false,
  show: false,
  source: ''
}

export const formSlice = createSlice({
  name: 'formStore',
  initialState,
  reducers: {
    showFormModal: (state, action: PayloadAction<FormModalState>) => {
      const { modelType, model, allowDelete, source } = action.payload
      state.allowDelete = allowDelete
      state.model = model
      state.modelType = modelType
      state.show = true
      state.source = source
    },
    hideFormModal: (state) => { 
      state.show = false
      state.model = undefined
      state.modelType = undefined
      state.allowDelete = false
      state.source = ''
    },
  }
})

export const { showFormModal, hideFormModal } = formSlice.actions
export default formSlice.reducer
