import React from 'react';
import { shallow } from 'enzyme';
import { ReconciliationModalComponent as ReconciliationModal } from '../reconciliation-modal';
import ReconciliationForm from '../reconciliation-form';
import FormModal from '../../common/form-modal';
import * as reconciliationActions from '../../../actions/reconciliation-actions';

describe('ReconciliationModal', () => {
  const reconciliation = {
    id: 20,
    accountId: 12,
    statementBalance: 140,
    statementDate: '2017-03-14',
    reconciled: false,
  };

  describe('render', () => {
    it('does not display modal if show is false', () => {
      const reconciliationModal = shallow(<ReconciliationModal show={false} />);

      expect(reconciliationModal.type()).toEqual('div');
      expect(reconciliationModal.children().length).toEqual(0);
    });

    it('shows reconciliation form when show is true', () => {
      const reconciliationModal = shallow(
        <ReconciliationModal show modelType="Reconciliation" reconciliation={reconciliation} />
      );

      expect(reconciliationModal.type()).toEqual(FormModal);
      expect(reconciliationModal.prop('show')).toEqual(true);
      expect(reconciliationModal.prop('modelName')).toEqual('Reconciliation');
      expect(reconciliationModal.prop('allowDelete')).toEqual(false);

      const patternForm = reconciliationModal.find(ReconciliationForm);
      expect(patternForm.prop('reconciliation')).toEqual(reconciliation);
    });
  });

  describe('events', () => {
    it('saves the reconciliation', () => {
      spyOn(reconciliationActions, 'saveReconciliation');

      const reconciliationModal = shallow(<ReconciliationModal show reconciliation={reconciliation} />);

      reconciliationModal.prop('onSave')(reconciliation);
      expect(reconciliationActions.saveReconciliation).toHaveBeenCalledWith(reconciliation);
    });
  });
});
