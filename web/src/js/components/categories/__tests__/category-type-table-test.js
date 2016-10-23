import React from 'react';
import CategoryTypeTable from '../category-type-table';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';

describe('CategoryTypeTable', () => {
  let categories,
    categoryType,
    editCategorySpy,
    editSubcategorySpy,
    categoryTypeTable,
    subcategories;
  beforeEach(() => {
    subcategories = [{ id: 12, name: 'Subcategory1', categoryId: 22 }, { id: 22, name: 'Two', categoryId: 22 }];
    categories = [
      { id: 11, name: 'Category One', subcategories: [] },
      { id: 22, name: 'Category Two', subcategories },
    ];
    categoryType = { id: 2, name: 'Income' };
    editCategorySpy = jasmine.createSpy('categoryClickHandler');
    editSubcategorySpy = jasmine.createSpy('subcategoryClickHandler');

    categoryTypeTable = shallowRenderer(
      <CategoryTypeTable categoryType={categoryType} categories={categories}
        editCategory={editCategorySpy} editSubcategory={editSubcategorySpy}
      />
    );
  });

  describe('render', () => {
    it('displays a title and a table of categories', () => {
      let [title, table] = categoryTypeTable.props.children;
      const categoryRows = table.props.children.props.children;

      const category0 = categoryRows[0][0];
      const category1 = categoryRows[1][0];
      const cat1subs = categoryRows[1][1];

      expect(title.props.children).toEqual('Income');
      expect(category0.props.category).toEqual(categories[0]);
      expect(category1.props.category).toEqual(categories[1]);
      expect(cat1subs[0].props.subcategory).toEqual(subcategories[0]);
      expect(cat1subs[1].props.subcategory).toEqual(subcategories[1]);

      expect(category0.props.onClickHandler).toEqual(editCategorySpy);
      expect(category1.props.onClickHandler).toEqual(editCategorySpy);
      expect(cat1subs[0].props.onClickHandler).toEqual(editSubcategorySpy);
      expect(cat1subs[1].props.onClickHandler).toEqual(editSubcategorySpy);
    });
  });
});
