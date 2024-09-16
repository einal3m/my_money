import { RootState } from '../stores/store'

export const selectCurrentState = (state: RootState) => ({
  currentAccount: state.accountStore.get('currentAccount').toJS(),
})
