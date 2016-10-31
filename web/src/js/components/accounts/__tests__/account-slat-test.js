import React from 'react';
import TestUtils from 'react-addons-test-utils';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import AccountSlat from '../account-slat';
import AccountIcon from '../account-icon';
import AccountActionButtons from '../account-action-buttons';
import Balance from '../../common/balance';
import * as routingActions from '../../../actions/routing-actions';

describe('AccountSlat', () => {
  const account = { id: 22, accountType: 'savings', name: 'myAccount', bank: 'myBank', currentBalance: 6070 };
  let accountSlat;

  describe('render', () => {
    it('has the account information', () => {
      accountSlat = shallowRenderer(<AccountSlat account={account} />);
      const icon = accountSlat.props.children.props.children[0];
      const [info, balance, buttonGroup] = accountSlat.props.children.props.children[1].props.children.props.children;
      const [name, bank] = info.props.children;
      const currentBalance = balance.props.children;

      expect(icon.props.children.type).toEqual(AccountIcon);
      expect(name.props.children.props.children).toEqual('myAccount');
      expect(bank.props.children).toEqual('myBank');
      expect(currentBalance.type).toEqual(Balance);
      expect(currentBalance.props.balance).toEqual(6070);
      expect(buttonGroup.props.children.type).toEqual(AccountActionButtons);
    });
  });

  describe('actions', () => {
    describe('view transactions', () => {
      it('from name link - sets the current account account and navigates to transaction page', () => {
        spyOn(routingActions, 'routeToTransactions');

        accountSlat = TestUtils.renderIntoDocument(<AccountSlat account={account} />);
        const nameLink = TestUtils.findRenderedDOMComponentWithClass(accountSlat, 'name-link');

        TestUtils.Simulate.click(nameLink);

        expect(routingActions.routeToTransactions).toHaveBeenCalledWith(22);
      });
    });
  });
});
