import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';

import accountActions from '../../../../actions/account-actions';
import AccountPicker from '../account-picker';
import { DropdownButton, MenuItem } from 'react-bootstrap';

describe('AccountPicker', () => {
  let accountPicker,
    accountTypes,
    accountGroups,
    onChangeSpy;
  beforeEach(() => {
    accountTypes = [
      { id: 1, code: 'savings', name: 'Savings' },
      { id: 3, code: 'other', name: 'Other' },
      { id: 2, code: 'share', name: 'Share' },
    ];

    accountGroups = {
      savings: [{ id: 2, name: 'oneAccount' }],
      share: [{ id: 1, name: 'myAccount' }, { id: 3, name: 'anotherAccount' }],
    };

    onChangeSpy = jasmine.createSpy('onChangeSpy');
  });

  describe('render', () => {
    it('multiple has a dropdown button with some menu items selected', () => {
      accountPicker = shallowRenderer(
        <AccountPicker multiple accountTypes={accountTypes} accountGroups={accountGroups}
          value={[2, 1]} onChange={onChangeSpy}
        />
      );

      let [label, dropdown] = accountPicker.props.children.props.children;

      expect(label.props.children).toEqual('Accounts');

      const button = dropdown.props.children;
      expect(button.type).toEqual(DropdownButton);
      expect(button.props.title).toEqual('Add/Remove Accounts...');

      const menuItems = button.props.children;
      expect(menuItems.length).toEqual(6);

      expect(menuItems[0].props.children).toEqual('Savings');
      expect(menuItems[1].props.children).toEqual('✓ oneAccount');
      expect(menuItems[2].props.divider).toEqual(true);
      expect(menuItems[3].props.children).toEqual('Share');
      expect(menuItems[4].props.children).toEqual('   anotherAccount');
      expect(menuItems[5].props.children).toEqual('✓ myAccount');
    });

    it('multiple false has a dropdown button with one menu item selected', () => {
      accountPicker = shallowRenderer(
        <AccountPicker accountTypes={accountTypes} accountGroups={accountGroups}
          value={1} onChange={onChangeSpy}
        />
      );

      let [label, dropdown] = accountPicker.props.children.props.children;

      expect(label.props.children).toEqual('Accounts');

      const button = dropdown.props.children;
      expect(button.type).toEqual(DropdownButton);
      expect(button.props.title).toEqual('myAccount');

      const menuItems = button.props.children;
      expect(menuItems.length).toEqual(6);

      expect(menuItems[0].props.children).toEqual('Savings');
      expect(menuItems[1].props.children).toEqual('   oneAccount');
      expect(menuItems[2].props.divider).toEqual(true);
      expect(menuItems[3].props.children).toEqual('Share');
      expect(menuItems[4].props.children).toEqual('   anotherAccount');
      expect(menuItems[5].props.children).toEqual('✓ myAccount');
    });
  });

  describe('events', () => {
    it('selecting menuitem calls the onChange prop', () => {
      accountPicker = TestUtils.renderIntoDocument(
        <AccountPicker multiple accountTypes={accountTypes} accountGroups={accountGroups}
          value={[2, 1]} onChange={onChangeSpy}
        />
      );

      accountPicker.refs.dropdown.props.onSelect({}, '4');
      expect(onChangeSpy).toHaveBeenCalledWith(4);
    });
  });
});
