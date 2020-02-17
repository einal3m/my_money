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
    it('shows the common account actions when accountType is not loan', () => {
      expect(actionButtons.type).toEqual(DropdownButton);
      expect(actionButtons.props.title).toEqual('...');

      const [view, edit, importHistory, empty] = actionButtons.props.children;
      expect(view.type).toEqual(MenuItem);
      expect(view.props.eventKey).toEqual('transactions');
      expect(view.props.children).toEqual('View Transactions');
      expect(edit.type).toEqual(MenuItem);
      expect(edit.props.eventKey).toEqual('edit');
      expect(edit.props.children).toEqual('Edit Account');
      expect(importHistory.type).toEqual(MenuItem);
      expect(importHistory.props.eventKey).toEqual('import-history');
      expect(importHistory.props.children).toEqual('Import History');
      expect(empty).toEqual(<div />);
    });

    it('also shows the loan report actions when accountType is loan', () => {
      const loanAccount = { id: 22, accountType: 'loan', name: 'myAccount' };
      const actionButtonsForLoan = shallowRenderer(<AccountActionButtons account={loanAccount} />);

      const [view, edit, importHistory, loanReport] = actionButtonsForLoan.props.children;
      expect(view.props.eventKey).toEqual('transactions');
      expect(edit.props.eventKey).toEqual('edit');
      expect(importHistory.props.eventKey).toEqual('import-history');
      expect(loanReport.type).toEqual(MenuItem);
      expect(loanReport.props.eventKey).toEqual('loan-report');
      expect(loanReport.props.children).toEqual('Loan Report');
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

    it('view import history, calls the routeToImportHistory action', () => {
      spyOn(routingActions, 'routeToImportHistory');
      actionButtons.props.onSelect('import-history');
      expect(routingActions.routeToImportHistory).toHaveBeenCalledWith(22);
    });

    it('view loan report, calls the routeToLoanReport action', () => {
      spyOn(routingActions, 'routeToLoanReport');
      actionButtons.props.onSelect('loan-report');
      expect(routingActions.routeToLoanReport).toHaveBeenCalledWith(22);
    });
  });
});
