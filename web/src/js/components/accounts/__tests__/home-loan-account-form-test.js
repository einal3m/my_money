import React from 'react';
import TestUtils from 'react-addons-test-utils';
import moment from 'moment';
import DatePicker from 'react-bootstrap-datetimepicker';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import HomeLoanAccountForm from '../home-loan-account-form';
import FormControl from '../../common/controls/form-control';

describe('HomeLoanAccountForm', () => {
  const account = {
    id: 1,
    name: 'My Account',
    bank: 'My Bank',
    limit: 1000,
    term: 30,
    interestRate: 5.88,
    openingBalanceDate: '2016-01-03',
  };

  describe('render', () => {
    it('creates a form control for each account property', () => {
      const form = shallowRenderer(<HomeLoanAccountForm account={account} />);
      const [name, bank, limit, termAndInterestRate, openingBalanceDate] = form.props.children;
      const [term, interestRate] = termAndInterestRate.props.children;

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

      expect(limit.type).toEqual(FormControl);
      expect(limit.props.name).toEqual('limit');
      expect(limit.props.label).toEqual('Amount Borrowed');
      expect(limit.props.children.props.children[1].type).toEqual('input');
      expect(limit.props.children.props.children[1].props.value).toEqual(1000);

      expect(term.props.children.type).toEqual(FormControl);
      expect(term.props.children.props.name).toEqual('term');
      expect(term.props.children.props.label).toEqual('Term');
      expect(term.props.children.props.children.props.children[0].type).toEqual('input');
      expect(term.props.children.props.children.props.children[0].props.value).toEqual(30);

      expect(interestRate.props.children.type).toEqual(FormControl);
      expect(interestRate.props.children.props.name).toEqual('interestRate');
      expect(interestRate.props.children.props.label).toEqual('Interest Rate');
      expect(interestRate.props.children.props.children.props.children[0].type).toEqual('input');
      expect(interestRate.props.children.props.children.props.children[0].props.value).toEqual(5.88);

      expect(openingBalanceDate.type).toEqual(FormControl);
      expect(openingBalanceDate.props.name).toEqual('openingBalanceDate');
      expect(openingBalanceDate.props.label).toEqual('Opening Date');
      expect(openingBalanceDate.props.children.type).toEqual(DatePicker);
      expect(openingBalanceDate.props.children.props.dateTime).toEqual('2016-01-03');
    });

    it('has default values for an account', () => {
      const form = shallowRenderer(<HomeLoanAccountForm account={{}} />);
      const [name, bank, limit, termAndInterestRate, openingBalanceDate] = form.props.children;
      const [term, interestRate] = termAndInterestRate.props.children;

      expect(name.props.children.props.value).toEqual('');
      expect(bank.props.children.props.value).toEqual('');
      expect(limit.props.children.props.children[1].props.value).toEqual('');
      expect(term.props.children.props.children.props.children[0].props.value).toEqual('');
      expect(interestRate.props.children.props.children.props.children[0].props.value).toEqual('');
      expect(openingBalanceDate.props.children.props.dateTime).toEqual(moment().format('YYYY-MM-DD'));
    });
  });

  describe('isValid', () => {
    it('returns true if all fields are valid', () => {
      const form = TestUtils.renderIntoDocument(<HomeLoanAccountForm account={account} />);
      expect(form.isValid()).toEqual(true);
    });

    it('returns false if any fields are invalid', () => {
      const form = TestUtils.renderIntoDocument(<HomeLoanAccountForm account={account} />);
      form.state.account.limit = 'giraffe';
      expect(form.isValid()).toEqual(false);
    });
  });

  describe('updating state and validation', () => {
    it('sets the account type to loan', () => {
      const form = TestUtils.renderIntoDocument(<HomeLoanAccountForm account={account} />);
      expect(form.state.account.accountType).toEqual('loan');
    });

    it('updates state and validates name is required', () => {
      const form = TestUtils.renderIntoDocument(<HomeLoanAccountForm account={account} />);
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
      const form = TestUtils.renderIntoDocument(<HomeLoanAccountForm account={account} />);
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

    it('updates state and validates limit is required and is a number', () => {
      const form = TestUtils.renderIntoDocument(<HomeLoanAccountForm account={account} />);
      const limit = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[2];

      limit.value = '';
      TestUtils.Simulate.change(limit);
      expect(form.state.account.limit).toEqual('');
      expect(form.validator.errorState('limit')).toEqual('has-error');
      expect(form.validator.errorFor('limit')).toEqual('Limit is required');

      limit.value = '8giraffe';
      TestUtils.Simulate.change(limit);
      expect(form.state.account.limit).toEqual('8giraffe');
      expect(form.validator.errorState('limit')).toEqual('has-error');
      expect(form.validator.errorFor('limit')).toEqual('Limit is not a number');

      limit.value = '9.76';
      TestUtils.Simulate.change(limit);
      expect(form.state.account.limit).toEqual('9.76');
      expect(form.validator.errorState('limit')).toEqual('has-success');
      expect(form.validator.errorFor('limit')).toBeUndefined();
    });

    it('updates state and validates term is required and is a number', () => {
      const form = TestUtils.renderIntoDocument(<HomeLoanAccountForm account={account} />);
      const term = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[3];

      term.value = '';
      TestUtils.Simulate.change(term);
      expect(form.state.account.term).toEqual('');
      expect(form.validator.errorState('term')).toEqual('has-error');
      expect(form.validator.errorFor('term')).toEqual('Term is required');

      term.value = '8giraffe';
      TestUtils.Simulate.change(term);
      expect(form.state.account.term).toEqual('8giraffe');
      expect(form.validator.errorState('term')).toEqual('has-error');
      expect(form.validator.errorFor('term')).toEqual('Term is not a number');

      term.value = '9.76';
      TestUtils.Simulate.change(term);
      expect(form.state.account.term).toEqual('9.76');
      expect(form.validator.errorState('term')).toEqual('has-success');
      expect(form.validator.errorFor('term')).toBeUndefined();
    });

    it('updates state and validates term is required and is a number', () => {
      const form = TestUtils.renderIntoDocument(<HomeLoanAccountForm account={account} />);
      const interestRate = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[4];

      interestRate.value = '';
      TestUtils.Simulate.change(interestRate);
      expect(form.state.account.interestRate).toEqual('');
      expect(form.validator.errorState('interestRate')).toEqual('has-error');
      expect(form.validator.errorFor('interestRate')).toEqual('Interest rate is required');

      interestRate.value = '8giraffe';
      TestUtils.Simulate.change(interestRate);
      expect(form.state.account.interestRate).toEqual('8giraffe');
      expect(form.validator.errorState('interestRate')).toEqual('has-error');
      expect(form.validator.errorFor('interestRate')).toEqual('Interest rate is not a number');

      interestRate.value = '9.76';
      TestUtils.Simulate.change(interestRate);
      expect(form.state.account.interestRate).toEqual('9.76');
      expect(form.validator.errorState('interestRate')).toEqual('has-success');
      expect(form.validator.errorFor('interestRate')).toBeUndefined();
    });

    it('updates state and validates opening balance date is required and is a date', () => {
      const form = TestUtils.renderIntoDocument(<HomeLoanAccountForm account={account} />);
      const openingBalanceDate = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[5];

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
