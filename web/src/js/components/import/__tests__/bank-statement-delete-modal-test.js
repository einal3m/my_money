import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from 'react-bootstrap';
import BankStatementDeleteModal from '../bank-statement-delete-modal';
import Button from '../../common/controls/button';
import * as bankStatementActions from '../../../actions/bank-statement-actions';

describe('BankStatementDeleteModal', () => {
  let modal;
  const bankStatement = {
    id: 123,
    accountId: 2,
    date: '2001-10-19',
    fileName: 'myFile.ofx',
    transactionCount: 6,
  };

  describe('render', () => {
    it('has a title, text and buttons', () => {
      modal = shallow(<BankStatementDeleteModal bankStatement={bankStatement} />);

      expect(modal.type()).toEqual(Modal);

      const header = modal.find(Modal.Title);
      expect(header.props().children).toEqual('Delete Import');

      const body = modal.find(Modal.Body);
      expect(body.childAt(0).text()).toMatch(/6 transactions/);

      const footer = modal.find(Modal.Footer);
      const [cancelButton, deleteButton] = footer.children();

      expect(cancelButton.type).toEqual(Button);
      expect(cancelButton.props.children).toEqual('Cancel');
      expect(deleteButton.type).toEqual(Button);
      expect(deleteButton.props.children).toEqual('Yes, Delete');
    });

    it('is an empty div when bankStatement is null', () => {
      modal = shallow(<BankStatementDeleteModal />);

      expect(modal.equals(<div />)).toBeTruthy();
    });
  });

  describe('events', () => {
    it('cancel button calls cancelBankStatementDelete action', () => {
      spyOn(bankStatementActions, 'cancelDeleteBankStatement');
      modal = shallow(<BankStatementDeleteModal bankStatement={bankStatement} />);
      const cancelButton = modal.find(Button).at(0);

      cancelButton.prop('onClick')();

      expect(bankStatementActions.cancelDeleteBankStatement).toHaveBeenCalled();
    });

    it('delete button calls deleteBankStatement action', () => {
      spyOn(bankStatementActions, 'deleteBankStatement');
      modal = shallow(<BankStatementDeleteModal bankStatement={bankStatement} />);
      const deleteButton = modal.find(Button).at(1);

      deleteButton.prop('onClick')();

      expect(bankStatementActions.deleteBankStatement).toHaveBeenCalledWith(bankStatement);
    });
  });
});
