import React from 'react';
import { shallow } from 'enzyme';
import BankStatementRow from '../bank-statement-row';
import Button from '../../common/controls/button';
import Date from '../../common/date';
import * as bankStatementActions from '../../../actions/bank-statement-actions';

describe('BankStatementRow', () => {
  let bankStatementRow;
  const bankStatement = {
    id: 123,
    accountId: 2,
    date: '2001-10-19',
    fileName: 'myFile.ofx',
    transactionCount: 6,
  };

  describe('render', () => {
    it('is a table row with bank statement details', () => {
      bankStatementRow = shallow(<BankStatementRow bankStatement={bankStatement} />);

      expect(bankStatementRow.type()).toEqual('tr');

      const [date, fileName, count, button] = bankStatementRow.children();

      expect(date.type).toEqual('td');
      expect(date.props.children.type).toEqual(Date);
      expect(date.props.children.props.date).toEqual('2001-10-19');

      expect(fileName.type).toEqual('td');
      expect(fileName.props.children).toEqual('myFile.ofx');

      expect(count.type).toEqual('td');
      expect(count.props.children).toEqual(6);

      expect(button.type).toEqual('td');
      expect(button.props.children.type).toEqual(Button);
      expect(button.props.children.props.children).toEqual('Delete');
    });
  });

  describe('delete button onClick', () => {
    it('calls the onDelete prop', () => {
      spyOn(bankStatementActions, 'confirmDeleteBankStatement');
      bankStatementRow = shallow(<BankStatementRow bankStatement={bankStatement} />);

      const button = bankStatementRow.find(Button);
      button.prop('onClick')();

      expect(bankStatementActions.confirmDeleteBankStatement).toHaveBeenCalledWith(bankStatement);
    });
  });
});
