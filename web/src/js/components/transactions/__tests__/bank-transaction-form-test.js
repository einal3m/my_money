import React from 'react';
import TestUtils from 'react-addons-test-utils';
import moment from 'moment';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import BankTransactionForm from '../bank-transaction-form';
import DatePicker from '../../common/date-picker/DateTimeField';
import GroupedCategorySelect from '../../common/controls/grouped-category-select';
import SubcategoryPicker from '../../common/controls/subcategory-picker';
import FormControl from '../../common/controls/form-control';

describe('CategoryForm', () => {
  const groupedCategories = [
    { categoryType: { id: 1, name: 'Expense' },
      categories: [{ id: 3, name: 'Cat', subcategories: [{ id: 5, name: 'Dog' }] }],
    },
  ];

  const transaction = {
    id: 22,
    date: '2015-12-19',
    amount: 300,
    notes: 'This is a note',
    memo: 'This is a memo',
    balance: 6070,
    categoryId: 3,
    subcategoryId: 5,
  };

  describe('render', () => {
    it('has a control for each editable property', () => {
      const form = shallowRenderer(
        <BankTransactionForm transaction={transaction} groupedCategories={groupedCategories} />
      );
      const [date, amount, notes, category, subcategory] = form.props.children;

      expect(date.type).toEqual(FormControl);
      expect(date.props.name).toEqual('date');
      expect(date.props.label).toEqual('Date');
      expect(date.props.children.type).toEqual(DatePicker);
      expect(date.props.children.props.dateTime).toEqual(moment('2015-12-19').format('YYYY-MM-DD'));

      expect(amount.type).toEqual(FormControl);
      expect(amount.props.name).toEqual('amount');
      expect(amount.props.label).toEqual('Amount');
      expect(amount.props.children.props.children[1].type).toEqual('input');
      expect(amount.props.children.props.children[1].props.value).toEqual(300);

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

      expect(subcategory.type).toEqual(FormControl);
      expect(subcategory.props.name).toEqual('subcategoryId');
      expect(subcategory.props.label).toEqual('Subcategory');
      expect(subcategory.props.children.type).toEqual(SubcategoryPicker);
      expect(subcategory.props.children.props.groupedCategories).toEqual(groupedCategories);
      expect(subcategory.props.children.props.categoryId).toEqual(3);
      expect(subcategory.props.children.props.value).toEqual(5);
    });

    it('does not display subcategory picker if category id is null', () => {
      const form = shallowRenderer(
        <BankTransactionForm transaction={{ }} groupedCategories={groupedCategories} />
      );
      const [date, amount, notes, category, subcategory] = form.props.children;

      expect(date.props.label).toEqual('Date');
      expect(amount.props.label).toEqual('Amount');
      expect(notes.props.label).toEqual('Notes');
      expect(category.props.label).toEqual('Category');
      expect(subcategory).toEqual(<div />);
    });
  });

  describe('isValid', () => {
    it('returns true if all fields are valid', () => {
      const form = TestUtils.renderIntoDocument(
        <BankTransactionForm transaction={transaction} groupedCategories={groupedCategories} />
      );
      spyOn(form, 'forceUpdate');
      expect(form.isValid()).toEqual(true);
      expect(form.forceUpdate).toHaveBeenCalled();
    });

    it('returns false if date field is missing', () => {
      const form = TestUtils.renderIntoDocument(
        <BankTransactionForm transaction={transaction} groupedCategories={groupedCategories} />
      );
      spyOn(form, 'forceUpdate');
      form.state.transaction.date = '';
      expect(form.isValid()).toEqual(false);
      expect(form.validator.errorState('date')).toEqual('has-error');
      expect(form.validator.errorFor('date')).toEqual('Date is required');
      expect(form.forceUpdate).toHaveBeenCalled();
    });

    it('returns false if amount field is missing', () => {
      const form = TestUtils.renderIntoDocument(
        <BankTransactionForm transaction={transaction} groupedCategories={groupedCategories} />
      );
      spyOn(form, 'forceUpdate');
      form.state.transaction.amount = null;
      expect(form.isValid()).toEqual(false);
      expect(form.validator.errorState('amount')).toEqual('has-error');
      expect(form.validator.errorFor('amount')).toEqual('Amount is required');
      expect(form.forceUpdate).toHaveBeenCalled();
    });
  });
});
