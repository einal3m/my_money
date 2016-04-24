import { editableGroupedCategories, groupedCategories } from '../category-selector';
import { fromJS, toJS } from 'immutable';

describe('CategorySelector', () => {
  let categories, categoryTypes, subcategories, categoryStore;
  beforeEach(() => {
    categories = [
      {id: 11, name: 'Expense1', categoryTypeId: 3},
      {id: 12, name: 'Income1', categoryTypeId: 2},
      {id: 13, name: 'Transfer', categoryTypeId: 1}
    ];
    categoryTypes = [
      {id: 1, name: 'Transfer', code: 'transfer', editable: false},
      {id: 2, name: 'Income', code: 'income', editable: true},
      {id: 3, name: 'Expense', code: 'expense', editable: true}
    ];

    subcategories = [
      {id: 22, name: 'Sub2', categoryId: 11},
      {id: 21, name: 'Sub1', categoryId: 11}
    ];

    categoryStore = {
      categoryStore: fromJS({categories: categories, categoryTypes: categoryTypes, subcategories: subcategories})
    };
  });

  describe('editableGroupedCategories', () => {
    it('groups editable categories by category type', () => {
      let groups = editableGroupedCategories(categoryStore).toJS();

      expect(groups.length).toEqual(2);
      expect(groups[0]).toEqual({
        categoryType: categoryTypes[1],
        categories: [Object.assign(categories[1], {subcategories: []})]
      });
      expect(groups[1]).toEqual({
        categoryType: categoryTypes[2],
        categories: [Object.assign(categories[0], {subcategories: [subcategories[0], subcategories[1]]})]
      });
    });
  });

  describe('groupedCategories', () => {
    it('groups all categories by category type', () => {
      let groups = groupedCategories(categoryStore).toJS();

      expect(groups.length).toEqual(3);
      expect(groups[0]).toEqual({
        categoryType: categoryTypes[0],
        categories: [Object.assign(categories[2], {subcategories: []})]
      });
      expect(groups[1]).toEqual({
        categoryType: categoryTypes[1],
        categories: [Object.assign(categories[1], {subcategories: []})]
      });
      expect(groups[2]).toEqual({
        categoryType: categoryTypes[2],
        categories: [Object.assign(categories[0], {subcategories: [subcategories[0], subcategories[1]]})]
      });
    });
  });
});
