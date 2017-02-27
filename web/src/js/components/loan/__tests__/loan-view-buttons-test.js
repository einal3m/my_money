import React from 'react';
import { shallow } from 'enzyme';
import LoanViewButtons from '../loan-view-buttons';
import * as loanActions from '../../../actions/loan-actions';

describe('LoanViewButtons', () => {
  it('renders three toggle buttons', () => {
    const buttons = shallow(<LoanViewButtons view="budget" />);
    expect(buttons.hasClass('btn-group')).toBeTruthy();

    const [chart, budget, summary] = buttons.props().children;
    expect(chart.type).toEqual('button');
    expect(chart.props.className).not.toMatch(/active/);
    expect(chart.props.children.props.className).toMatch(/line-chart/);
    expect(budget.type).toEqual('button');
    expect(budget.props.className).toMatch(/active/);
    expect(budget.props.children.props.className).toMatch(/table/);
    expect(summary.type).toEqual('button');
    expect(summary.props.className).not.toMatch(/active/);
    expect(summary.props.children.props.className).toMatch(/dollar/);
  });

  describe('button events', () => {
    let buttons;
    beforeEach(() => {
      spyOn(loanActions, 'setLoanView');
      buttons = shallow(<LoanViewButtons view="budget" />);
    });

    it('calls the setLoanView with "chart" when chart button clicked', () => {
      const chartButton = buttons.childAt(0);
      chartButton.prop('onClick')();

      expect(loanActions.setLoanView).toHaveBeenCalledWith('chart');
    });

    it('calls the setLoanView with "budget" when budget button clicked', () => {
      const budgetButton = buttons.childAt(1);
      budgetButton.prop('onClick')();

      expect(loanActions.setLoanView).toHaveBeenCalledWith('budget');
    });

    it('calls the setLoanView with "summary" when summary button clicked', () => {
      const summaryButton = buttons.childAt(2);
      summaryButton.prop('onClick')();

      expect(loanActions.setLoanView).toHaveBeenCalledWith('summary');
    });
  });
});
