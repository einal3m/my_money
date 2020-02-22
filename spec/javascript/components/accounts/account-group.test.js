import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import AccountGroup from '../account-group';
import AccountSlat from '../account-slat';

describe('AccountGroup', () => {
  it('has a title and a table of accounts', () => {
    const accountType = { id: 1, code: 'savings', name: 'Savings' };
    const accounts = [
      { id: 1, accountType: 'savings', name: 'Savings Maximizer', bank: 'ING', currentBalance: 50.44 },
      { id: 2, accountType: 'savings', name: 'Everyday Savings', bank: 'CBA', currentBalance: 2456.09 },
    ];
    const accountGroup = shallowRenderer(<AccountGroup accountType={accountType} accounts={accounts} />);

    const [title, listGroup] = accountGroup.props.children;

    expect(title.type).toEqual('h3');
    expect(title.props.children).toEqual('Savings Accounts');

    expect(listGroup.props.children.length).toEqual(2);
    expect(listGroup.props.children[0].type).toEqual(AccountSlat);
    expect(listGroup.props.children[0].props.account).toEqual(accounts[0]);
    expect(listGroup.props.children[1].type).toEqual(AccountSlat);
    expect(listGroup.props.children[1].props.account).toEqual(accounts[1]);
  });
});
