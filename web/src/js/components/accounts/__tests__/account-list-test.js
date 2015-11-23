import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import { AccountList } from '../account-list';
import AccountGroup from '../account-group';
import PageHeader from '../../common/page-header';
import { Dropdown, MenuItem } from 'react-bootstrap';
import accountActions from '../../../actions/account-actions';

describe('AccountList', () => {
  let accountGroups, accountList;
  beforeEach(() => {
    accountGroups = [
      {code: 'savings', accounts: [{id: 1, name: 'Account 2', currentBalance: 678}]},
      {code: 'other', accounts: []},
      {code: 'shares', accounts: [{id: 2, name: 'Account 1', currentBalance: 0}]},
    ];

    accountList = shallowRenderer(<AccountList loading={false} accountGroups={accountGroups}/>);
  });

  it('has a header with new account dropdown button', () => {
    let [header, listGroup] = accountList.props.children;
    let [dropdown, buttons] = header.props.children.props.children;

    expect(header.type).toEqual(PageHeader);
    expect(header.props.children.type).toEqual(Dropdown);
    expect(dropdown.props.children[1]).toMatch(/New Account/);
    expect(buttons.props.children[0].type).toEqual(MenuItem);
    expect(buttons.props.children[0].props.children).toEqual('New Savings Account');

    expect(buttons.props.children[1].type).toEqual(MenuItem);
    expect(buttons.props.children[1].props.children).toEqual('New Share Account');
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

    it('shows savings modal when you click on the new savings account button', () => {
      accountList.refs.newAccountButton.props.onSelect(null, '1');
      let modal = accountList.refs.newAccountModal
      expect(modal).toBeDefined();
      expect(modal.props.accountType).toEqual('savings');
    });

    it('shows share modal when you click on the new share account button', () => {
      accountList.refs.newAccountButton.props.onSelect(null, '2');
      let modal = accountList.refs.newAccountModal
      expect(modal).toBeDefined();
      expect(modal.props.accountType).toEqual('share');
    });

    it('closes modal when modals onClose function called', () => {
      accountList.refs.newAccountButton.props.onSelect(null, '1');
      accountList.refs.newAccountModal.props.onClose();
      expect(accountList.refs.newAccountModal).toBeUndefined();
    });

    it('modals onSave function calls the create account action', () =>{
      spyOn(accountActions, 'createAccount');
      accountList.refs.newAccountButton.props.onSelect(null, '1');
      let modal = accountList.refs.newAccountModal

      modal.props.onSave('account');
      expect(accountActions.createAccount).toHaveBeenCalledWith('account');
    });
  });
});
