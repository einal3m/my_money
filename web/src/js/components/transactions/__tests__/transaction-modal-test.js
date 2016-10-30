import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import { TransactionModalComponent as TransactionModal } from '../transaction-modal';
import FormModal from '../../common/form-modal';
import BankTransactionForm from '../bank-transaction-form';
import * as transactionActions from '../../../actions/transaction-actions';

describe('TransactionModal', () => {
  const category1 = { id: 1, name: 'One', subcategories: [] };
  const category2 = { id: 2, name: 'Two', subcategories: [{ id: 45, name: 'Four', categoryId: 2 }] };
  const category3 = { id: 3, name: 'Three', subcategories: [] };

  const categoryType1 = { id: 1, code: 'income', name: 'Income' };
  const categoryType2 = { id: 2, code: 'expense', name: 'Expense' };
  const groupedCategories = [
    { categoryType: categoryType1, categories: [category1, category2] },
    { categoryType: categoryType2, categories: [category3] },
  ];

  describe('render', () => {
    it('does not display modal if show is false', () => {
      const transactionModal = shallowRenderer(
        <TransactionModal show={false} groupedCategories={groupedCategories} />
      );

      expect(transactionModal.type).toEqual('div');
      expect(transactionModal.props.children).toEqual(undefined);
    });

    it('shows bank transaction form', () => {
      const transactionModal = shallowRenderer(
        <TransactionModal
          show
          groupedCategories={groupedCategories}
          modelType="Transaction"
          model={{ id: 34 }}
          allowDelete
        />
      );

      expect(transactionModal.type).toEqual(FormModal);
      expect(transactionModal.props.show).toEqual(true);
      expect(transactionModal.props.modelName).toEqual('Transaction');
      expect(transactionModal.props.allowDelete).toEqual(true);

      const transactionForm = transactionModal.props.children;
      expect(transactionForm.type).toEqual(BankTransactionForm);
      expect(transactionForm.props.transaction).toEqual({ id: 34 });
      expect(transactionForm.props.groupedCategories).toEqual(groupedCategories);
    });
  });

  describe('events', () => {
    it('saves transaction', () => {
      spyOn(transactionActions, 'saveTransaction');

      const transactionModal = shallowRenderer(
        <TransactionModal
          show
          groupedCategories={groupedCategories}
          modelType="Transaction"
          model={{ id: 34 }}
          allowDelete
        />
      );

      transactionModal.props.onSave({ id: 34 });
      expect(transactionActions.saveTransaction).toHaveBeenCalledWith({ id: 34 });
    });

    it('deletes transaction', () => {
      spyOn(transactionActions, 'deleteTransaction');

      const transactionModal = shallowRenderer(
        <TransactionModal
          show
          groupedCategories={groupedCategories}
          modelType="Transaction"
          model={{ id: 34 }}
          allowDelete
        />
      );

      transactionModal.props.onDelete();
      expect(transactionActions.deleteTransaction).toHaveBeenCalledWith({ id: 34 });
    });
  });
});
