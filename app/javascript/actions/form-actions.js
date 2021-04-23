import store from '../stores/store';
import {
  SHOW_FORM_MODAL,
  HIDE_FORM_MODAL,
} from 'actions/action-types';

export const showFormModal = (modelType, model, options) => {
  store.dispatch({ type: SHOW_FORM_MODAL, modelType, model, allowDelete: options.allowDelete, source: options.source });
};

export const hideFormModal = () => { store.dispatch({ type: HIDE_FORM_MODAL }); };
