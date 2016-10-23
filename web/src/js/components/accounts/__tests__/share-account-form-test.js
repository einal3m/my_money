import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import ShareAccountForm from '../share-account-form';

describe('ShareAccountForm', () => {
  describe('render', () => {
    let form,
      name,
      ticker;
    beforeEach(() => {
      form = shallowRenderer(<ShareAccountForm />);
      [ticker, name] = form.props.children;
    });

    it('has a ticker field', () => {
      expect(ticker.props.children[0].props.children).toEqual('Ticker');
      expect(ticker.props.children[1].type).toEqual('input');
      expect(ticker.props.children[1].props.value).toEqual('');
    });

    it('has a name field', () => {
      expect(name.props.children[0].props.children).toEqual('Name');
      expect(name.props.children[1].type).toEqual('input');
      expect(name.props.children[1].props.value).toEqual('');
    });
  });

  describe('isValid', () => {
    it('returns true if all fields are valid', () => {
      const form = TestUtils.renderIntoDocument(<ShareAccountForm />);
      form.state.account = { name: 'myName', ticker: 'myTicker' };
      expect(form.isValid()).toEqual(true);
    });

    it('returns false if any fields are invalid', () => {
      const form = TestUtils.renderIntoDocument(<ShareAccountForm />);
      form.state.account = { name: '', ticker: 'myTicker' };
      expect(form.isValid()).toEqual(false);
    });
  });

  describe('updating state and validation', () => {
    it('has default values for share account', () => {
      const form = TestUtils.renderIntoDocument(<ShareAccountForm />);
      const account = form.state.account;

      expect(account.accountType).toEqual('share');
      expect(account.name).toEqual('');
      expect(account.ticker).toEqual('');
    });

    it('updates state and validates ticker is required', () => {
      const form = TestUtils.renderIntoDocument(<ShareAccountForm />);
      const ticker = form.refs.tickerField;
      const formGroup = ticker.parentNode;
      const helpBlock = formGroup.getElementsByClassName('help-block')[0];

      TestUtils.Simulate.change(ticker);
      expect(formGroup.className).toMatch(/has-error/);
      expect(helpBlock.textContent).toEqual('Ticker is required');

      ticker.value = 'giraffe';
      TestUtils.Simulate.change(ticker);
      expect(form.state.account.ticker).toEqual('giraffe');
      expect(formGroup.className).toMatch(/has-success/);
      expect(helpBlock.textContent).toEqual('');
    });

    it('updates state and validates name is required', () => {
      const form = TestUtils.renderIntoDocument(<ShareAccountForm />);
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
  });
});
