import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import ImportRow from '../import-row';
import Amount from '../../common/amount';
import Date from '../../common/date';
import GroupedCategorySelect from '../../common/controls/grouped-category-select';
import SubcategoryPicker from '../../common/controls/subcategory-picker';
import importActions from '../../../actions/import-actions';

describe('ImportRow', () => {
  let importRow, transaction, groupedCategories, subcategories, sub1, sub3;
  beforeEach(() => {
    transaction = {
      import: false,
      date: '2016-12-19',
      memo: 'myMemo',
      categoryId: 14,
      subcategoryId: 27,
      amount: 250,
      notes: 'myNotes'
    };
    groupedCategories = [];
    sub1 = {id: 1, categoryId: 14, name: 'One'};
    sub3 = {id: 2, categoryId: 14, name: 'Two'};
    subcategories = [sub1, {id: 3, categoryId: 3, name: 'Three'}, sub3];
  });

  describe('render', () => {
    it('is a table row with transaction details', () => {
      importRow = shallowRenderer(
        <ImportRow index={4} transaction={transaction} groupedCategories={groupedCategories}
                   subcategories={subcategories}/>
      );
      expect(importRow.type).toEqual('tr');
      expect(importRow.props.className).toEqual('');

      expect(importRow.props.children[0].props.children.type).toEqual(Date);
      expect(importRow.props.children[0].props.children.props.date).toEqual(transaction.date);

      expect(importRow.props.children[1].props.children).toEqual('myMemo');

      let notes = importRow.props.children[2].props.children;
      expect(notes.type).toEqual('input');
      expect(notes.props.value).toEqual('myNotes');

      let categorySelect = importRow.props.children[3].props.children;
      expect(categorySelect.type).toEqual(GroupedCategorySelect);
      expect(categorySelect.props.value).toEqual(14);
      expect(categorySelect.props.groupedCategories).toEqual(groupedCategories);

      let subcategorySelect = importRow.props.children[4].props.children;
      expect(subcategorySelect.type).toEqual(SubcategoryPicker);
      expect(subcategorySelect.props.value).toEqual(27);
      expect(subcategorySelect.props.groupedCategories).toEqual(groupedCategories);
      expect(subcategorySelect.props.categoryId).toEqual(14);

      expect(importRow.props.children[5].props.children.type).toEqual(Amount);
      expect(importRow.props.children[5].props.children.props.amount).toEqual(250);

      let shouldImport = importRow.props.children[6].props.children;
      expect(shouldImport.type).toEqual('input');
      expect(shouldImport.props.type).toEqual('checkbox');
      expect(shouldImport.props.checked).toEqual(false);
    });

    it('has a danger class if transaction is a duplicate', () => {
      transaction.duplicate = true;
      importRow = shallowRenderer(
        <ImportRow index={4} transaction={transaction} groupedCategories={groupedCategories}
                   subcategories={subcategories}/>
      );

      expect(importRow.props.className).toEqual('danger');
    });
  });

  describe('events', () => {
    beforeEach(() => {
      importRow = shallowRenderer(
      <ImportRow index={4} transaction={transaction} groupedCategories={groupedCategories}
                 subcategories={subcategories}/>
      );
    });

    describe('change notes', () => {
      it('calls the setNotes action with new value', () => {
        spyOn(importActions, 'setNotes');

        let notes = importRow.props.children[2].props.children;
        notes.props.onChange({target: {value: 'newNote'}});

        expect(importActions.setNotes).toHaveBeenCalledWith(4, 'newNote');
      });
    });

    describe('change category id', () => {
      it('calls the setCategoryId action with new value', () => {
        spyOn(importActions, 'setCategoryId');

        let categorySelect = importRow.props.children[3].props.children;
        categorySelect.props.onChange({target: {value: 3}});

        expect(importActions.setCategoryId).toHaveBeenCalledWith(4, 3);
      });
    });

    describe('change subcategory id', () => {
      it('calls the setSubcategoryId action with new value', () => {
        spyOn(importActions, 'setSubcategoryId');

        let subcategorySelect = importRow.props.children[4].props.children;
        subcategorySelect.props.onChange(2);

        expect(importActions.setSubcategoryId).toHaveBeenCalledWith(4, 2);
      });
    });

    describe('change import flag', () => {
      it('calls the setImport action with new value', () => {
        spyOn(importActions, 'setImport');

        let shouldImport = importRow.props.children[6].props.children;
        shouldImport.props.onChange({target: {checked: true}});

        expect(importActions.setImport).toHaveBeenCalledWith(4, true);
      });
    });
  });
});
