import store from '../stores/store';

export const SOURCE_CATEGORY_REPORT = 'SOURCE_CATEGORY_REPORT';
export const SOURCE_SUBCATEGORY_REPORT = 'SOURCE_SUBCATEGORY_REPORT';

export const SHOW_FORM_MODAL = 'SHOW_FORM_MODAL';
export const showFormModal = (modelType, model, options) => {
  store.dispatch({ type: SHOW_FORM_MODAL, modelType, model, allowDelete: options.allowDelete, source: options.source });
};

export const HIDE_FORM_MODAL = 'HIDE_FORM_MODAL';
export const hideFormModal = () => { store.dispatch({ type: HIDE_FORM_MODAL }); };
