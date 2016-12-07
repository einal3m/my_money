import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import * as accountActions from '../../../../actions/account-actions';
import { AccountFilterComponent as AccountFilter } from '../account-filter';
import AccountPicker from '../../controls/account-picker';

describe('AccountFilter', () => {
  const accountTypes = [
    { id: 1, code: 'savings', name: 'Savings' },
    { id: 3, code: 'other', name: 'Other' },
    { id: 2, code: 'share', name: 'Share' },
  ];
  const currentAccount = { id: 1, name: 'Account 1' };
  const accountGroups = {
    savings: [{ id: 2, name: 'Account 2' }],
    share: [currentAccount, { id: 3, name: 'Account 3' }],
  };

  let fetchSpy;

  beforeEach(() => {
    fetchSpy = jasmine.createSpy('fetchSpy');
  });

  describe('render', () => {
    it('does not render if accounts are not loaded', () => {
      const accountFilter = shallowRenderer(
        <AccountFilter
          loaded={false}
          accountTypes={accountTypes}
          fetch={fetchSpy}
          accountGroups={accountGroups}
          currentAccount={currentAccount}
        />
      );
      const dropdown = accountFilter.props.children.props.children;
      expect(dropdown).toEqual(<div />);
    });

    it('has a select with single value', () => {
      const accountFilter = shallowRenderer(
        <AccountFilter
          loaded
          accountTypes={accountTypes}
          accountGroups={accountGroups}
          fetch={fetchSpy}
          currentAccount={currentAccount}
        />
      );
      const dropdown = accountFilter.props.children.props.children;

      expect(dropdown.type).toEqual(AccountPicker);
      expect(dropdown.props.value).toEqual(currentAccount.id);
      expect(dropdown.props.accountTypes).toEqual(accountTypes);
      expect(dropdown.props.accountGroups).toEqual(accountGroups);
    });

    it('has a select with multiple values', () => {
      const accountFilter = shallowRenderer(
        <AccountFilter
          loaded
          multiple
          accountTypes={accountTypes}
          accountGroups={accountGroups}
          fetch={fetchSpy}
          selectedAccounts={[1, 2]}
        />
      );
      const dropdown = accountFilter.props.children.props.children;

      expect(dropdown.type).toEqual(AccountPicker);
      expect(dropdown.props.value).toEqual([1, 2]);
      expect(dropdown.props.accountTypes).toEqual(accountTypes);
      expect(dropdown.props.accountGroups).toEqual(accountGroups);
    });

    describe('on Change', () => {
      it('single account picker on change calls an action', () => {
        spyOn(accountActions, 'setCurrentAccount');
        spyOn(accountActions, 'toggleSelectedAccount');

        const accountFilter = shallowRenderer(
          <AccountFilter
            loaded
            accountTypes={accountTypes}
            accountGroups={accountGroups}
            fetch={fetchSpy}
            currentAccount={currentAccount}
          />
        );
        const dropdown = accountFilter.props.children.props.children;

        dropdown.props.onChange(5);
        expect(accountActions.setCurrentAccount).toHaveBeenCalledWith(5);
        expect(accountActions.toggleSelectedAccount).not.toHaveBeenCalled();
        expect(fetchSpy).toHaveBeenCalled();
      });

      it('multiple account picker on change calls an action', () => {
        spyOn(accountActions, 'setCurrentAccount');
        spyOn(accountActions, 'toggleSelectedAccount');

        const accountFilter = shallowRenderer(
          <AccountFilter
            loaded
            multiple
            accountTypes={accountTypes}
            accountGroups={accountGroups}
            fetch={fetchSpy}
            selectedAccounts={[1, 2]}
          />
        );
        const dropdown = accountFilter.props.children.props.children;

        dropdown.props.onChange(5);
        expect(accountActions.setCurrentAccount).toHaveBeenCalledWith(5);
        expect(accountActions.toggleSelectedAccount).toHaveBeenCalledWith(5);
        expect(fetchSpy).toHaveBeenCalled();
      });
    });
  });
});
