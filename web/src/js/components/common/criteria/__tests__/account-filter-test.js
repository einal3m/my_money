import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import accountActions from '../../../../actions/account-actions';
import { AccountFilter } from '../account-filter';
import TestUtils from 'react-addons-test-utils';
import { Input } from 'react-bootstrap';

describe('AccountFilter', () => {
  let accountTypes, accountGroups, currentAccount, fetchSpy;
  beforeEach(() => {
    accountTypes = [
      { id: 1, code: 'savings', name: 'Savings' },
      { id: 3, code: 'other', name: 'Other' },
      { id: 2, code: 'share', name: 'Share' }
    ];

    currentAccount = { id: 1, name: 'Account 1' };
    accountGroups = {
      'savings': [ { id: 2, name: 'Account 2' } ],
      'share': [ currentAccount, { id: 3, name: 'Account 3' } ]
    };

    fetchSpy = jasmine.createSpy('fetchSpy');
    spyOn(accountActions, 'getAccounts');
  });

  describe('render', () => {
    it('does not render if accounts are not loaded', () => {
      let accountFilter = shallowRenderer(<AccountFilter loaded={false} accountTypes={accountTypes}
                                                         fetch={fetchSpy} accountGroups={accountGroups}
                                                         currentAccount={currentAccount}/>);
      expect(accountFilter.props.children).toBeUndefined();
      expect(accountActions.getAccounts).toHaveBeenCalled();
    });

    it('has a select with account groups', () => {
      let accountFilter = shallowRenderer(
        <AccountFilter loaded accountTypes={accountTypes} accountGroups={accountGroups}
           fetch={fetchSpy} currentAccount={currentAccount}/>
      );
      let dropdown = accountFilter.props.children.props.children;

      expect(dropdown.type).toEqual(Input);
      expect(dropdown.props.value).toEqual(currentAccount.id);
      let [accountGroup1, accountGroup2] = dropdown.props.children;

      expect(accountGroup1.props.label).toEqual('Savings Accounts');
      expect(accountGroup1.type).toEqual('optgroup');

      let account2 = accountGroup1.props.children[0];
      expect(account2.type).toEqual('option');
      expect(account2.props.children).toEqual('Account 2');

      expect(accountGroup2.props.label).toEqual('Share Accounts');

      let account1 = accountGroup2.props.children[0];
      expect(account1.type).toEqual('option');
      expect(account1.props.children).toEqual('Account 1');

      let account3 = accountGroup2.props.children[1];
      expect(account3.type).toEqual('option');
      expect(account3.props.children).toEqual('Account 3');
    });
  });

  describe('select account', () => {
    it('calls an action', () => {
      spyOn(accountActions, 'setCurrentAccount');

      let accountFilter = TestUtils.renderIntoDocument(
        <AccountFilter accountTypes={accountTypes} accountGroups={accountGroups} fetch={fetchSpy}
          currentAccount={currentAccount} onChange={fetchSpy} loaded />
      );
      accountFilter.refs.accountSelect.props.onChange({target: {value: '6'}});

      expect(accountActions.setCurrentAccount).toHaveBeenCalledWith(6);
      expect(fetchSpy).toHaveBeenCalled();
    });
  });
});