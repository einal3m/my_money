import store from '../stores/store';
import {
  showFormModal as show, hideFormModal as hide
} from 'stores/formSlice'

export const showFormModal = (modelType, model, options) => {
  store.dispatch(show({modelType, model, allowDelete: options.allowDelete, source: options.source}));
};

export const hideFormModal = () => { store.dispatch(hide()); };
