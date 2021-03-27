import React from 'react';
import { shallow } from 'enzyme';
import { ReconciliationListComponent as ReconciliationList } from '../reconciliation-list';
import PageHeader from '../../common/page-header';
import ReconciliationTable from '../reconciliation-table';
import ReconciliationModal from '../reconciliation-modal';
import Button from '../../common/controls/button';
import * as reconciliationActions from '../../../actions/reconciliation-actions';
import * as formActions from '../../../actions/form-actions';

describe('ReconciliationList', () => {
  let list;
  const reconciliations = [
    { id: 1, statementDate: '2017-01-01', statementBalance: 1000, reconciled: false },
    { id: 2, statementDate: '2017-03-01', statementBalance: 2000, reconciled: true },
  ];

  const currentAccount = { id: 1, name: 'my account', bank: 'my bank' };

  beforeEach(() => {
    spyOn(reconciliationActions, 'getReconciliations');
    list = shallow(<ReconciliationList loaded currentAccount={currentAccount} reconciliations={reconciliations} />);
  });

  describe('render', () => {
    it('calls the account reconciliation', () => {
      expect(reconciliationActions.getReconciliations).toHaveBeenCalled();
    });

    it('renders a page header with start button', () => {
      const header = list.childAt(0);
      expect(header.type()).toEqual(PageHeader);
      expect(header.prop('title')).toEqual('account reconciliation');

      const button = header.find(Button);
      expect(button.children().text()).toEqual('Start');
    });

    it('renders a table', () => {
      const table = list.find(ReconciliationTable);

      expect(table.prop('reconciliations')).toEqual(reconciliations);
      expect(table.prop('loaded')).toEqual(true);
    });

    it('renders a reconciliation modal', () => {
      const modal = list.find(ReconciliationModal);

      expect(modal.prop('account')).toEqual(currentAccount);
    });
  });

  describe('start button events', () => {
    it('opens the reconciliation modal with last reconciliation if reconciled is false', () => {
      const button = list.find(PageHeader).find(Button);
      spyOn(formActions, 'showFormModal');

      button.prop('onClick')();

      expect(formActions.showFormModal).toHaveBeenCalledWith('Reconciliation', reconciliations[0], {});
    });

    it('opens the reconciliation modal with new reconciliation if last reconciled is finished', () => {
      const finishedReconciliations = [
        { id: 1, statementDate: '2017-01-01', statementBalance: 1000, reconciled: true },
        { id: 2, statementDate: '2017-03-01', statementBalance: 2000, reconciled: true },
      ];

      list = shallow(
        <ReconciliationList loaded currentAccount={currentAccount} reconciliations={finishedReconciliations} />
      );

      const button = list.find(PageHeader).find(Button);
      spyOn(formActions, 'showFormModal');

      button.prop('onClick')();

      expect(formActions.showFormModal).toHaveBeenCalledWith('Reconciliation', {}, {});
    });
  });
});
