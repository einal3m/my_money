import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import { fromJS } from 'immutable';
import TransactionRow from '../transaction-row';
import Amount from '../../common/amount';

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
    it('transaction attributes', () => {
      transactionRow = shallowRenderer(<TransactionRow transaction={transaction} />);
      let [date, description, amountCell, balanceCell] = transactionRow.props.children;

      expect(transactionRow.type).toEqual('tr');
      expect(date.props.children).toEqual('19-Dec-2015');
      expect(description.props.children).toEqual('This is a memo/This is a note');
      expect(amountCell.props.children.type).toEqual(Amount);
      expect(amountCell.props.children.props.amount).toEqual(300);
    });
  });
});
