import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import SavingsAccountForm from '../savings-account-form';
import DatePicker from 'react-bootstrap-datetimepicker';
import moment from 'moment';

describe('SavingsAccountForm', () => {
  describe('render', () => {
    let form,
      name,
      bank,
      openingBalance,
      openingBalanceDate;
    beforeEach(() => {
      form = shallowRenderer(<SavingsAccountForm />);
      [name, bank, openingBalance, openingBalanceDate] = form.props.children;
    });

    it('has a name field', () => {
      expect(name.props.children[0].props.children).toEqual('Name');
      expect(name.props.children[1].type).toEqual('input');
      expect(name.props.children[1].props.value).toEqual('');
    });

    it('has a bank field', () => {
      expect(bank.props.children[0].props.children).toEqual('Bank');
      expect(bank.props.children[1].type).toEqual('input');
      expect(bank.props.children[1].props.value).toEqual('');
    });

    it('has a opening balance field', () => {
      expect(openingBalance.props.children[0].props.children).toEqual('Opening Balance');
      expect(openingBalance.props.children[1].props.children[1].type).toEqual('input');
      expect(openingBalance.props.children[1].props.children[1].props.value).toEqual(0);
    });

    it('has a opening balance date field', () => {
      expect(openingBalanceDate.props.children[0].props.children).toEqual('Opening Balance Date');
      expect(openingBalanceDate.props.children[1].type).toEqual(DatePicker);
      expect(openingBalanceDate.props.children[1].props.dateTime).toEqual(moment().format('YYYY-MM-DD'));
    });
  });

  describe('isValid', () => {
    it('returns true if all fields are valid', () => {
      const form = TestUtils.renderIntoDocument(<SavingsAccountForm />);
      form.state.account = { name: 'myName', bank: 'myBank', openingBalance: 600, openingBalanceDate: '2014-06-02' };
      expect(form.isValid()).toEqual(true);
    });

    it('returns false if any fields are invalid', () => {
      const form = TestUtils.renderIntoDocument(<SavingsAccountForm />);
      form.state.account = { name: 'myName', bank: 'myBank', openingBalance: 'hello', openingBalanceDate: '2014-06-02' };
      expect(form.isValid()).toEqual(false);
    });
  });

  describe('updating state and validation', () => {
    it('has default values for savings account', () => {
      const form = TestUtils.renderIntoDocument(<SavingsAccountForm />);
      const account = form.state.account;

      expect(account.accountType).toEqual('savings');
      expect(account.name).toEqual('');
      expect(account.bank).toEqual('');
      expect(account.openingBalance).toEqual(0);
      expect(account.openingBalanceDate).toEqual(moment().format('YYYY-MM-DD'));
    });

    it('updates state and validates name is required', () => {
      const form = TestUtils.renderIntoDocument(<SavingsAccountForm />);
      const name = form.refs.nameField;
      const formGroup = name.parentNode;
      const helpBlock = formGroup.getElementsByClassName('help-block')[0];

      TestUtils.Simulate.change(name);
      expect(formGroup.className).toMatch(/has-error/);
      expect(helpBlock.textContent).toEqual('Name is required');

      name.value = 'giraffe';
      TestUtils.Simulate.change(name);
      expect(form.state.account.name).toEqual('giraffe');
      expect(formGroup.className).toMatch(/has-success/);
      expect(helpBlock.textContent).toEqual('');
    });

    it('updates bank in state, optional field can be empty', () => {
      const form = TestUtils.renderIntoDocument(<SavingsAccountForm />);
      const bank = form.refs.bankField;
      const formGroup = bank.parentNode;
      const helpBlock = formGroup.getElementsByClassName('help-block')[0];

      bank.value = 'myBank';
      TestUtils.Simulate.change(bank);
      expect(form.state.account.bank).toEqual('myBank');
      expect(formGroup.className).toMatch(/has-success/);
      expect(helpBlock.textContent).toEqual('');

      bank.value = '';
      TestUtils.Simulate.change(bank);
      expect(form.state.account.bank).toEqual('');
      expect(formGroup.className).toMatch(/has-success/);
      expect(helpBlock.textContent).toEqual('');
    });

    it('updates state and validates opening balance is required and is a number', () => {
      const form = TestUtils.renderIntoDocument(<SavingsAccountForm />);
      const openingBalance = form.refs.openingBalanceField;
      const formGroup = openingBalance.parentNode.parentNode;
      const helpBlock = formGroup.getElementsByClassName('help-block')[0];

      openingBalance.value = '';
      TestUtils.Simulate.change(openingBalance);
      expect(form.state.account.openingBalance).toEqual('');
      expect(formGroup.className).toMatch(/has-error/);
      expect(helpBlock.textContent).toEqual('Opening balance is required');

      openingBalance.value = '8giraffe';
      TestUtils.Simulate.change(openingBalance);
      expect(form.state.account.openingBalance).toEqual('8giraffe');
      expect(formGroup.className).toMatch(/has-error/);
      expect(helpBlock.textContent).toEqual('Opening balance is not a number');

      openingBalance.value = '9.76';
      TestUtils.Simulate.change(openingBalance);
      expect(form.state.account.openingBalance).toEqual('9.76');
      expect(formGroup.className).toMatch(/has-success/);
      expect(helpBlock.textContent).toEqual('');
    });

    it('updates state and validates opening balance date is required and is a date', () => {
      const form = TestUtils.renderIntoDocument(<SavingsAccountForm />);
      const openingBalanceDate = form.refs.openingBalanceDateField;
      const dateInput = TestUtils.findRenderedDOMComponentWithTag(openingBalanceDate, 'input');
      const formGroup = TestUtils.scryRenderedDOMComponentsWithClass(form, 'form-group')[3];
      const helpBlock = formGroup.getElementsByClassName('help-block')[0];

      dateInput.value = 'dd';
      TestUtils.Simulate.change(dateInput);
      expect(form.state.account.openingBalanceDate).toEqual('');
      expect(formGroup.className).toMatch(/has-error/);
      expect(helpBlock.textContent).toEqual('Opening balance date is required');

      dateInput.value = '19-Dec-2015';
      TestUtils.Simulate.change(dateInput);
      expect(form.state.account.openingBalanceDate).toEqual('2015-12-19');
      expect(formGroup.className).toMatch(/has-success/);
      expect(helpBlock.textContent).toEqual('');
    });
  });
});
