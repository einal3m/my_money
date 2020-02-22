import React from 'react';
import { shallow } from 'enzyme';
import ReconciliationRow from '../reconciliation-row';
import Balance from '../../common/balance';
import Date from '../../common/date';

describe('ReconciliationRow', () => {
  const reconciliation = {
    id: 1,
    accountId: 3,
    statementBalance: 140,
    statementDate: '2017-03-14',
    reconciled: false,
  };

  describe('render', () => {
    it('renders a row with reconciliation attributes', () => {
      const row = shallow(<ReconciliationRow reconciliation={reconciliation} />);

      expect(row.type()).toEqual('tr');
      expect(row.children().length).toEqual(3);

      const date = row.childAt(0).find(Date);
      expect(date.prop('date')).toEqual('2017-03-14');

      const balance = row.childAt(1).find(Balance);
      expect(balance.prop('balance')).toEqual(140);
    });

    it('renders the reconciled column with a tick if reconciled is true', () => {
      const reconciledReconciliation = {
        id: 1,
        accountId: 3,
        statementBalance: 140,
        statementDate: '2017-03-14',
        reconciled: true,
      };

      const row = shallow(<ReconciliationRow reconciliation={reconciledReconciliation} />);

      expect(row.childAt(2).find('i').hasClass('fa-check')).toBeTruthy();
    });

    it('renders the reconciled column with a cross if reconciled is false', () => {
      const row = shallow(<ReconciliationRow reconciliation={reconciliation} />);

      expect(row.childAt(2).find('i').hasClass('fa-times')).toBeTruthy();
    });
  });
});
