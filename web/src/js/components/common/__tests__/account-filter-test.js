import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import AccountFilter from '../account-filter';
import { Input } from 'react-bootstrap';

describe('AccountFilter', () => {
  describe('render', () => {
    it('has a select with account groups', () => {
      let accountGroups = [
        { code: 'savings', name: 'Savings', accounts: [{ id: 2, name: 'Account 2' }] },
        { code: 'other', name: 'Other', accounts: [] },
        { code: 'share', name: 'Share', accounts: [ { id: 1, name: 'Account 1' }, { id: 3, name: 'Account 3' } ] }
      ];

      let accountFilter = shallowRenderer(<AccountFilter accountGroups={accountGroups}/>);
      let dropdown = accountFilter.props.children.props.children;

      expect(dropdown.type).toEqual(Input);
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
});