import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import { AccountList } from '../account-list';
import AccountGroup from '../account-group';
import PageHeader from '../../common/page-header';
import { Button } from 'react-bootstrap';

describe('AccountList', () => {
  let accountGroups, accountList;
  beforeEach(() => {
    accountGroups = [
      {code: 'savings', accounts: [{id: 1, name: 'Account 2', current_balance: 678}]},
      {code: 'other', accounts: []},
      {code: 'shares', accounts: [{id: 2, name: 'Account 1', current_balance: 0}]},
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

  describe('new account modal', () => {
    beforeEach(() => {
      accountList = TestUtils.renderIntoDocument(<AccountList loading={false} accountGroups={accountGroups}/>);
    });

    it('does not show modal by default', () => {
      expect(accountList.refs.newAccountModal).toBeUndefined();
    });

    it('shows modal when you click on the new account button', () => {
      accountList.refs.newAccountButton.props.onClick();
      let modal = accountList.refs.newAccountModal
      expect(modal).toBeDefined();
    });

    it('closes modal when modals onClose function called', () => {
      accountList.refs.newAccountButton.props.onClick();
      accountList.refs.newAccountModal.props.onClose();
      expect(accountList.refs.newAccountModal).toBeUndefined();
    });
  });
});
