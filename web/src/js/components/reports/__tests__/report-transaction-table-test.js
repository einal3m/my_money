import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import { ReportTransactionTableComponent as ReportTransactionTable } from '../report-transaction-table';
import TransactionModal from '../../transactions/transaction-modal';
import ReportTransactionRow from '../report-transaction-row';

describe('ReportTransactionTable', () => {
  const transactions = [{ id: 1, accountId: 2, amount: 1020, date: '2016-08-12' }];
  const groupedCategories = [
    {
      categoryType: { id: 1, name: 'Expense' },
      categories: [
        { id: 3, name: 'Cat', subcategories: [{ id: 5, name: 'Dog' }, { id: 6, name: 'Horse' }] },
        { id: 4, name: 'Mouse', subcategories: [{ id: 5, name: 'Cow' }] },
      ],
    },
  ];
  const accounts = [{ id: 2, name: 'My Account', bank: 'My Bank' }];

  describe('render', () => {
    it('renders nothing if not loaded', () => {
      const reportTable = shallowRenderer(
        <ReportTransactionTable
          loaded={false}
          transactions={transactions}
          accounts={accounts}
          groupedCategories={groupedCategories}
        />
      );

      const [title, table, modal] = reportTable.props.children;
      expect(title).toBeUndefined();
      expect(table).toBeUndefined();
      expect(modal.type).toEqual(TransactionModal);
    });

    it('has a title, table and modal', () => {
      const reportTable = shallowRenderer(
        <ReportTransactionTable
          loaded
          transactions={transactions}
          accounts={accounts}
          groupedCategories={groupedCategories}
        />
      );

      const [title, table, modal] = reportTable.props.children;

      expect(title.props.children).toEqual('Transactions');
      expect(modal.type).toEqual(TransactionModal);

      const [header, body] = table.props.children;
      expect(table.type).toEqual('table');
      expect(header.type).toEqual('thead');

      const rows = body.props.children;
      expect(rows.length).toEqual(1);
      expect(rows[0].type).toEqual(ReportTransactionRow);
      expect(rows[0].props.transaction).toEqual(transactions[0]);
      expect(rows[0].props.account).toEqual(accounts[0]);
      expect(rows[0].props.groupedCategories).toEqual(groupedCategories);
    });
  });
});
