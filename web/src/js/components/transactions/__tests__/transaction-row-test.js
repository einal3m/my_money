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
      let [date, description, amountCell, balanceCell] = transactionRow.props.children;
      let [sign, space, dollars, dot, cents] = amountCell.props.children.props.children;

      expect(transactionRow.type).toEqual('tr');
      expect(date.props.children).toEqual('19-Dec-2015');
      expect(description.props.children).toEqual('This is a memo/This is a note');

      expect(sign.props.children).toEqual('+');
      expect(dollars.props.children).toEqual('3');
      expect(cents.props.children).toEqual('00');

      [dollars, dot, cents] = balanceCell.props.children.props.children;
      expect(dollars.props.children).toEqual('$60');
      expect(cents.props.children).toEqual('70');
    });

    it('with negative amounts', () => {
      transaction = transaction.set('amount', -300);
      transaction = transaction.set('balance', -569);
      transactionRow = shallowRenderer(<TransactionRow transaction={transaction} />);
      let [date, description, amountCell, balanceCell] = transactionRow.props.children;
      let [sign, space, dollars, dot, cents] = amountCell.props.children.props.children;

      expect(sign.props.children).toEqual('-');
      expect(dollars.props.children).toEqual('3');
      expect(cents.props.children).toEqual('00');

      let [dollars, dot, cents, bracket] = balanceCell.props.children.props.children;
      expect(dollars.props.children).toEqual('$(60');
      expect(cents.props.children).toEqual('70');
      expect(bracket.props.children).toEqual(')');
    });
  });
});
