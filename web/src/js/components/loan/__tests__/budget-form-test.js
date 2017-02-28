import React from 'react';
import { shallow, mount } from 'enzyme';
import BudgetForm from '../budget-form';
import FormControl from '../../common/controls/form-control';
import MoneyInput from '../../common/controls/money-input';

describe('BudgetForm', () => {
  const budget = {
    id: 1,
    accountId: 3,
    description: 'My income',
    dayOfMonth: 14,
    amount: 1000,
    credit: false,
  };

  describe('render', () => {
    it('has a control for each editable property', () => {
      const form = shallow(<BudgetForm budget={budget} />);

      const [description, dayOfMonth, amount] = form.children();

      expect(description.type).toEqual(FormControl);
      expect(description.props.name).toEqual('description');
      expect(description.props.label).toEqual('Description');
      expect(description.props.children.type).toEqual('input');
      expect(description.props.children.props.value).toEqual('My income');

      expect(dayOfMonth.type).toEqual(FormControl);
      expect(dayOfMonth.props.name).toEqual('dayOfMonth');
      expect(dayOfMonth.props.label).toEqual('Day of Month');
      expect(dayOfMonth.props.children.type).toEqual('input');
      expect(dayOfMonth.props.children.props.value).toEqual(14);

      expect(amount.type).toEqual(FormControl);
      expect(amount.props.name).toEqual('amount');
      expect(amount.props.label).toEqual('Amount');
      expect(amount.props.children.type).toEqual(MoneyInput);
      expect(amount.props.children.props.value).toEqual(1000);
    });
  });

  describe('getModel', () => {
    it('returns the budget state', () => {
      const form = shallow(<BudgetForm budget={budget} />);
      form.setState({ budget: { id: 13 } });

      expect(form.instance().getModel()).toEqual({ id: 13 });
    });
  });

  describe('isValid', () => {
    it('returns true if all fields are valid', () => {
      const form = shallow(<BudgetForm budget={budget} />);
      spyOn(form.instance(), 'forceUpdate');

      expect(form.instance().isValid()).toEqual(true);
      expect(form.instance().forceUpdate).toHaveBeenCalled();
    });

    describe('updating state and validation', () => {
      let form;
      let instance;

      beforeEach(() => {
        form = mount(<BudgetForm budget={budget} />);
        instance = form.instance();
      });

      it('updates state and validates description is required', () => {
        const matchText = form.find('input').at(0);

        matchText.prop('onChange')({ target: { name: 'description', value: '' } });

        expect(form.state('budget').description).toEqual('');
        expect(instance.validator.errorState('description')).toEqual('has-error');
        expect(instance.validator.errorFor('description')).toEqual('Description is required');

        matchText.prop('onChange')({ target: { name: 'description', value: 'new description' }});
        expect(form.state('budget').description).toEqual('new description');
        expect(instance.validator.errorState('description')).toEqual('has-success');
        expect(instance.validator.errorFor('description')).toBeUndefined();
      });

      it('updates state and validates dayOfMonth is required', () => {
        const dayOfMonth = form.find('input').at(1);

        dayOfMonth.prop('onChange')({ target: { name: 'dayOfMonth', value: '' } });
        expect(form.state('budget').dayOfMonth).toEqual('');
        expect(instance.validator.errorState('dayOfMonth')).toEqual('has-error');
        expect(instance.validator.errorFor('dayOfMonth')).toEqual('Day of month is required');

        dayOfMonth.prop('onChange')({ target: { name: 'dayOfMonth', value: 'not a number' } });
        expect(form.state('budget').dayOfMonth).toEqual('not a number');
        expect(instance.validator.errorState('dayOfMonth')).toEqual('has-error');
        expect(instance.validator.errorFor('dayOfMonth')).toEqual('Day of month is not a number');

        dayOfMonth.prop('onChange')({ target: { name: 'dayOfMonth', value: 12 } });
        expect(form.state('budget').dayOfMonth).toEqual(12);
        expect(instance.validator.errorState('dayOfMonth')).toEqual('has-success');
        expect(instance.validator.errorFor('dayOfMonth')).toBeUndefined();
      });

      it('updates state and validates amount is required', () => {
        const amount = form.find(MoneyInput);

        amount.prop('onChange')({ target: { name: 'amount', value: '' } });
        expect(form.state('budget').amount).toEqual('');
        expect(instance.validator.errorState('amount')).toEqual('has-error');
        expect(instance.validator.errorFor('amount')).toEqual('Amount is required');

        amount.prop('onChange')({ target: { name: 'amount', value: 'not a number' } });
        expect(form.state('budget').amount).toEqual('not a number');
        expect(instance.validator.errorState('amount')).toEqual('has-error');
        expect(instance.validator.errorFor('amount')).toEqual('Amount is not a number');

        amount.prop('onChange')({ target: { name: 'amount', value: 4000 } });
        expect(form.state('budget').amount).toEqual(4000);
        expect(instance.validator.errorState('amount')).toEqual('has-success');
        expect(instance.validator.errorFor('amount')).toBeUndefined();
      });
    });
  });
});
