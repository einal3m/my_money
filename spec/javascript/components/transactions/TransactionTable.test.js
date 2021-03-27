import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import { TransactionTableComponent as TransactionTable } from '../transaction-table';
import TransactionRow from '../transaction-row';

describe('TransactionTable', () => {
  let transactionTable;

  describe('render', () => {
    let transactions;
    let account;
    let groupedCategories;

    beforeEach(() => {
      transactions = [{ id: 1, accountId: 2, date: '2015-12-19', amount: 300, balance: 400 }];
      account = { id: 2, name: 'my Account' };
      groupedCategories = [{ categoryType: 'Income' }];
    });

    it('when criteria not loaded', () => {
      transactionTable = shallowRenderer(
        <TransactionTable
          searchCriteriaLoaded={false}
          transactions={[]}
          account={null}
          accounts={[]}
          groupedCategories={groupedCategories}
        />
      );

      expect(transactionTable.props.children[0]).toBeUndefined();
      expect(transactionTable.props.children[1]).toBeUndefined();
    });

    it('when criteria loaded and no transactions', () => {
      transactionTable = shallowRenderer(
        <TransactionTable
          searchCriteriaLoaded
          transactions={[]}
          account={account}
          accounts={[account]}
          groupedCategories={groupedCategories}
        />
      );

      const [title, message] = transactionTable.props.children;
      expect(title.props.children).toEqual(['Transactions for ', 'my Account']);
      expect(message.props.children).toMatch('No transactions');
    });

    it('when criteria loaded and has transactions', () => {
      transactionTable = shallowRenderer(
        <TransactionTable
          searchCriteriaLoaded
          transactions={transactions}
          account={account}
          accounts={[account]}
          groupedCategories={groupedCategories}
        />
      );

      const [title, table] = transactionTable.props.children;
      expect(title.props.children).toEqual(['Transactions for ', 'my Account']);

      const [thead, tbody] = table.props.children;
      expect(table.type).toEqual('table');

      const [date, description, amount, balance] = thead.props.children.props.children;
      expect(date.props.children).toEqual('date');
      expect(description.props.children).toEqual('description');
      expect(amount.props.children).toEqual('amount');
      expect(balance.props.children).toEqual('balance');

      expect(tbody.props.children[0].type).toEqual(TransactionRow);
      expect(tbody.props.children[0].props.transaction).toEqual(transactions[0]);
    });
  });
});
