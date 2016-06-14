import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import { fromJS } from 'immutable';
import React from 'react';
import AccountSlat from '../account-slat';
import Balance from '../../common/balance';
import accountActions from '../../../actions/account-actions';
import { hashHistory } from 'react-router';

describe('AccountSlat', () => {
  let account, accountSlat;
  beforeEach(() => {
    account = fromJS({ id: 22, name: 'myAccount', bank: 'myBank', currentBalance: 6070 });
  });

  describe('render', () => {
    it('has the account information', () => {
      accountSlat = shallowRenderer(<AccountSlat account={account} />);
      let [info, balance, buttonGroup] = accountSlat.props.children.props.children[1].props.children.props.children;
      let [name, bank] = info.props.children;
      let currentBalance = balance.props.children;

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
        accountSlat.refs.accountActionsButton.props.onSelect(null, '3');
        expect(accountActions.deleteAccount).toHaveBeenCalledWith(22);
      });
    });

    describe('view transactions', () => {
      beforeEach(() => {
        spyOn(accountActions, 'setCurrentAccount');
        spyOn(hashHistory, 'push');
      });
      it('from dropdown - sets the current account account and navigates to transaction page', () => {
        accountSlat.refs.accountActionsButton.props.onSelect(null, '1');
        expect(accountActions.setCurrentAccount).toHaveBeenCalledWith(22);
        expect(hashHistory.push).toHaveBeenCalledWith('/transactions');
      });

      it('from name link - sets the current account account and navigates to transaction page', () => {
        let nameLink = TestUtils.findRenderedDOMComponentWithClass(accountSlat, 'name-link');
        TestUtils.Simulate.click(nameLink);
        expect(accountActions.setCurrentAccount).toHaveBeenCalledWith(22);
        expect(hashHistory.push).toHaveBeenCalledWith('/transactions');
      });
    });
  });
});
