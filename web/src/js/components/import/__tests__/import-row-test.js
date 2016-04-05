import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import React from 'react';
import ImportRow from '../import-row';
import Amount from '../../common/amount';
import GroupedCategorySelect from '../../common/controls/grouped-category-select';
import SubcategoryPicker from '../../common/controls/subcategory-picker';

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
    importRow = shallowRenderer(
      <ImportRow transaction={transaction} groupedCategories={groupedCategories} subcategories={subcategories}/>
    );
  });

  describe('render', () => {
    it('is a table row', () => {
      expect(importRow.type).toEqual('tr');

      let shouldImport = importRow.props.children[0].props.children;
      expect(shouldImport.type).toEqual('input');
      expect(shouldImport.props.type).toEqual('checkbox');
      expect(shouldImport.props.checked).toEqual(false);

      expect(importRow.props.children[1].props.children).toEqual('19-Dec-2016');
      expect(importRow.props.children[2].props.children).toEqual('myMemo');

      let notes = importRow.props.children[3].props.children;
      expect(notes.type).toEqual('input');
      expect(notes.props.value).toEqual('myNotes');

      let categorySelect = importRow.props.children[4].props.children;
      expect(categorySelect.type).toEqual(GroupedCategorySelect);
      expect(categorySelect.props.value).toEqual(14);
      expect(categorySelect.props.groupedCategories).toEqual(groupedCategories);

      let subcategorySelect = importRow.props.children[5].props.children;
      expect(subcategorySelect.type).toEqual(SubcategoryPicker);
      expect(subcategorySelect.props.value).toEqual(27);
      expect(subcategorySelect.props.subcategories).toEqual([sub1, sub3]);

      expect(importRow.props.children[6].props.children.type).toEqual(Amount);
      expect(importRow.props.children[6].props.children.props.amount).toEqual(250);
    });
  });
});
