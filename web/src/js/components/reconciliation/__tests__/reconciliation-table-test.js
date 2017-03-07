import React from 'react';
import { shallow } from 'enzyme';
import ReconciliationTable from '../reconciliation-table';
import ReconciliationRow from '../reconciliation-row';

describe('ReconciliationTable', () => {
  describe('render', () => {
    it('renders nothing if loaded is false', () => {
      const table = shallow(<ReconciliationTable loaded={false} />);
      expect(table.find('table').length).toEqual(0);
    });

    it('renders a table with a row for each reconciliation', () => {
      const reconciliations = [
        { id: 1, statementDate: '2017-01-01', statementBalance: 1000, reconciled: false },
        { id: 2, statementDate: '2017-03-01', statementBalance: 2000, reconciled: true },
      ];

      const table = shallow(<ReconciliationTable loaded reconciliations={reconciliations} />);
      expect(table.childAt(0).type()).toEqual('table');

      const tableBody = table.find('tbody');

      expect(tableBody.children().length).toEqual(2);

      expect(tableBody.childAt(0).type()).toEqual(ReconciliationRow);
      expect(tableBody.childAt(0).prop('reconciliation')).toEqual(reconciliations[0]);

      expect(tableBody.childAt(1).type()).toEqual(ReconciliationRow);
      expect(tableBody.childAt(1).prop('reconciliation')).toEqual(reconciliations[1]);
    });
  });
});
