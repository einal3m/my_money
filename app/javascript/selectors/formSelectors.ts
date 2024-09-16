import { RootState } from '../stores/store'

export const selectFormState = (state: RootState) => ({
  show: state.formStore.show,
  modelType: state.formStore.modelType,
  model: state.formStore.model,
  allowDelete: state.formStore.allowDelete,
})
