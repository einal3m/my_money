import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import { fromJS } from 'immutable';
import TransactionRow from '../transaction-row';
import Amount from '../../common/amount';
import Date from '../../common/date';

describe('TransactionRow', () => {
  let transaction, transactionRow, groupedCategories, subcategories;
  beforeEach(() => {
    transaction = {
      id: 22,
      date: '2015-12-19',
      amount: 300,
      notes: 'This is a note',
      memo: 'This is a memo',
      balance: 6070
    };
    groupedCategories = [{categoryType: 'Income'}];
    subcategories = [{id: 1}];
  });

  describe('render', () => {
    it('transaction attributes', () => {
      transactionRow = shallowRenderer(<TransactionRow transaction={transaction}
                                                       groupedCategories={groupedCategories}
                                                       subcategories={subcategories}
      />);
      let [date, description, amountCell, balanceCell] = transactionRow.props.children;

      expect(transactionRow.type).toEqual('tr');
      expect(date.props.children.type).toEqual(Date);
      expect(date.props.children.props.date).toEqual('2015-12-19');
      expect(description.props.children).toEqual('This is a memo/This is a note');
      expect(amountCell.props.children.type).toEqual(Amount);
      expect(amountCell.props.children.props.amount).toEqual(300);
    });
  });
});
