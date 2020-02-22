import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { Modal } from 'react-bootstrap';
import { shallow } from 'enzyme';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import FormModal from '../form-modal';
import * as formActions from '../../../actions/form-actions';

describe('FormModal', () => {
  const modelName = 'ModelName';
  let onSaveSpy;
  let onDeleteSpy;
  const child = <div id="testChild" />;
  let modal;

  beforeEach(() => {
    onSaveSpy = jasmine.createSpy('onSaveSpy');
    onDeleteSpy = jasmine.createSpy('onDeleteSpy');
  });

  describe('render', () => {
    beforeEach(() => {
      modal = shallowRenderer(
        <FormModal show allowDelete modelName={modelName} onSave={onSaveSpy}>{child}</FormModal>
      );
    });

    it('it is a modal and has a title', () => {
      expect(modal.type).toEqual(Modal);

      const header = modal.props.children[0];

      expect(header.type).toEqual(Modal.Header);
      expect(header.props.children.type).toEqual(Modal.Title);
      expect(header.props.children.props.children).toEqual('ModelName');
    });

    it('has a footer with cancel and save buttons', () => {
      const footer = modal.props.children[2];

      expect(footer.type).toEqual(Modal.Footer);

      const [deleteButton, cancelButton, saveButton] = footer.props.children;

      expect(deleteButton.props.children).toEqual('Delete');
      expect(cancelButton.props.children).toEqual('Cancel');
      expect(cancelButton.props.onClick).toEqual(formActions.hideFormModal);
      expect(saveButton.props.children).toEqual('Save');
    });

    it('has no delete button if allowDelete not set', () => {
      modal = shallowRenderer(
        <FormModal
          show
          allowDelete={false}
          modelName={modelName}
          onSave={onSaveSpy}
        >{child}</FormModal>
      );
      const footer = modal.props.children[2];
      const [deleteButton, cancelButton, saveButton] = footer.props.children;
      expect(deleteButton).toBeUndefined();
      expect(cancelButton.props.children).toEqual('Cancel');
      expect(saveButton.props.children).toEqual('Save');
    });
  });

  describe('events', () => {
    beforeEach(() => {
      modal = TestUtils.renderIntoDocument(
        <FormModal
          show
          modelName={modelName}
          allowDelete
          onSave={onSaveSpy}
          onDelete={onDeleteSpy}
        >{child}</FormModal>
      );
      modal.form = jasmine.createSpyObj('form', ['isValid', 'getModel']);
    });

    describe('onSave', () => {
      it('calls the onSave prop if form is valid', () => {
        modal.form.isValid.and.returnValue(true);
        modal.form.getModel.and.returnValue({ id: 13 });
        modal.onSave();

        expect(onSaveSpy).toHaveBeenCalledWith({ id: 13 });
      });
      it('does not call the onSave prop if form is invalid', () => {
        modal.form.isValid.and.returnValue(false);
        modal.onSave();

        expect(onSaveSpy).not.toHaveBeenCalled();
      });
    });

    describe('onDelete success', () => {
      xit('calls the onDelete prop with the form models id', () => {
        modal.deleteButton1.props.onClick();

        // need to reset form as modal has re-rendered.
        modal.form = jasmine.createSpyObj('form', ['getModel']);
        modal.form.getModel.and.returnValue({ id: 13 });
        modal.deleteButton2.props.onClick();

        expect(onDeleteSpy).toHaveBeenCalledWith(13);
      });
    });

    describe('onDelete cancel', () => {
      it('doesnt call the onDelete prop', () => {
        modal = shallow(
          <FormModal
            show
            modelName={modelName}
            allowDelete
            onSave={onSaveSpy}
            onDelete={onDeleteSpy}
          >{child}</FormModal>
        );

        const deleteButton = modal.find({ children: 'Delete' });
        deleteButton.prop('onClick')();

        const cancelDeleteButton = modal.find({ children: 'Cancel' });
        cancelDeleteButton.prop('onClick')();

        expect(onDeleteSpy).not.toHaveBeenCalled();
      });
    });
  });
});
