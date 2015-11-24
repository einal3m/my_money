import React from 'react';
import NewAccountModal from '../new-account-modal';
import { Modal } from 'react-bootstrap';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import SavingsAccountForm from '../savings-account-form';
import ShareAccountForm from '../share-account-form';

describe('NewAccountModal', () => {
  let modal, onCloseSpy, onSaveSpy;
  beforeEach(() => {
    onCloseSpy = jasmine.createSpy('onClose');
    onSaveSpy = jasmine.createSpy('onSave');
  });
  describe('render', () => {
    beforeEach(() => {
      modal = shallowRenderer(<NewAccountModal show onClose={onCloseSpy} onSave={onSaveSpy} accountType='savings'/>);
    });

    it('has a title', () => {
      let [header, body, footer] = modal.props.children.props.children;
      expect(header.props.children.props.children).toEqual('New Savings Account');
    });

    it('has a savings form', () => {
      let [header, body, footer] = modal.props.children.props.children;
      expect(body.props.children.type).toEqual(SavingsAccountForm);
    });

    it('has a share form', () => {
      modal = shallowRenderer(<NewAccountModal show onClose={onCloseSpy} onSave={onSaveSpy} accountType='share'/>);
      let [header, body, footer] = modal.props.children.props.children;
      expect(body.props.children.type).toEqual(ShareAccountForm);
    });
  });

  describe('buttons', () => {
    beforeEach(() => {
      modal = TestUtils.renderIntoDocument(<NewAccountModal show onClose={onCloseSpy} onSave={onSaveSpy} accountType='savings'/>)
    });

    describe('cancel', () => {
      it('closes the modal', () => {
        let cancelButton = modal.refs.cancelButton;
        cancelButton.props.onClick();

        expect(onCloseSpy).toHaveBeenCalled();
      });
    });

    describe('save', () => {
      it('validates the form and saves the account', () => {
        let saveButton = modal.refs.saveButton;
        let newAccountForm = modal.refs.newAccountForm
        spyOn(newAccountForm, 'isValid').and.returnValue(true);
        spyOn(newAccountForm, 'getAccount').and.returnValue('account');
        saveButton.props.onClick();

        expect(onCloseSpy).toHaveBeenCalled();
        expect(onSaveSpy).toHaveBeenCalledWith('account');
      });

      it('doesnt save if the form is invalid', () => {
        let saveButton = modal.refs.saveButton;
        let newAccountForm = modal.refs.newAccountForm
        spyOn(newAccountForm, 'isValid').and.returnValue(false);
        saveButton.props.onClick();

        expect(onCloseSpy).not.toHaveBeenCalled();
        expect(onSaveSpy).not.toHaveBeenCalled();
      });
    });
  });
});
