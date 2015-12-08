import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import { fromJS } from 'immutable';
import TransactionRow from '../transaction-row';

describe('TransactionRow', () => {
  let transaction, transactionRow;
  beforeEach(() => {
    transaction = fromJS({
      id: 22,
      date: '2015-12-19',
      amount: 300,
      notes: 'This is a note',
      memo: 'This is a memo',
      balance: 6070
    });
  });

  describe('render', () => {
    it('with positive amount', () => {
      transactionRow = shallowRenderer(<TransactionRow transaction={transaction} />);
      let [date, description, moneyIn, moneyOut, balance] = transactionRow.props.children;

      expect(transactionRow.type).toEqual('tr');
      expect(date.props.children).toEqual('19-Dec-2015');
      expect(description.props.children).toEqual('This is a memo/This is a note');
      expect(moneyIn.props.children).toEqual('3.00');
      expect(moneyOut.props.children).toBeUndefined();
      expect(balance.props.children).toEqual('$ 60.70');
    });

    it('with negative amounts', () => {
      transaction = transaction.set('amount', -300);
      transaction = transaction.set('balance', -569);
      transactionRow = shallowRenderer(<TransactionRow transaction={transaction} />);
      let [date, description, moneyIn, moneyOut, balance] = transactionRow.props.children;

      expect(moneyIn.props.children).toBeUndefined();
      expect(moneyOut.props.children).toEqual('3.00');
      expect(balance.props.children).toEqual('$ (5.69)');
    });
  });
});
