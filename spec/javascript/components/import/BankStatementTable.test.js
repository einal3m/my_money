import React from 'react';
import { shallow } from 'enzyme';
import BankStatementTable from '../bank-statement-table';
import BankStatementRow from '../bank-statement-row';

describe('BankStatementTable', () => {
  let bankStatementTable;
  const bankStatements = [
    { id: 123, accountId: 2, date: '2001-10-19', fileName: 'one.ofx', transactionCount: 6 },
    { id: 456, accountId: 2, date: '2001-10-20', fileName: 'two.ofx', transactionCount: 8 },
  ];

  describe('render', () => {
    it('has a table with row for each bank statement', () => {
      bankStatementTable = shallow(
        <BankStatementTable bankStatements={bankStatements} />
      );

      expect(bankStatementTable.type()).toEqual('table');
      expect(bankStatementTable.find('th').length).toEqual(4);

      const body = bankStatementTable.childAt(1);
      expect(body.props().children.length).toEqual(2);
      expect(body.props().children[0].props.bankStatement).toEqual(bankStatements[0]);
      expect(body.props().children[0].type).toEqual(BankStatementRow);
      expect(body.props().children[1].props.bankStatement).toEqual(bankStatements[1]);
      expect(body.props().children[1].type).toEqual(BankStatementRow);
    });

    it('has no table if no transactions', () => {
      bankStatementTable = shallow(
        <BankStatementTable bankStatements={[]} />
      );

      expect(bankStatementTable.type()).toEqual('div');
      expect(bankStatementTable.text()).toEqual('Nothing imported into this account');
    });
  });
});
