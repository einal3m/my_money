import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import { AccountList } from '../account-list';
import AccountGroup from '../account-group';
import PageHeader from '../../common/page-header';
import { Button } from 'react-bootstrap';

describe('AccountList', () => {
  let accountGroups, accountList;
  beforeEach(() => {
    accountGroups = [
      {code: 'savings', accounts: ['savings accounts']},
      {code: 'other', accounts: []},
      {code: 'shares', accounts: ['share accounts']},
    ];

    accountList = shallowRenderer(<AccountList loading={false} accountGroups={accountGroups}/>);
  });

  it('has a header and a table of accounts', () => {
    let [header, listGroup] = accountList.props.children;

    expect(header.type).toEqual(PageHeader);
    expect(header.props.children.type).toEqual(Button);
  });

  it('has a list of accountGroups', () => {
    let [header, list] = accountList.props.children;

    expect(list.props.children.length).toEqual(2);
    expect(list.props.children[0].type).toEqual(AccountGroup);
    expect(list.props.children[0].props.accountGroup).toEqual(accountGroups[0]);
    expect(list.props.children[1].props.accountGroup).toEqual(accountGroups[2]);
  });
});
