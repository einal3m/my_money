import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import MatchingTransactionSelect from '../matching-transaction-select';
import DropDown from '../drop-down';

describe('MatchingTransactionSelect', () => {
  let select;
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
    it('is a dropdown with grouped options', () => {
      select = shallowRenderer(
        <MatchingTransactionSelect
          value={12}
          accounts={accounts}
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

    // xit('has a select with a placeholder when value is missing', () => {
    //  select = shallowRenderer(<CategoryTypeSelect categoryTypes={categoryTypes} onChange={onChangeSpy}/>);
    //  expect(select.type).toEqual('select');
    //  expect(select.props.value).toEqual('0');
    //
    //  const [blank, options] = select.props.children;
    //  expect(blank.props.children).toEqual('Please select...');
    //  expect(options.length).toEqual(2);
    //  expect(options[0].props.children).toEqual('One');
    //  expect(options[1].props.children).toEqual('Two');
    // });
  });

  // xdescribe('onChange', () => {
  //  it('calls the onChange prop', () => {
  //    select = shallowRenderer(
  //      <CategoryTypeSelect value={2} categoryTypes={categoryTypes} onChange={onChangeSpy}/>
  //    );
  //
  //    select.props.onChange({ target: { name: 'categoryTypeId', value: '2' } });
  //
  //    expect(onChangeSpy).toHaveBeenCalledWith({ target: { name: 'categoryTypeId', value: 2 } });
  //  });
  // });
});
