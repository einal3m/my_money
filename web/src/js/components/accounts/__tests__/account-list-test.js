import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import { AccountListComponent as AccountList } from '../account-list';
import PageHeader from '../../common/page-header';
import NewModelButtons from '../../common/controls/new-model-buttons';
import AccountGroup from '../account-group';
import AccountModal from '../account-modal';
import accountActions from '../../../actions/account-actions';

describe('AccountList', () => {
  let accountList;
  const accountTypes = [
    { id: 1, code: 'savings', name: 'Savings' },
    { id: 3, code: 'other', name: 'Other' },
    { id: 2, code: 'share', name: 'Share' },
  ];
  const accountGroups = {
    savings: [{ id: 1, name: 'Account 2', currentBalance: 678 }],
    share: [{ id: 2, name: 'Account 1', currentBalance: 0 }],
  };

  beforeEach(() => {
    spyOn(accountActions, 'getAccounts');
    accountList = shallowRenderer(
      <AccountList loading={false} accountGroups={accountGroups} accountTypes={accountTypes} />
    );
  });

  describe('render', () => {
    it('has a header with new account dropdown button', () => {
      const header = accountList.props.children[0];
      expect(header.type).toEqual(PageHeader);
      expect(header.props.title).toEqual('my accounts');

      const newButtons = header.props.children;
      expect(newButtons.type).toEqual(NewModelButtons);
      expect(newButtons.props.modelTypes).toEqual(['Savings Account', 'Share Account']);
    });

    it('has a list of accountGroups', () => {
      const list = accountList.props.children[1];

      expect(list.props.children.length).toEqual(2);
      expect(list.props.children[0].type).toEqual(AccountGroup);
      expect(list.props.children[0].props.accountType).toEqual(accountTypes[0]);
      expect(list.props.children[0].props.accounts).toEqual(accountGroups.savings);
      expect(list.props.children[1].props.accountType).toEqual(accountTypes[2]);
      expect(list.props.children[1].props.accounts).toEqual(accountGroups.share);
    });

    it('has an account modal', () => {
      const modal = accountList.props.children[2];
      expect(modal.type).toEqual(AccountModal);
    });
  });

  describe('initialise', () => {
    it('calls the getAccounts action', () => {
      expect(accountActions.getAccounts).toHaveBeenCalled();
    });
  });
});
