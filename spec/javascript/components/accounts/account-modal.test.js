import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import { AccountModalComponent as AccountModal } from '../account-modal';
import FormModal from '../../common/form-modal';
import SavingsAccountForm from '../savings-account-form';
import ShareAccountForm from '../share-account-form';
import * as accountActions from '../../../actions/account-actions';

describe('AccountModal', () => {
  it('does not display modal if show is false', () => {
    const accountModal = shallowRenderer(<AccountModal show={false} />);

    expect(accountModal.type).toEqual('div');
    expect(accountModal.props.children).toEqual(undefined);
  });

  it('shows savings form if modelType is Savings Account', () => {
    const accountModal = shallowRenderer(
      <AccountModal
        show
        modelType="Savings Account"
        model={{ id: 34 }}
        allowDelete
      />
    );

    expect(accountModal.type).toEqual(FormModal);
    expect(accountModal.props.show).toEqual(true);
    expect(accountModal.props.modelName).toEqual('Savings Account');
    expect(accountModal.props.allowDelete).toEqual(true);

    const accountForm = accountModal.props.children;
    expect(accountForm.type).toEqual(SavingsAccountForm);
    expect(accountForm.props.account).toEqual({ id: 34 });
  });

  it('shows share form if modelType is Share Account', () => {
    const accountModal = shallowRenderer(
      <AccountModal
        show
        modelType="Share Account"
        model={{ id: 34 }}
        allowDelete={false}
      />
    );

    expect(accountModal.type).toEqual(FormModal);
    expect(accountModal.props.show).toEqual(true);
    expect(accountModal.props.modelName).toEqual('Share Account');
    expect(accountModal.props.allowDelete).toEqual(false);

    const accountForm = accountModal.props.children;
    expect(accountForm.type).toEqual(ShareAccountForm);
    expect(accountForm.props.account).toEqual({ id: 34 });
  });

  describe('events', () => {
    it('saves the account', () => {
      spyOn(accountActions, 'saveAccount');

      const accountModal = shallowRenderer(
        <AccountModal
          show
          modelType="Savings Account"
          model={{ id: 34 }}
          allowDelete
        />
      );

      accountModal.props.onSave({ id: 34 });
      expect(accountActions.saveAccount).toHaveBeenCalledWith({ id: 34 });
    });

    it('deletes the account', () => {
      spyOn(accountActions, 'deleteAccount');

      const accountModal = shallowRenderer(
        <AccountModal
          show
          modelType="Savings Account"
          model={{ id: 34 }}
          allowDelete
        />
      );

      accountModal.props.onDelete(34);
      expect(accountActions.deleteAccount).toHaveBeenCalledWith(34);
    });
  });
});
