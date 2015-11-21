import React from 'react';
import NewAccountModal from '../new-account-modal';
import { Modal } from 'react-bootstrap';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';

describe('NewAccountModal', () => {
  let modal, onCloseSpy;
  describe('render', () => {
    beforeEach(() => {
      onCloseSpy = jasmine.createSpy('onClose');
      modal = shallowRenderer(<NewAccountModal onClose={onCloseSpy}/>);
    });

    it('has a title', () => {
      let [header, body, footer] = modal.props.children.props.children;
      expect(header.props.children.props.children).toEqual('New Account');
    });

    it('has a form', () => {

    });
  });

  describe('buttons', () => {
    beforeEach(() => {
      onCloseSpy = jasmine.createSpy('onClose');
      modal = TestUtils.renderIntoDocument(<NewAccountModal show onClose={onCloseSpy}/>)
    });

    describe('cancel', () => {
      it('closes the modal', () => {
        var cancelButton = modal.refs.cancelButton;
        cancelButton.props.onClick();

        expect(onCloseSpy).toHaveBeenCalled();
      });
    });

    describe('save', () => {
      it('validates the form and saves the account', () => {
        var saveButton = modal.refs.saveButton;
        saveButton.props.onClick();

        expect(onCloseSpy).toHaveBeenCalled();
      });

      // it('doesnt save if the form is invalid', () => {
      //   var saveButton = modal.refs.saveButton;
      //   saveButton.props.onClick();

      //   expect(onCloseSpy).not.toHaveBeenCalled();
      // });
    });
  });
});
