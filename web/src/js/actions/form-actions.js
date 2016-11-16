import store from '../stores/store';

export const SHOW_FORM_MODAL = 'SHOW_FORM_MODAL';
export const showFormModal = (modelType, model, options) => {
  store.dispatch({ type: SHOW_FORM_MODAL, modelType, model, allowDelete: options.allowDelete });
};

export const HIDE_FORM_MODAL = 'HIDE_FORM_MODAL';
export const hideFormModal = () => { store.dispatch({ type: HIDE_FORM_MODAL }); };
