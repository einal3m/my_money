import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import MatchingTransactionSelect from '../matching-transaction-select';
import DropDown from '../drop-down';

describe('MatchingTransactionSelect', () => {
  const accounts = [{ id: 1, name: 'Account One' }, { id: 2, name: 'Account Two' }];
  const matchingTransactions = [
    { id: 11, accountId: 2, memo: 'Memo One', notes: 'Notes One' },
    { id: 12, accountId: 1, memo: 'Memo Two', notes: 'Notes Two' },
  ];
  let onChangeSpy;
  beforeEach(() => {
    onChangeSpy = jasmine.createSpy('onChangeSpy');
  });

  describe('render', () => {
    it('displays loading text when loading', () => {
      const select = shallowRenderer(
        <MatchingTransactionSelect
          value={null}
          accounts={accounts}
          loading
          matchingTransactions={[]}
          onChange={onChangeSpy}
        />
      );

      expect(select.props.children).toEqual('Loading...');
    });

    it('displays text when no matching transactions found', () => {
      const select = shallowRenderer(
        <MatchingTransactionSelect
          value={null}
          accounts={accounts}
          loading={false}
          matchingTransactions={[]}
          onChange={onChangeSpy}
        />
      );

      expect(select.props.children).toEqual('No matching transactions found.');
    });

    it('is a dropdown with grouped options', () => {
      const select = shallowRenderer(
        <MatchingTransactionSelect
          value={12}
          accounts={accounts}
          loading={false}
          matchingTransactions={matchingTransactions}
          onChange={onChangeSpy}
        />
      );

      expect(select.type).toEqual(DropDown);
      expect(select.props.value).toEqual(12);
      expect(select.props.allowUnassigned).toEqual(false);

      const expectedGroupedOptions = [
        { name: 'Account One', options: [{ id: 12, name: 'Memo Two/Notes Two' }] },
        { name: 'Account Two', options: [{ id: 11, name: 'Memo One/Notes One' }] },
      ];

      expect(select.props.groupedOptions).toEqual(expectedGroupedOptions);
    });
  });

  describe('onChange', () => {
    it('calls the onChange prop', () => {
      const select = shallowRenderer(
        <MatchingTransactionSelect
          value={12}
          accounts={accounts}
          loading={false}
          matchingTransactions={matchingTransactions}
          onChange={onChangeSpy}
        />
      );

      select.props.onChange(2);

      expect(onChangeSpy).toHaveBeenCalledWith(2);
    });
  });
});
