import { RootState } from '../stores/store'

export const selectFormState = (state: RootState) => ({
  show: state.formStore.get('show'),
  modelType: state.formStore.get('modelType'),
  model: state.formStore.get('model').toJS(),
  allowDelete: state.formStore.get('allowDelete'),
})
