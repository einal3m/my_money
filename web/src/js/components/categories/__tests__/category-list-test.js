import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import React from 'react';
import { CategoryList } from '../category-list';
import CategoryTypeTable from '../category-type-table';
import PageHeader from '../../common/page-header';
import { Dropdown, MenuItem } from 'react-bootstrap';
import categoryActions from '../../../actions/category-actions';

describe('CategoryList', () => {
  let categoryList, groupedCategories, category1, category2, category3;
  beforeEach(() => {
    spyOn(categoryActions, 'getCategories');

    category1 = {id: 1, name: 'One'};
    category2 = {id: 2, name: 'Two'};
    category3 = {id: 3, name: 'Two'};

    groupedCategories = [
      {categoryType: { code: 'income', name: 'Income' }, categories: [category1, category2]},
      {categoryType: { code: 'expense', name: 'Expense' }, categories: [category3]}      
    ]

    categoryList = shallowRenderer(
      <CategoryList loaded groupedCategories={groupedCategories} />
    );
  });

  describe('render', () => {
    it('has a header with buttons', () => {
      let header = categoryList.props.children[0];

      expect(header.type).toEqual(PageHeader);
      expect(header.props.title).toEqual('my categories');

      let dropdown = header.props.children;

      expect(dropdown.type).toEqual(Dropdown);
      expect(dropdown.props.children[0].props.children[1]).toMatch(/New/);

      let buttons = dropdown.props.children[1];
      expect(buttons.props.children[0].type).toEqual(MenuItem);
      expect(buttons.props.children[0].props.children).toMatch('Income');

      expect(buttons.props.children[1].type).toEqual(MenuItem);
      expect(buttons.props.children[1].props.children).toMatch('Expense');
    });

    it('has a table for each category type', () => {
      let tables = categoryList.props.children[1].props.children;
      let [income, expense] = tables.props.children;

      expect(income.props.children.type).toEqual(CategoryTypeTable);
      expect(income.props.children.props.categoryType.name).toEqual('Income');
      expect(income.props.children.props.categories).toEqual([category1, category2]);

      expect(expense.props.children.type).toEqual(CategoryTypeTable);
      expect(expense.props.children.props.categoryType.name).toEqual('Expense');
      expect(expense.props.children.props.categories).toEqual([category3]);
    });
  });

  describe('events', () => {
    beforeEach(() => {
      categoryList = TestUtils.renderIntoDocument(
        <CategoryList loaded groupedCategories={groupedCategories}/>
      );
    });

    it('does not show modal by default', () => {
      expect(categoryList.refs.categoryModal).toBeUndefined();
    });

    it('shows modal when you click on the new category button', () => {
      categoryList.refs.newCategoryButton.props.onSelect(null, '1');
      let modal = categoryList.refs.categoryModal;
      expect(modal).toBeDefined();
      expect(modal.props.categoryType.name).toEqual('Expense');
    });

    it('closes modal when modals onClose function called', () => {
      categoryList.refs.newCategoryButton.props.onSelect(null, '1');
      categoryList.refs.categoryModal.props.onClose();
      expect(categoryList.refs.categoryModal).toBeUndefined();
    });

    it('modals onSave function calls the create category action', () =>{
      spyOn(categoryActions, 'createCategory');
      categoryList.refs.newCategoryButton.props.onSelect(null, '1');
      let modal = categoryList.refs.categoryModal;

      modal.props.onSave('category');
      expect(categoryActions.createCategory).toHaveBeenCalledWith('category');
    });
  });
});
