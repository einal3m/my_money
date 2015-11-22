import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import AccountGroup from '../account-group';
import AccountSlat from '../account-slat';

describe('AccountGroup', () => {
  let accounts, accountGroup, accountGroupComponent;
  beforeEach(() => {
    accounts = [
      {id: 1, name: 'Savings Maximizer', bank: 'ING', currentBalance: 50.44},
      {id: 2, name: 'Everyday Savings', bank: 'CBA', currentBalance: 2456.09}
    ]

    accountGroup = {name: 'Savings', accounts: accounts};

    accountGroupComponent = shallowRenderer(<AccountGroup accountGroup={accountGroup}/>);
  });

  it('has a title and a table of accounts', () => {
    let [title, listGroup] = accountGroupComponent.props.children;

    expect(title.type).toEqual('h3');
    expect(title.props.children).toEqual('Savings Accounts');
  });

  it('has a list of accounts', () => {
    let [title, list] = accountGroupComponent.props.children;

    expect(list.props.children.length).toEqual(2);
    expect(list.props.children[0].type).toEqual(AccountSlat);
    expect(list.props.children[0].props.account).toEqual(accounts[0]);
    expect(list.props.children[1].type).toEqual(AccountSlat);
    expect(list.props.children[1].props.account).toEqual(accounts[1]);
  });
});
