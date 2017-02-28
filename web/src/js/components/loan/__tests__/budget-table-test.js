import React from 'react';
import { shallow } from 'enzyme';
import { BudgetTableComponent as BudgetTable } from '../budget-table';
import BudgetRow from '../budget-row';
import * as budgetActions from '../../../actions/budget-actions';

describe('BudgetTable', () => {
  const budgets = [{
    id: 1,
    accountId: 3,
    description: 'My income',
    dayOfMonth: 14,
    amount: 1000,
    credit: false,
  }];
  const account = { id: 2, name: 'My Account', bank: 'My Bank' };

  beforeEach(() => {
    spyOn(budgetActions, 'getBudgets');
  });

  it('calls getBudgets on load', () => {
    shallow(
      <BudgetTable
        loaded={false}
        budgets={budgets}
        account={account}
      />
    );
    expect(budgetActions.getBudgets).toHaveBeenCalled();
  });

  describe('render', () => {
    it('renders nothing if not loaded', () => {
      const budgetTable = shallow(
        <BudgetTable
          loaded={false}
          budgets={budgets}
          account={account}
        />
      );

      expect(budgetTable.find('table').length).toEqual(0);
    });

    it('renders a table of budgets if loaded', () => {
      const budgetTable = shallow(
        <BudgetTable
          loaded
          budgets={budgets}
          account={account}
        />
      );

      expect(budgetTable.find('table').length).toEqual(1);

      const tableBody = budgetTable.find('tbody');
      expect(tableBody.childAt(0).type()).toEqual(BudgetRow);
      expect(tableBody.childAt(0).prop('budget')).toEqual(budgets[0]);
    });
  });
});
