import React from 'react';
import { MenuItem, DropdownButton } from 'react-bootstrap';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import AccountActionButtons from '../account-action-buttons';
import * as routingActions from '../../../actions/routing-actions';
import * as formActions from '../../../actions/form-actions';

describe('AccountActionButtons', () => {
  const account = { id: 22, accountType: 'savings', name: 'myAccount', bank: 'myBank', currentBalance: 6070 };
  const actionButtons = shallowRenderer(<AccountActionButtons account={account} />);

  describe('render', () => {
    it('has the account information', () => {
      expect(actionButtons.type).toEqual(DropdownButton);
      expect(actionButtons.props.title).toEqual('...');

      const [view, edit] = actionButtons.props.children;
      expect(view.type).toEqual(MenuItem);
      expect(view.props.eventKey).toEqual('transactions');
      expect(view.props.children).toEqual('View Transactions');
      expect(edit.type).toEqual(MenuItem);
      expect(edit.props.eventKey).toEqual('edit');
      expect(edit.props.children).toEqual('Edit Account');
    });
  });

  describe('actions', () => {
    it('view transactions, calls the routeToTransactions action', () => {
      spyOn(routingActions, 'routeToTransactions');
      actionButtons.props.onSelect('transactions');
      expect(routingActions.routeToTransactions).toHaveBeenCalledWith(22);
    });

    it('edit accounts, opens the form modal', () => {
      spyOn(formActions, 'showFormModal');
      actionButtons.props.onSelect('edit');
      expect(formActions.showFormModal).toHaveBeenCalledWith('Savings Account', account, { allowDelete: true });
    });
  });
});
