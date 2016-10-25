import React from 'react';
import CategoryTypeTable from '../category-type-table';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';

describe('CategoryTypeTable', () => {
  describe('render', () => {
    it('displays a title and a table of categories', () => {
      const subcategories = [{ id: 12, name: 'Subcategory1', categoryId: 22 }, { id: 22, name: 'Two', categoryId: 22 }];
      const categories = [
        { id: 11, name: 'Category One', subcategories: [] },
        { id: 22, name: 'Category Two', subcategories },
      ];
      const categoryType = { id: 2, name: 'Income' };

      const categoryTypeTable = shallowRenderer(
        <CategoryTypeTable categoryType={categoryType} categories={categories} />
      );

      const [title, table] = categoryTypeTable.props.children;
      const categoryRows = table.props.children.props.children;

      const category0 = categoryRows[0][0];
      const category1 = categoryRows[1][0];
      const cat1subs = categoryRows[1][1];

      expect(title.props.children).toEqual('Income');
      expect(category0.props.category).toEqual(categories[0]);
      expect(category1.props.category).toEqual(categories[1]);
      expect(cat1subs[0].props.subcategory).toEqual(subcategories[0]);
      expect(cat1subs[1].props.subcategory).toEqual(subcategories[1]);
    });
  });
});
