import React from 'react';
import { shallow } from 'enzyme';
import { BudgetModalComponent as BudgetModal } from '../budget-modal';
import BudgetForm from '../budget-form';
import FormModal from '../../common/form-modal';
import * as budgetActions from '../../../actions/budget-actions';

describe('BudgetModal', () => {
  const budget = {
    id: 1,
    accountId: 3,
    description: 'My income',
    dayOfMonth: 14,
    amount: 1000,
    credit: false,
  };

  describe('render', () => {
    it('does not display modal if show is false', () => {
      const budgetModal = shallow(<BudgetModal show={false} />);

      expect(budgetModal.type()).toEqual('div');
      expect(budgetModal.children().length).toEqual(0);
    });

    it('shows budget form when show is true', () => {
      const budgetModal = shallow(<BudgetModal show modelType="Budget" model={budget} allowDelete />);

      expect(budgetModal.type()).toEqual(FormModal);
      expect(budgetModal.prop('show')).toEqual(true);
      expect(budgetModal.prop('modelName')).toEqual('Budget');
      expect(budgetModal.prop('allowDelete')).toEqual(true);

      const patternForm = budgetModal.find(BudgetForm);
      expect(patternForm.prop('budget')).toEqual(budget);
    });
  });

  describe('events', () => {
    it('saves the budget', () => {
      spyOn(budgetActions, 'saveBudget');

      const budgetModal = shallow(<BudgetModal show modelType="Budget" model={budget} allowDelete />);

      budgetModal.prop('onSave')(budget);
      expect(budgetActions.saveBudget).toHaveBeenCalledWith(budget);
    });

    it('deletes transaction', () => {
      spyOn(budgetActions, 'deleteBudget');

      const budgetModal = shallow(<BudgetModal show modelType="Budget" model={budget} allowDelete />);

      budgetModal.prop('onDelete')();
      expect(budgetActions.deleteBudget).toHaveBeenCalledWith(budget);
    });
  });
});
