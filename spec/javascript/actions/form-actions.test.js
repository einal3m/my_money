import store from 'stores/store';
import {
  SHOW_FORM_MODAL,
  HIDE_FORM_MODAL,
  SOURCE_CATEGORY_REPORT,
  showFormModal,
  hideFormModal,
} from 'actions/form-actions';

describe('FormActions', () => {
  let dispatcherSpy;
  beforeEach(() => {
    dispatcherSpy = spyOn(store, 'dispatch');
  });

  describe('showForm', () => {
    it('dispatches the action to the store', () => {
      showFormModal('Transaction', 'model', { allowDelete: true, source: SOURCE_CATEGORY_REPORT });
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: SHOW_FORM_MODAL,
        modelType: 'Transaction',
        model: 'model',
        allowDelete: true,
        source: SOURCE_CATEGORY_REPORT,
      });
    });
  });

  describe('hideFormModal', () => {
    it('dispatches the action to the store', () => {
      hideFormModal();
      expect(dispatcherSpy).toHaveBeenCalledWith({
        type: HIDE_FORM_MODAL,
      });
    });
  });
});
