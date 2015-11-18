import shallowRenderer from '../../util/__tests__/shallow-renderer';
import React from 'react';
import AccountList from '../account-list';
import AccountSlat from '../account-slat';
import PageHeader from '../../common/page-header';
import { Button } from 'react-bootstrap';

describe('AccountList', () => {
  let accounts, accountList;
  beforeEach(() => {
    accounts = [
      {id: 1, name: 'Savings Maximizer', bank: 'ING', current_balance: '50.44'},
      {id: 2, name: 'Everyday Savings', bank: 'CBA', current_balance: '2,456.09'}
    ]

    accountList = shallowRenderer(<AccountList />);
  });

  it('has a header and a table of accounts', () => {
    let [header, table] = accountList.props.children;

    expect(header.type).toEqual(PageHeader);
    expect(header.props.children.type).toEqual(Button);
  });

  it('has a list of accounts', () => {
    let [header, listGroup] = accountList.props.children;
    let [title, list] = listGroup.props.children;

    expect(title.props.children).toEqual('Savings Accounts');
    expect(list.props.children.length).toEqual(2);
    expect(list.props.children[0].type).toEqual(AccountSlat);
    expect(list.props.children[0].props.account).toEqual(accounts[0]);
  });
});
