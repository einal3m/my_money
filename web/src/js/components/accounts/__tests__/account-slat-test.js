import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import { fromJS } from 'immutable';
import React from 'react';
import AccountSlat from '../account-slat';
import accountActions from '../../../actions/account-actions';

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

      expect(name.props.children).toEqual('myAccount');
      expect(bank.props.children).toEqual('myBank');
      expect(currentBalance.props.children).toEqual('$ 60.70');
      expect(buttonGroup.props.children.props.title).toEqual('...');
    });
  });

  describe('button actions', () => {
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
  });
});
