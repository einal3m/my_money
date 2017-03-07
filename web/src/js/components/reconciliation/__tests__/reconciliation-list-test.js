import React from 'react';
import { shallow } from 'enzyme';
import { ReconciliationListComponent as ReconciliationList } from '../reconciliation-list';
import PageHeader from '../../common/page-header';
import ReconciliationTable from '../reconciliation-table';
import * as reconciliationActions from '../../../actions/reconciliation-actions';

describe('ReconciliationList', () => {
  let list;
  const reconciliations = [
    { id: 1, statementDate: '2017-01-01', statementBalance: 1000, reconciled: false },
    { id: 2, statementDate: '2017-03-01', statementBalance: 2000, reconciled: true },
  ];

  describe('render', () => {
    beforeEach(() => {
      spyOn(reconciliationActions, 'getReconciliations');
      list = shallow(<ReconciliationList loaded reconciliations={reconciliations} />);
    });

    it('calls the account reconciliation', () => {
      expect(reconciliationActions.getReconciliations).toHaveBeenCalled();
    });

    it('renders a page header', () => {
      const header = list.childAt(0);
      expect(header.type()).toEqual(PageHeader);
      expect(header.prop('title')).toEqual('account reconciliation');
    });

    it('renders a table', () => {
      const table = list.find(ReconciliationTable);

      expect(table.prop('reconciliations')).toEqual(reconciliations);
      expect(table.prop('loaded')).toEqual(true);
    });
  });
});
