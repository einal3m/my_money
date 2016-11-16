import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TransactionRow from '../transaction-row';
import Amount from '../../common/amount';
import Balance from '../../common/balance';
import Date from '../../common/date';
import * as formActions from '../../../actions/form-actions';

describe('TransactionRow', () => {
  const transaction = {
    id: 22,
    date: '2015-12-19',
    amount: 300,
    notes: 'This is a note',
    memo: 'This is a memo',
    balance: 6070,
    categoryId: 3,
    subcategoryId: 5,
  };
  let transactionRow;
  const groupedCategories = [{
    categoryType: 'Income',
    categories: [{
      id: 3,
      name: 'My Category',
      subcategories: [{ id: 5, name: 'My Subcategory' }],
    }],
  }];

  describe('render', () => {
    it('transaction attributes', () => {
      transactionRow = shallowRenderer(
        <TransactionRow transaction={transaction} groupedCategories={groupedCategories} />
      );
      const [date, description, amountCell, balanceCell] = transactionRow.props.children;

      const [memoNotes, category] = description.props.children;

      expect(transactionRow.type).toEqual('tr');
      expect(date.props.children.type).toEqual(Date);
      expect(date.props.children.props.date).toEqual('2015-12-19');
      expect(memoNotes.props.children).toEqual('This is a memo/This is a note');
      expect(category.props.children).toEqual('My Category/My Subcategory');
      expect(amountCell.props.children.type).toEqual(Amount);
      expect(amountCell.props.children.props.amount).toEqual(300);
      expect(balanceCell.props.children.type).toEqual(Balance);
      expect(balanceCell.props.children.props.balance).toEqual(6070);
    });
  });

  describe('events', () => {
    it('click row opens edit transaction modal', () => {
      spyOn(formActions, 'showFormModal');
      transactionRow = shallowRenderer(
        <TransactionRow transaction={transaction} groupedCategories={groupedCategories} />
      );

      transactionRow.props.onClick();

      expect(formActions.showFormModal).toHaveBeenCalledWith('Transaction', transaction, { allowDelete: true });
    });
  });
});
