import shallowRenderer from '../../util/__tests__/shallow-renderer';
import React from 'react';
import AccountSlat from '../account-slat';

describe('AccountSlat', () => {
  let account, accountSlat;
  beforeEach(() => {
    account = { name: 'myAccount', bank: 'myBank', current_balance: '60.78' };
    accountSlat = shallowRenderer(<AccountSlat account={account} />);
  });

  it('has the account information', () => {
    let [info, balance] = accountSlat.props.children.props.children[1].props.children.props.children;
    let [name, bank] = info.props.children;
    let currentBalance = balance.props.children;

    expect(name.props.children).toEqual('myAccount');
    expect(bank.props.children).toEqual('myBank');
    expect(currentBalance.props.children).toEqual('$60.78');
  });
});
