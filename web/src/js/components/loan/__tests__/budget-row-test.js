import React from 'react';
import { shallow } from 'enzyme';
import BudgetRow from '../budget-row';
import Amount from '../../common/amount';
import * as formActions from '../../../actions/form-actions';

describe('BudgetRow', () => {
  let budgetRow;
  const budget = {
    id: 1,
    accountId: 3,
    description: 'My income',
    dayOfMonth: 14,
    amount: 1000,
    credit: false,
  };

  describe('render', () => {
    it('budget attributes', () => {
      budgetRow = shallow(<BudgetRow budget={budget} />);

      expect(budgetRow.type()).toEqual('tr');
      expect(budgetRow.childAt(0).text()).toEqual('My income');
      expect(budgetRow.childAt(1).text()).toEqual('14');
      expect(budgetRow.childAt(2).childAt(0).type()).toEqual(Amount);
      expect(budgetRow.childAt(2).childAt(0).prop('amount')).toEqual(1000);
    });
  });

  describe('events', () => {
    it('click row opens edit buget modal', () => {
      spyOn(formActions, 'showFormModal');
      budgetRow = shallow(<BudgetRow budget={budget} />);

      budgetRow.prop('onClick')();

      expect(formActions.showFormModal).toHaveBeenCalledWith('Budget', budget, { allowDelete: true });
    });
  });
});
