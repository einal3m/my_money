import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import { CategoryListComponent as CategoryList } from '../category-list';
import PageHeader from '../../common/page-header';
import NewModelButton from '../../common/controls/new-model-buttons';
import CategoryTypeTable from '../category-type-table';
import CategoryModal from '../category-modal';
import * as categoryActions from '../../../actions/category-actions';

describe('CategoryList', () => {
  const category1 = { id: 1, name: 'One', subcategories: [] };
  const category2 = { id: 2, name: 'Two', subcategories: [{ id: 45, name: 'Four', categoryId: 2 }] };
  const category3 = { id: 3, name: 'Three', subcategories: [] };

  const groupedCategories = [
    { categoryType: { id: 1, code: 'income', name: 'Income' }, categories: [category1, category2] },
    { categoryType: { id: 2, code: 'expense', name: 'Expense' }, categories: [category3] },
  ];

  let categoryList;

  beforeEach(() => {
    spyOn(categoryActions, 'getCategories');
    categoryList = shallowRenderer(
      <CategoryList loaded groupedCategories={groupedCategories} />
    );
  });

  describe('render', () => {
    it('has a header with buttons', () => {
      const header = categoryList.props.children[0];

      expect(header.type).toEqual(PageHeader);
      expect(header.props.title).toEqual('my categories');

      const dropdown = header.props.children;

      expect(dropdown.type).toEqual(NewModelButton);
      expect(dropdown.props.modelTypes).toEqual(['Category', 'Subcategory']);
    });

    it('has a table for each category type', () => {
      const tables = categoryList.props.children[1].props.children;
      const [income, expense] = tables.props.children;

      expect(income.props.children.type).toEqual(CategoryTypeTable);
      expect(income.props.children.props.categoryType.name).toEqual('Income');
      expect(income.props.children.props.categories).toEqual([category1, category2]);

      expect(expense.props.children.type).toEqual(CategoryTypeTable);
      expect(expense.props.children.props.categoryType.name).toEqual('Expense');
      expect(expense.props.children.props.categories).toEqual([category3]);
    });

    it('has a category modal', () => {
      const modal = categoryList.props.children[2];

      expect(modal.type).toEqual(CategoryModal);
      expect(modal.props.groupedCategories).toEqual(groupedCategories);
    });
  });
});
