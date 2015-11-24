import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import ShareAccountForm from '../share-account-form';

describe('ShareAccountForm', () => {
  describe('render', () => {
    let form, name, ticker;
    beforeEach(() => {
      form = shallowRenderer(<ShareAccountForm />);
      [ticker, name] = form.props.children;
    });

    it('has a ticker field', () => {
      expect(ticker.props.children[0].props.children).toEqual('Ticker');
      expect(ticker.props.children[1].type).toEqual('input');
      expect(ticker.props.children[1].props.value).toEqual(null);
    });

    it('has a name field', () => {
      expect(name.props.children[0].props.children).toEqual('Name');
      expect(name.props.children[1].type).toEqual('input');
      expect(name.props.children[1].props.value).toEqual(null);
    });
  });

  describe('isValid', () => {
    it('returns true if all fields are valid', () => {
      let form = TestUtils.renderIntoDocument(<ShareAccountForm />);
      form.state.account = {name: 'myName', ticker: 'myTicker'};
      expect(form.isValid()).toEqual(true);
    });

    it('returns false if any fields are invalid', () => {
      let form = TestUtils.renderIntoDocument(<ShareAccountForm />);
      form.state.account = {name: '', ticker: 'myTicker'};
      expect(form.isValid()).toEqual(false);
    });
  });

  describe('updating state and validation', () => {
    it('has default values for share account', () => {
      let form = TestUtils.renderIntoDocument(<ShareAccountForm />);
      let account = form.state.account;

      expect(account.accountType).toEqual('share');
      expect(account.name).toEqual(null);
      expect(account.ticker).toEqual(null);
    });

    it('updates state and validates ticker is required', () => {
      let form = TestUtils.renderIntoDocument(<ShareAccountForm />);
      let ticker = form.refs.tickerField;
      let formGroup = ticker.parentNode;
      let helpBlock = formGroup.getElementsByClassName('help-block')[0];

      TestUtils.Simulate.change(ticker);
      expect(formGroup.className).toMatch(/has-error/);
      expect(helpBlock.textContent).toEqual('Ticker is required');

      ticker.value = 'giraffe'
      TestUtils.Simulate.change(ticker);
      expect(form.state.account.ticker).toEqual('giraffe');
      expect(formGroup.className).toMatch(/has-success/);
      expect(helpBlock.textContent).toEqual('');
    });

    it('updates state and validates name is required', () => {
      let form = TestUtils.renderIntoDocument(<ShareAccountForm />);
      let name = form.refs.nameField;
      let formGroup = name.parentNode;
      let helpBlock = formGroup.getElementsByClassName('help-block')[0];

      TestUtils.Simulate.change(name);
      expect(formGroup.className).toMatch(/has-error/);
      expect(helpBlock.textContent).toEqual('Name is required');

      name.value = 'giraffe'
      TestUtils.Simulate.change(name);
      expect(form.state.account.name).toEqual('giraffe');
      expect(formGroup.className).toMatch(/has-success/);
      expect(helpBlock.textContent).toEqual('');
    });
  });
});
