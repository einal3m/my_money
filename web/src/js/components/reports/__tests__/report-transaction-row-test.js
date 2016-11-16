import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import ReportTransactionRow from '../report-transaction-row';
import Amount from '../../common/amount';
import Date from '../../common/date';
import * as formActions from '../../../actions/form-actions';

describe('ReportTransactionRow', () => {
  const transaction = {
    id: 1,
    accountId: 2,
    categoryId: 4,
    subcategoryId: 5,
    amount: 1020,
    date: '2016-08-12',
    memo: 'My Memo',
    notes: 'My Notes',
  };
  const groupedCategories = [
    {
      categoryType: { id: 1, name: 'Expense' },
      categories: [
        { id: 3, name: 'Cat', subcategories: [{ id: 5, name: 'Dog' }, { id: 6, name: 'Horse' }] },
        { id: 4, name: 'Mouse', subcategories: [{ id: 5, name: 'Cow' }] },
      ],
    },
  ];
  const account = { id: 2, name: 'My Account', bank: 'My Bank' };

  describe('render', () => {
    it('renders a table row with date, account, description and amount', () => {
      const row = shallowRenderer(
        <ReportTransactionRow
          transaction={transaction}
          account={account}
          groupedCategories={groupedCategories}
        />
      );

      const [date, accountAndBank, description, amount] = row.props.children;
      expect(date.props.children.type).toEqual(Date);
      expect(date.props.children.props.date).toEqual('2016-08-12');

      const accountName = accountAndBank.props.children.props.children[0];
      const bankName = accountAndBank.props.children.props.children[2];
      expect(accountName).toEqual('My Account');
      expect(bankName).toEqual('My Bank');

      const [memoAndNotes, categoryAndSubcategory] = description.props.children;
      expect(memoAndNotes.props.children).toEqual('My Memo/My Notes');
      expect(categoryAndSubcategory.props.children).toEqual('Mouse/Cow');

      expect(amount.props.children.type).toEqual(Amount);
      expect(amount.props.children.props.amount).toEqual(1020);
    });
  });

  describe('events', () => {
    it('click row calls show form modal', () => {
      const row = shallowRenderer(
        <ReportTransactionRow
          transaction={transaction}
          account={account}
          groupedCategories={groupedCategories}
        />
      );
      spyOn(formActions, 'showFormModal');

      row.props.onClick();

      expect(formActions.showFormModal).toHaveBeenCalledWith('Transaction', transaction, true);
    });
  });
});
