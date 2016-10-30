import React from 'react';
import TestUtils from 'react-addons-test-utils';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import ShareAccountForm from '../share-account-form';
import FormControl from '../../common/controls/form-control';

describe('ShareAccountForm', () => {
  const account = { id: 1, name: 'My Account', ticker: 'ABC' };

  describe('render', () => {
    it('creates a form control for each account property', () => {
      const form = shallowRenderer(<ShareAccountForm account={account} />);
      const [ticker, name] = form.props.children;

      expect(ticker.type).toEqual(FormControl);
      expect(ticker.props.name).toEqual('ticker');
      expect(ticker.props.label).toEqual('Ticker');
      expect(ticker.props.children.type).toEqual('input');
      expect(ticker.props.children.props.value).toEqual('ABC');

      expect(name.type).toEqual(FormControl);
      expect(name.props.name).toEqual('name');
      expect(name.props.label).toEqual('Name');
      expect(name.props.children.type).toEqual('input');
      expect(name.props.children.props.value).toEqual('My Account');
    });

    it('has default values for each property', () => {
      const form = shallowRenderer(<ShareAccountForm account={{ }} />);
      const [ticker, name] = form.props.children;

      expect(ticker.props.children.props.value).toEqual('');
      expect(name.props.children.props.value).toEqual('');
    });
  });

  describe('isValid', () => {
    it('returns true if all fields are valid', () => {
      const form = TestUtils.renderIntoDocument(<ShareAccountForm account={account} />);
      expect(form.isValid()).toEqual(true);
    });

    it('returns false if any fields are invalid', () => {
      const form = TestUtils.renderIntoDocument(<ShareAccountForm account={account} />);
      form.state.account.name = '';
      expect(form.isValid()).toEqual(false);
    });
  });

  describe('updating state and validation', () => {
    it('sets the account type to savings', () => {
      const form = TestUtils.renderIntoDocument(<ShareAccountForm account={account} />);
      expect(form.state.account.accountType).toEqual('share');
    });

    it('updates state and validates ticker is required', () => {
      const form = TestUtils.renderIntoDocument(<ShareAccountForm account={account} />);
      const ticker = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[0];

      ticker.value = '';
      TestUtils.Simulate.change(ticker);
      expect(form.state.account.ticker).toEqual('');
      expect(form.validator.errorState('ticker')).toEqual('has-error');
      expect(form.validator.errorFor('ticker')).toEqual('Ticker is required');

      ticker.value = 'XYZ';
      TestUtils.Simulate.change(ticker);
      expect(form.state.account.ticker).toEqual('XYZ');
      expect(form.validator.errorState('ticker')).toEqual('has-success');
      expect(form.validator.errorFor('ticker')).toBeUndefined();
    });

    it('updates state and validates name is required', () => {
      const form = TestUtils.renderIntoDocument(<ShareAccountForm account={account} />);
      const name = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[1];

      name.value = '';
      TestUtils.Simulate.change(name);
      expect(form.state.account.name).toEqual('');
      expect(form.validator.errorState('name')).toEqual('has-error');
      expect(form.validator.errorFor('name')).toEqual('Name is required');

      name.value = 'giraffe';
      TestUtils.Simulate.change(name);
      expect(form.state.account.name).toEqual('giraffe');
      expect(form.validator.errorState('name')).toEqual('has-success');
      expect(form.validator.errorFor('name')).toBeUndefined();
    });
  });
});
