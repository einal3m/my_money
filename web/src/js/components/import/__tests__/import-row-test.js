import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import ImportRow from '../import-row';
import Amount from '../../common/amount';

describe('ImportTable', () => {
  let importRow, transaction;
  beforeEach(() => {
    transaction = {date: '2016-12-19', memo: 'myMemo', amount: 250};
    importRow = shallowRenderer(<ImportRow transaction={transaction} />);
  });

  describe('render', () => {
    it('is a table row', () => {

      expect(importRow.type).toEqual('tr');

      expect(importRow.props.children[1].props.children).toEqual('19-Dec-2016');
      expect(importRow.props.children[2].props.children).toEqual('myMemo');
      expect(importRow.props.children[6].props.children.type).toEqual(Amount);
      expect(importRow.props.children[6].props.children.props.amount).toEqual(250);

      //<td>{this.renderDate(this.props.transaction.date)}</td>
      //<td>{this.props.transaction.memo}</td>
      //<td>{this.props.transaction.notes}</td>
      //<td>{this.props.transaction.categoryId}</td>
      //<td>{this.props.transaction.subcategoryId}</td>
      //<td className='currency'>{this.renderAmount(this.props.transaction.amount)}</td>

    });
  });
});
