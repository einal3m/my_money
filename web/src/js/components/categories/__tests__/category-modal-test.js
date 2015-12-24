import React from 'react';
import CategoryModal from '../category-modal';
import { fromJS } from 'immutable';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import CategoryForm from '../category-form';

describe('CategoryModal', () => {
  let modal, onCloseSpy, onSaveSpy, categoryType;
  beforeEach(() => {
    categoryType = fromJS({id: 1, code: 'income', name: 'Income'});
    onCloseSpy = jasmine.createSpy('onClose');
    onSaveSpy = jasmine.createSpy('onSave');
  });

  describe('render', () => {
    beforeEach(() => {
      modal = shallowRenderer(<CategoryModal show onClose={onCloseSpy} onSave={onSaveSpy} categoryType={categoryType} />);
    });

    it('has a title', () => {
      let [header, body, footer] = modal.props.children.props.children;
      expect(header.props.children.props.children).toEqual('New Income Category');
    });

    it('has a form', () => {
      let [header, body, footer] = modal.props.children.props.children;
      expect(body.props.children.type).toEqual(CategoryForm);
      expect(body.props.children.props.categoryType).toEqual(categoryType);
    });
  });

  describe('buttons', () => {
    beforeEach(() => {
      modal = TestUtils.renderIntoDocument(<CategoryModal show onClose={onCloseSpy} onSave={onSaveSpy} categoryType={categoryType}/>)
    });

    describe('cancel', () => {
      it('closes the modal', () => {
        let cancelButton = modal.refs.cancelButton;
        cancelButton.props.onClick();

        expect(onCloseSpy).toHaveBeenCalled();
      });
    });

    describe('save', () => {
      let saveButton, categoryForm;
      beforeEach(() => {
        saveButton = modal.refs.saveButton;
        categoryForm = modal.refs.categoryForm
      });
      it('validates the form and saves the category', () => {
        spyOn(categoryForm, 'isValid').and.returnValue(true);
        spyOn(categoryForm, 'getCategory').and.returnValue('category');
        saveButton.props.onClick();

        expect(onCloseSpy).toHaveBeenCalled();
        expect(onSaveSpy).toHaveBeenCalledWith('category');
      });

      it('doesnt save if the form is invalid', () => {
        spyOn(categoryForm, 'isValid').and.returnValue(false);
        saveButton.props.onClick();

        expect(onCloseSpy).not.toHaveBeenCalled();
        expect(onSaveSpy).not.toHaveBeenCalled();
      });
    });
  });
});
