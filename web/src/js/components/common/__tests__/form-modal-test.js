import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import FormModal from '../form-modal';
import { Modal, Button } from 'react-bootstrap';


describe('FormModal', () => {
  let modelName, onCloseSpy, onSaveSpy, modal, child;
  beforeEach(() => {
    modelName = 'ModelName';
    onCloseSpy = jasmine.createSpy('onCloseSpy');
    onSaveSpy = jasmine.createSpy('onSaveSpy');
    child = <div id='testChild' />;
  });
  describe('render', () => {
    beforeEach(() => {
      modal = shallowRenderer(<FormModal show modelName={modelName} onClose={onCloseSpy} onSave={onSaveSpy}>{child}</FormModal>);
    });

    it('it is a modal and has a title', () => {
      expect(modal.type).toEqual(Modal);

      let header = modal.props.children[0];

      expect(header.type).toEqual(Modal.Header);
      expect(header.props.children.type).toEqual(Modal.Title);
      expect(header.props.children.props.children).toEqual('ModelName');
    });

    it('adds a form ref to the child', () => {
      let body = modal.props.children[1];

      expect(body.props.children.props.id).toEqual('testChild');
      expect(body.props.children.ref).toEqual('form');
    });

    it('has a footer with cancel and save buttons', () => {
      let footer = modal.props.children[2];

      expect(footer.type).toEqual(Modal.Footer);

      let [cancelButton, saveButton] = footer.props.children;

      expect(cancelButton.props.children).toEqual('Cancel');
      expect(cancelButton.props.onClick).toEqual(onCloseSpy);
      expect(saveButton.props.children).toEqual('Save');
    });
  });

  describe('onSave', () => {
    beforeEach(() => {
      modal = TestUtils.renderIntoDocument(
        <FormModal show modelName={modelName} onClose={onCloseSpy} onSave={onSaveSpy}>{child}</FormModal>
      );
      modal.refs.form = jasmine.createSpyObj('form', ['isValid', 'getModel']);
    });

    it('calls the onSave prop if form is valid', () => {
      modal.refs.form.isValid.and.returnValue(true);
      modal.refs.form.getModel.and.returnValue('model');
      modal.onSave();

      expect(onSaveSpy).toHaveBeenCalledWith('model');
    });
    it('does not call the onSave prop if form is valid', () => {
      modal.refs.form.isValid.and.returnValue(false);
      modal.onSave();

      expect(onSaveSpy).not.toHaveBeenCalled();
    });
  });
});
