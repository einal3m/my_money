import React from 'react';
import TestUtils from 'react-addons-test-utils';
import moment from 'moment';
import { Tabs } from 'react-bootstrap';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import BankTransactionForm from '../bank-transaction-form';
import DatePicker from '../../common/date-picker/date-picker';
import GroupedCategorySelect from '../../common/controls/grouped-category-select';
import SubcategoryPicker from '../../common/controls/subcategory-picker';
import MatchingTransactionSelect from '../../common/controls/matching-transaction-select';
import FormControl from '../../common/controls/form-control';
import MoneyInput from '../../common/controls/money-input';
import * as matchingTransactionsActions from '../../../actions/matching-transactions-actions';

describe('BankTransactionForm', () => {
  const groupedCategories = [
    {
      categoryType: { id: 1, name: 'Expense' },
      categories: [
        { id: 3, name: 'Cat', subcategories: [{ id: 5, name: 'Dog' }, { id: 6, name: 'Horse' }] },
        { id: 4, name: 'Mouse', subcategories: [{ id: 5, name: 'Cow' }] },
      ],
    },
  ];

  const accounts = [{ id: 11, name: 'Account One' }, { id: 12, name: 'Account Two' }];
  const transaction = {
    id: 22,
    accountId: 11,
    date: '2015-12-19',
    amount: 300,
    notes: 'This is a note',
    memo: 'This is a memo',
    balance: 6070,
    categoryId: 3,
    subcategoryId: 5,
  };

  const matchingTransactions = [
    { id: 1, accountId: 12, notes: 'transaction one' },
    { id: 2, accountId: 12, notes: 'transaction two' },
  ];

  beforeEach(() => {
    spyOn(matchingTransactionsActions, 'getMatchingTransactions');
  });

  describe('component did mount', () => {
    it('gets the matching transactions', () => {
      TestUtils.renderIntoDocument(
        <BankTransactionForm
          transaction={transaction}
          groupedCategories={groupedCategories}
          accounts={accounts}
          matchLoading={false}
          matchingTransactions={[]}
        />
      );

      expect(matchingTransactionsActions.getMatchingTransactions).toHaveBeenCalledWith(transaction.id);
    });
  });

  describe('render', () => {
    it('has a control for each editable property', () => {
      const form = shallowRenderer(
        <BankTransactionForm
          transaction={transaction}
          groupedCategories={groupedCategories}
          accounts={accounts}
          matchLoading={false}
          matchingTransactions={[]}
        />
      );
      const [date, amount, memo, notes, tabs] = form.props.children;
      const [category, subcategory] = tabs.props.children[0].props.children;

      expect(date.type).toEqual(FormControl);
      expect(date.props.name).toEqual('date');
      expect(date.props.label).toEqual('Date');
      expect(date.props.children.type).toEqual(DatePicker);
      expect(date.props.children.props.value).toEqual(moment('2015-12-19').format('YYYY-MM-DD'));

      expect(amount.type).toEqual(FormControl);
      expect(amount.props.name).toEqual('amount');
      expect(amount.props.label).toEqual('Amount');
      expect(amount.props.children.type).toEqual(MoneyInput);
      expect(amount.props.children.props.value).toEqual(300);

      expect(memo.type).toEqual(FormControl);
      expect(memo.props.name).toEqual('memo');
      expect(memo.props.label).toEqual('Memo');
      expect(memo.props.children.props.children).toEqual('This is a memo');

      expect(notes.type).toEqual(FormControl);
      expect(notes.props.name).toEqual('notes');
      expect(notes.props.label).toEqual('Notes');
      expect(notes.props.children.type).toEqual('input');
      expect(notes.props.children.props.value).toEqual('This is a note');

      expect(category.type).toEqual(FormControl);
      expect(category.props.name).toEqual('categoryId');
      expect(category.props.label).toEqual('Category');
      expect(category.props.children.type).toEqual(GroupedCategorySelect);
      expect(category.props.children.props.groupedCategories).toEqual(groupedCategories);
      expect(category.props.children.props.value).toEqual(3);
      expect(category.props.children.props.allowUnassigned).toEqual(true);

      expect(subcategory.type).toEqual(FormControl);
      expect(subcategory.props.name).toEqual('subcategoryId');
      expect(subcategory.props.label).toEqual('Subcategory');
      expect(subcategory.props.children.type).toEqual(SubcategoryPicker);
      expect(subcategory.props.children.props.groupedCategories).toEqual(groupedCategories);
      expect(subcategory.props.children.props.categoryId).toEqual(3);
      expect(subcategory.props.children.props.value).toEqual(5);
    });

    it('does not display subcategory picker if category id is null or memo if memo is null', () => {
      const form = shallowRenderer(
        <BankTransactionForm
          transaction={{ }}
          groupedCategories={groupedCategories}
          accounts={accounts}
          matchLoading={false}
          matchingTransactions={[]}
        />
      );
      const [date, amount, memo, notes, tabs] = form.props.children;
      const [category, subcategory] = tabs.props.children[0].props.children;

      expect(date.props.label).toEqual('Date');
      expect(amount.props.label).toEqual('Amount');
      expect(memo).toEqual(<div />);
      expect(notes.props.label).toEqual('Notes');
      expect(category.props.label).toEqual('Category');
      expect(subcategory).toEqual(<div />);
    });
  });

  describe('transfer or category', () => {
    it('removes category/subcategory when transfer tab is selected', () => {
      const form = TestUtils.renderIntoDocument(
        <BankTransactionForm
          transaction={transaction}
          groupedCategories={groupedCategories}
          accounts={accounts}
          matchLoading
          matchingTransactions={matchingTransactions}
        />
      );

      const tabs = TestUtils.findRenderedComponentWithType(form, Tabs);
      tabs.props.onSelect('transfer');

      expect(form.getModel().categoryId).toEqual(null);
      expect(form.getModel().subcategoryId).toEqual(null);
    });

    it('removes category/subcategory when transfer tab is selected', () => {
      const transactionWithMatch = {
        id: 22,
        accountId: 11,
        date: '2015-12-19',
        amount: 300,
        notes: 'This is a note',
        memo: 'This is a memo',
        balance: 6070,
        matchedTransactionId: 1,
        matchedTransaction: matchingTransactions[0],
      };

      const form = TestUtils.renderIntoDocument(
        <BankTransactionForm
          transaction={transactionWithMatch}
          groupedCategories={groupedCategories}
          accounts={accounts}
          matchLoading
          matchingTransactions={matchingTransactions}
        />
      );

      const tabs = TestUtils.findRenderedComponentWithType(form, Tabs);
      tabs.props.onSelect('category');

      expect(form.getModel().matchedTransactionId).toEqual(null);
      expect(form.getModel().matchedTransaction).toEqual(null);
    });
  });

  describe('isValid', () => {
    let form;
    beforeEach(() => {
      form = TestUtils.renderIntoDocument(
        <BankTransactionForm
          transaction={transaction}
          groupedCategories={groupedCategories}
          accounts={accounts}
          matchLoading={false}
          matchingTransactions={[]}
        />
      );
    });

    it('returns true if all fields are valid', () => {
      spyOn(form, 'forceUpdate');
      expect(form.isValid()).toEqual(true);
      expect(form.forceUpdate).toHaveBeenCalled();
    });

    it('returns false if any fields are invalid', () => {
      form.state.transaction.date = 'giraffe';
      expect(form.isValid()).toEqual(false);
    });
  });

  describe('updating state and validation', () => {
    let form;
    beforeEach(() => {
      form = TestUtils.renderIntoDocument(
        <BankTransactionForm
          transaction={transaction}
          groupedCategories={groupedCategories}
          accounts={accounts}
          matchLoading
          matchingTransactions={matchingTransactions}
        />
      );
    });

    it('sets the transaction type to bank_transaction', () => {
      expect(form.state.transaction.transactionType).toEqual('bank_transaction');
    });

    it('updates state and validates date is required and is a date', () => {
      const date = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[0];

      date.value = 'something';
      TestUtils.Simulate.change(date);
      TestUtils.Simulate.blur(date);
      expect(form.state.transaction.date).toEqual(null);
      expect(form.validator.errorState('date')).toEqual('has-error');
      expect(form.validator.errorFor('date')).toEqual('Date is required');

      date.value = '19-Dec-2015';
      TestUtils.Simulate.change(date);
      TestUtils.Simulate.blur(date);
      expect(form.state.transaction.date).toEqual('2015-12-19');
      expect(form.validator.errorState('date')).toEqual('has-success');
      expect(form.validator.errorFor('date')).toBeUndefined();
    });

    it('updates state and validates amount is required and is a number', () => {
      const amount = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[1];

      amount.value = '';
      TestUtils.Simulate.blur(amount);
      expect(form.state.transaction.amount).toEqual('');
      expect(form.validator.errorState('amount')).toEqual('has-error');
      expect(form.validator.errorFor('amount')).toEqual('Amount is required');

      amount.value = 'dd';
      TestUtils.Simulate.blur(amount);
      expect(form.state.transaction.amount).toEqual('dd');
      expect(form.validator.errorState('amount')).toEqual('has-error');
      expect(form.validator.errorFor('amount')).toEqual('Amount is not a number');

      amount.value = '19.15';
      TestUtils.Simulate.blur(amount);
      expect(form.state.transaction.amount).toEqual(1915);
      expect(form.validator.errorState('amount')).toEqual('has-success');
      expect(form.validator.errorFor('amount')).toBeUndefined();
    });

    it('updates notes in state', () => {
      const notes = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[2];

      notes.value = 'this is a note';
      TestUtils.Simulate.change(notes);
      expect(form.state.transaction.notes).toEqual('this is a note');
      expect(form.validator.errorState('notes')).toEqual('has-success');
      expect(form.validator.errorFor('notes')).toBeUndefined();
    });

    it('updates category in state, sets subcategory to null', () => {
      const category = TestUtils.findRenderedComponentWithType(form, GroupedCategorySelect);

      category.props.onChange({ target: { name: 'categoryId', value: 4 } });
      expect(form.state.transaction.categoryId).toEqual(4);
      expect(form.state.transaction.subcategoryId).toEqual(null);
      expect(form.validator.errorState('categoryId')).toEqual('has-success');
      expect(form.validator.errorFor('categoryId')).toBeUndefined();
    });

    it('updates subcategory in state', () => {
      const subcategoryPicker = TestUtils.findRenderedComponentWithType(form, SubcategoryPicker);

      subcategoryPicker.props.onChange(6);
      expect(form.state.transaction.subcategoryId).toEqual(6);
      expect(form.validator.errorState('subcategoryId')).toEqual('has-success');
      expect(form.validator.errorFor('subcategoryId')).toBeUndefined();
    });

    it('updates matching transaction in state', () => {
      const matchingTransaction = TestUtils.findRenderedComponentWithType(form, MatchingTransactionSelect);

      matchingTransaction.props.onChange(1);
      expect(form.state.transaction.matchingTransactionId).toEqual(1);
      expect(form.state.transaction.matchingTransaction).toEqual(matchingTransactions[0]);
      expect(form.validator.errorState('matchingTransactionId')).toEqual('has-success');
      expect(form.validator.errorFor('matchingTransactionId')).toBeUndefined();
    });
  });
});
