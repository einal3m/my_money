import React from 'react';
import CategoryTypeTable from '../category-type-table';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';

describe('CategoryTypeTable', () => {
  let categories, categoryType, clickHandlerSpy, categoryTypeTable;
  beforeEach(() => {
    categories = [{id: 11, name: 'Category One'}, {id: 22, name: 'Category Two'}];
    categoryType = {id: 2, name: 'Income'};
    clickHandlerSpy = jasmine.createSpy('clickHandler');
    categoryTypeTable = shallowRenderer(
      <CategoryTypeTable categoryType={categoryType} categories={categories} editCategory={clickHandlerSpy}/>
    );
  });

  describe('render', () => {
    it('displays a title and a table of categories', () => {
      let [title, table] = categoryTypeTable.props.children;
      let categoryRows = table.props.children.props.children;

      expect(title.props.children).toEqual('Income');
      expect(categoryRows[0].props.category).toEqual(categories[0]);
      expect(categoryRows[1].props.category).toEqual(categories[1]);

      expect(categoryRows[0].props.categoryType).toEqual(categoryType);
      expect(categoryRows[1].props.categoryType).toEqual(categoryType);

      expect(categoryRows[0].props.onClickHandler).toEqual(clickHandlerSpy);
      expect(categoryRows[1].props.onClickHandler).toEqual(clickHandlerSpy);
    });
  });
});
