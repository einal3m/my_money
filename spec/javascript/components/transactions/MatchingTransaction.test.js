import React from 'react';
import { shallow } from 'enzyme';
import MatchingTransaction from '../matching-transaction';
import FormControl from '../../common/controls/form-control';
import MatchingTransactionSelect from '../../common/controls/matching-transaction-select';

describe('MatchingTransaction', () => {
  const matchingTransactions = [
    { id: 1, accountId: 12, notes: 'transaction one' },
    { id: 2, accountId: 12, notes: 'transaction two' },
  ];

  const accounts = [{ id: 11, name: 'Account One' }, { id: 12, name: 'Account Two' }];

  let onClearSpy;
  let onChangeSpy;
  let props;

  beforeEach(() => {
    onClearSpy = jasmine.createSpy('onClearSpy');
    onChangeSpy = jasmine.createSpy('onChangeSpy');

    props = {
      accounts,
      matchingTransactions,
      matchLoading: false,
      onChange: onChangeSpy,
      onClear: onClearSpy,
    };
  });

  describe('render', () => {
    it('shows the matching transaction if it exists', () => {
      const transaction = {
        matchingTransactionId: 1,
        matchingTransaction: { accountId: 12, notes: 'my Note', memo: 'my Memo' },
      };

      const control = shallow(
        <MatchingTransaction transaction={transaction} {...props} />
      );

      expect(control.type()).toEqual(FormControl);
      expect(control.prop('name')).toEqual('matchingTransactionId');
      expect(control.prop('label')).toEqual('Matching Transaction');

      const matchedTransaction = control.childAt(0).childAt(1);
      expect(matchedTransaction.childAt(0).text()).toEqual('Transfer to: Account Two');
      expect(matchedTransaction.childAt(1).text()).toEqual('Description: my Memo/my Note');
    });

    it('displays a matching transaction select if transaction has not been matched', () => {
      const control = shallow(
        <MatchingTransaction transaction={{}} {...props} />
      );

      expect(control.type()).toEqual(FormControl);
      expect(control.prop('name')).toEqual('matchingTransactionId');
      expect(control.prop('label')).toEqual('Matching Transaction');

      const select = control.childAt(0);
      expect(select.type()).toEqual(MatchingTransactionSelect);
      expect(select.prop('accounts')).toEqual(accounts);
      expect(select.prop('matchingTransactions')).toEqual(matchingTransactions);
      expect(select.prop('loading')).toEqual(false);
      expect(select.prop('allowUnassigned')).toEqual(true);
    });
  });

  describe('events', () => {
    it('click on x icon calls onClear prop', () => {
      const transaction = {
        matchingTransactionId: 1,
        matchingTransaction: { accountId: 12, notes: 'my Note', memo: 'my Memo' },
      };
      const control = shallow(
        <MatchingTransaction transaction={transaction} {...props} />
      );
      const clearIcon = control.find('i');

      clearIcon.prop('onClick')();

      expect(onClearSpy).toHaveBeenCalled();
    });

    it('change select option calls onChange prop', () => {
      const control = shallow(
        <MatchingTransaction transaction={{}} {...props} />
      );
      const select = control.find(MatchingTransactionSelect);

      select.prop('onChange')(2);

      expect(onChangeSpy).toHaveBeenCalledWith(2);
    });
  });
});
