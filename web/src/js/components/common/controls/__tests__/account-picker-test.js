import React from 'react';
import Select from '../select';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import AccountPicker from '../account-picker';

describe('AccountPicker', () => {
  let accountPicker;
  let onChangeSpy;

  const accountTypes = [
    { id: 1, code: 'savings', name: 'Savings' },
    { id: 3, code: 'other', name: 'Other' },
    { id: 2, code: 'share', name: 'Share' },
  ];

  const accountGroups = {
    savings: [{ id: 2, name: 'oneAccount' }],
    share: [{ id: 1, name: 'myAccount' }, { id: 3, name: 'anotherAccount' }],
  };

  beforeEach(() => {
    onChangeSpy = jasmine.createSpy('onChangeSpy');
  });

  describe('render', () => {
    it('renders a react select with multiple values', () => {
      accountPicker = shallowRenderer(
        <AccountPicker
          multiple
          accountTypes={accountTypes}
          accountGroups={accountGroups}
          value={[2, 1]}
          onChange={onChangeSpy}
        />
      );

      const [label, select] = accountPicker.props.children.props.children;

      expect(label.props.children).toEqual('Accounts');

      expect(select.props.children.type).toEqual(Select);
      expect(select.props.children.props.name).toEqual('accountId');
      expect(select.props.children.props.value).toEqual([2,1]);
      expect(select.props.children.props.multiple).toEqual(true);
      expect(select.props.children.props.groupedOptions).toEqual([
        { name: 'Savings', options: accountGroups.savings },
        { name: 'Share', options: accountGroups.share },
      ]);
    });

    it('renders a react select with single value', () => {
      accountPicker = shallowRenderer(
        <AccountPicker
          accountTypes={accountTypes}
          accountGroups={accountGroups}
          value={1}
          onChange={onChangeSpy}
        />
      );
      const [label, select] = accountPicker.props.children.props.children;

      expect(label.props.children).toEqual('Accounts');

      expect(select.props.children.props.value).toEqual(1);
      expect(select.props.children.props.multiple).toEqual(false);
    });
  });

  describe('events', () => {
    it('select onChange prop calls onChange', () => {
      accountPicker = shallowRenderer(
        <AccountPicker
          multiple
          accountTypes={accountTypes}
          accountGroups={accountGroups}
          value={[2, 1]}
          onChange={onChangeSpy}
        />
      );

      const select = accountPicker.props.children.props.children[1].props.children;

      select.props.onChange(4);
      expect(onChangeSpy).toHaveBeenCalledWith(4);
    });
  });
});
