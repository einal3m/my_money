import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { hashHistory } from 'react-router';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import AccountSlat from '../account-slat';
import Balance from '../../common/balance';
import * as accountActions from '../../../actions/account-actions';

describe('AccountSlat', () => {
  const account = { id: 22, accountType: 'savings', name: 'myAccount', bank: 'myBank', currentBalance: 6070 };
  let accountSlat;

  describe('render', () => {
    it('has the account information', () => {
      accountSlat = shallowRenderer(<AccountSlat account={account} />);
      const [info, balance, buttonGroup] = accountSlat.props.children.props.children[1].props.children.props.children;
      const [name, bank] = info.props.children;
      const currentBalance = balance.props.children;

      expect(name.props.children.props.children).toEqual('myAccount');
      expect(bank.props.children).toEqual('myBank');
      expect(currentBalance.type).toEqual(Balance);
      expect(currentBalance.props.balance).toEqual(6070);
      expect(buttonGroup.props.children.props.title).toEqual('...');
    });
  });

  describe('actions', () => {
    beforeEach(() => {
      accountSlat = TestUtils.renderIntoDocument(<AccountSlat account={account} />);
    });

    describe('delete account', () => {
      it('calls the delete account service', () => {
        spyOn(accountActions, 'deleteAccount');
        accountSlat.refs.accountActionsButton.props.onSelect('3');
        expect(accountActions.deleteAccount).toHaveBeenCalledWith(22);
      });
    });

    describe('view transactions', () => {
      beforeEach(() => {
        spyOn(accountActions, 'setCurrentAccount');
        spyOn(hashHistory, 'push');
      });
      it('from dropdown - sets the current account account and navigates to transaction page', () => {
        accountSlat.refs.accountActionsButton.props.onSelect('1');
        expect(accountActions.setCurrentAccount).toHaveBeenCalledWith(22);
        expect(hashHistory.push).toHaveBeenCalledWith('/transactions');
      });

      it('from name link - sets the current account account and navigates to transaction page', () => {
        const nameLink = TestUtils.findRenderedDOMComponentWithClass(accountSlat, 'name-link');
        TestUtils.Simulate.click(nameLink);
        expect(accountActions.setCurrentAccount).toHaveBeenCalledWith(22);
        expect(hashHistory.push).toHaveBeenCalledWith('/transactions');
      });
    });
  });
});
