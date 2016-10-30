import React from 'react';
import TestUtils from 'react-addons-test-utils';
import moment from 'moment';
import DatePicker from 'react-bootstrap-datetimepicker';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import SavingsAccountForm from '../savings-account-form';
import FormControl from '../../common/controls/form-control';

describe('SavingsAccountForm', () => {
  const account = {
    id: 1, name: 'My Account', bank: 'My Bank', openingBalance: 100, openingBalanceDate: '2016-01-03',
  };
  describe('render', () => {
    it('creates a form control for each account property', () => {
      const form = shallowRenderer(<SavingsAccountForm account={account} />);
      const [name, bank, openingBalance, openingBalanceDate] = form.props.children;

      expect(name.type).toEqual(FormControl);
      expect(name.props.name).toEqual('name');
      expect(name.props.label).toEqual('Name');
      expect(name.props.children.type).toEqual('input');
      expect(name.props.children.props.value).toEqual('My Account');

      expect(bank.type).toEqual(FormControl);
      expect(bank.props.name).toEqual('bank');
      expect(bank.props.label).toEqual('Bank');
      expect(bank.props.children.type).toEqual('input');
      expect(bank.props.children.props.value).toEqual('My Bank');

      expect(openingBalance.type).toEqual(FormControl);
      expect(openingBalance.props.name).toEqual('openingBalance');
      expect(openingBalance.props.label).toEqual('Opening Balance');
      expect(openingBalance.props.children.props.children[1].type).toEqual('input');
      expect(openingBalance.props.children.props.children[1].props.value).toEqual(100);

      expect(openingBalanceDate.type).toEqual(FormControl);
      expect(openingBalanceDate.props.name).toEqual('openingBalanceDate');
      expect(openingBalanceDate.props.label).toEqual('Opening Balance Date');
      expect(openingBalanceDate.props.children.type).toEqual(DatePicker);
      expect(openingBalanceDate.props.children.props.dateTime).toEqual('2016-01-03');
    });

    it('has default values for an account', () => {
      const form = shallowRenderer(<SavingsAccountForm account={{}} />);
      const [name, bank, openingBalance, openingBalanceDate] = form.props.children;

      expect(name.props.children.props.value).toEqual('');
      expect(bank.props.children.props.value).toEqual('');
      expect(openingBalance.props.children.props.children[1].props.value).toEqual(0);
      expect(openingBalanceDate.props.children.props.dateTime).toEqual(moment().format('YYYY-MM-DD'));
    });
  });

  describe('isValid', () => {
    it('returns true if all fields are valid', () => {
      const form = TestUtils.renderIntoDocument(<SavingsAccountForm account={account} />);
      expect(form.isValid()).toEqual(true);
    });

    it('returns false if any fields are invalid', () => {
      const form = TestUtils.renderIntoDocument(<SavingsAccountForm account={account} />);
      form.state.account.openingBalance = 'giraffe';
      expect(form.isValid()).toEqual(false);
    });
  });

  describe('updating state and validation', () => {
    it('sets the account type to savings', () => {
      const form = TestUtils.renderIntoDocument(<SavingsAccountForm account={account} />);
      expect(form.state.account.accountType).toEqual('savings');
    });

    it('updates state and validates name is required', () => {
      const form = TestUtils.renderIntoDocument(<SavingsAccountForm account={account} />);
      const name = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[0];

      name.value = '';
      TestUtils.Simulate.change(name);
      expect(form.validator.errorState('name')).toEqual('has-error');
      expect(form.validator.errorFor('name')).toEqual('Name is required');

      name.value = 'giraffe';
      TestUtils.Simulate.change(name);
      expect(form.state.account.name).toEqual('giraffe');
      expect(form.validator.errorState('name')).toEqual('has-success');
      expect(form.validator.errorFor('name')).toBeUndefined();
    });

    it('updates bank in state, optional field can be empty', () => {
      const form = TestUtils.renderIntoDocument(<SavingsAccountForm account={account} />);
      const bank = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[1];

      bank.value = '';
      TestUtils.Simulate.change(bank);
      expect(form.state.account.bank).toEqual('');
      expect(form.validator.errorState('bank')).toEqual('has-success');
      expect(form.validator.errorFor('bank')).toBeUndefined();

      bank.value = 'My Bank';
      TestUtils.Simulate.change(bank);
      expect(form.state.account.bank).toEqual('My Bank');
      expect(form.validator.errorState('bank')).toEqual('has-success');
      expect(form.validator.errorFor('bank')).toBeUndefined();
    });

    it('updates state and validates opening balance is required and is a number', () => {
      const form = TestUtils.renderIntoDocument(<SavingsAccountForm account={account} />);
      const openingBalance = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[2];

      openingBalance.value = '';
      TestUtils.Simulate.change(openingBalance);
      expect(form.state.account.openingBalance).toEqual('');
      expect(form.validator.errorState('openingBalance')).toEqual('has-error');
      expect(form.validator.errorFor('openingBalance')).toEqual('Opening balance is required');

      openingBalance.value = '8giraffe';
      TestUtils.Simulate.change(openingBalance);
      expect(form.state.account.openingBalance).toEqual('8giraffe');
      expect(form.validator.errorState('openingBalance')).toEqual('has-error');
      expect(form.validator.errorFor('openingBalance')).toEqual('Opening balance is not a number');

      openingBalance.value = '9.76';
      TestUtils.Simulate.change(openingBalance);
      expect(form.state.account.openingBalance).toEqual('9.76');
      expect(form.validator.errorState('openingBalance')).toEqual('has-success');
      expect(form.validator.errorFor('openingBalance')).toBeUndefined();
    });

    it('updates state and validates opening balance date is required and is a date', () => {
      const form = TestUtils.renderIntoDocument(<SavingsAccountForm account={account} />);
      const openingBalanceDate = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[3];

      openingBalanceDate.value = 'dd';
      TestUtils.Simulate.change(openingBalanceDate);
      expect(form.state.account.openingBalanceDate).toEqual('');
      expect(form.validator.errorState('openingBalanceDate')).toEqual('has-error');
      expect(form.validator.errorFor('openingBalanceDate')).toEqual('Opening balance date is required');

      openingBalanceDate.value = '19-Dec-2015';
      TestUtils.Simulate.change(openingBalanceDate);
      expect(form.state.account.openingBalanceDate).toEqual('2015-12-19');
      expect(form.validator.errorState('openingBalanceDate')).toEqual('has-success');
      expect(form.validator.errorFor('openingBalanceDate')).toBeUndefined();
    });
  });
});
