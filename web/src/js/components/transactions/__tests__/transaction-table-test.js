import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import { TransactionTable } from '../transaction-table';
import TransactionRow from '../transaction-row';
import { fromJS } from 'immutable';
import { Table } from 'react-bootstrap';

describe('TransactionTable', () => {
  let transactionTable;

  describe('render', () => {
    let transactions, account;
    beforeEach(() => {
      transactions = fromJS([{id: 1}]);
      account = fromJS({name: 'my Account'});
    });

    it('when criteria not loaded', () => {
      transactionTable = shallowRenderer(
        <TransactionTable searchCriteriaLoaded={false} transactions={[]} account={null} />
      );

      expect(transactionTable.props.children[0]).toBeUndefined();
      expect(transactionTable.props.children[1]).toBeUndefined();
    });

    it('when criteria loaded and no transactions', () => {
      transactionTable = shallowRenderer(
        <TransactionTable searchCriteriaLoaded transactions={fromJS([])} account={account} />
      );

      let [title, message] = transactionTable.props.children;
      expect(title.props.children).toEqual(['Transactions for ', 'my Account']);
      expect(message.props.children).toMatch('No transactions');
    });

    it('when criteria loaded and has transactions', () => {
      transactionTable = shallowRenderer(
        <TransactionTable searchCriteriaLoaded transactions={transactions} account={account} />
      );

      let [title, table] = transactionTable.props.children;
      expect(title.props.children).toEqual(['Transactions for ', 'my Account']);

      let [thead, tbody] = table.props.children;
      expect(table.type).toEqual(Table);

      let [date, description, amount, balance] = thead.props.children.props.children;
      expect(date.props.children).toEqual('date');
      expect(description.props.children).toEqual('description');
      expect(amount.props.children).toEqual('amount');
      expect(balance.props.children).toEqual('balance');

      expect(tbody.props.children[0].type).toEqual(TransactionRow);
      expect(tbody.props.children[0].props.transaction).toEqual(transactions.get(0));
    });
  });
});
