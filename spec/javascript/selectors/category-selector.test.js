import { Map, fromJS } from 'immutable';
import { editableGroupedCategories, groupedCategories, categoryDataLoaded } from '../category-selector';

describe('CategorySelector', () => {
  let categories;
  let categoryTypes;
  let subcategories;
  let categoryStore;
  beforeEach(() => {
    categoryTypes = [
      { id: 1, name: 'Transfer', code: 'transfer', editable: false },
      { id: 2, name: 'Income', code: 'income', editable: true },
      { id: 3, name: 'Expense', code: 'expense', editable: true },
    ];

    categories = [
      { id: 11, name: 'C Expense1', categoryTypeId: 3 },
      { id: 12, name: 'Income1', categoryTypeId: 2 },
      { id: 13, name: 'Transfer', categoryTypeId: 1 },
      { id: 14, name: 'a Expense1', categoryTypeId: 3 },
      { id: 15, name: 'B Expense', categoryTypeId: 3 },
    ];

    subcategories = [
      { id: 21, name: 'c Sub2', categoryId: 11 },
      { id: 22, name: 'a Sub1', categoryId: 11 },
      { id: 23, name: 'B Sub1', categoryId: 11 },
    ];

    categoryStore = {
      categoryStore: fromJS({ categories, categoryTypes, subcategories }),
    };
  });

  describe('categoriesLoaded', () => {
    it('returns true if category types, categories and subcategories are all loaded', () => {
      const store = {
        categoryStore: Map({
          categoryTypesLoaded: true,
          categoriesLoaded: true,
          subcategoriesLoaded: true,
        }),
      };

      expect(categoryDataLoaded(store)).toEqual(true);
    });

    it('returns false if category types are not loaded', () => {
      const store = {
        categoryStore: Map({
          categoryTypesLoaded: false,
          categoriesLoaded: true,
          subcategoriesLoaded: true,
        }),
      };

      expect(categoryDataLoaded(store)).toEqual(false);
    });

    it('returns false if categories are not loaded', () => {
      const store = {
        categoryStore: Map({
          categoryTypesLoaded: true,
          categoriesLoaded: false,
          subcategoriesLoaded: true,
        }),
      };

      expect(categoryDataLoaded(store)).toEqual(false);
    });

    it('returns false if subcategories are not loaded', () => {
      const store = {
        categoryStore: Map({
          categoryTypesLoaded: true,
          categoriesLoaded: true,
          subcategoriesLoaded: false,
        }),
      };

      expect(categoryDataLoaded(store)).toEqual(false);
    });
  });

  describe('editableGroupedCategories', () => {
    it('groups and sorts editable categories and subcategories', () => {
      const groups = editableGroupedCategories(categoryStore).toJS();

      expect(groups.length).toEqual(2);
      expect(groups[0]).toEqual({
        categoryType: categoryTypes[1],
        categories: [Object.assign(categories[1], { subcategories: [] })],
      });
      expect(groups[1]).toEqual({
        categoryType: categoryTypes[2],
        categories: [
          Object.assign(categories[3], { subcategories: [] }),
          Object.assign(categories[4], { subcategories: [] }),
          Object.assign(categories[0], { subcategories: [subcategories[1], subcategories[2], subcategories[0]] }),
        ],
      });
    });

    it('returns empty arrays when there are no categories', () => {
      const store = {
        categoryStore: fromJS({ categories: [], categoryTypes, subcategories: [] }),
      };

      const groups = editableGroupedCategories(store).toJS();
      expect(groups).toEqual([
        { categoryType: categoryTypes[1], categories: [] },
        { categoryType: categoryTypes[2], categories: [] },
      ]);
    });
  });

  describe('groupedCategories', () => {
    it('groups and sorts all categories and subcategories', () => {
      const groups = groupedCategories(categoryStore).toJS();

      expect(groups.length).toEqual(3);
      expect(groups[0]).toEqual({
        categoryType: categoryTypes[0],
        categories: [Object.assign(categories[2], { subcategories: [] })],
      });
      expect(groups[1]).toEqual({
        categoryType: categoryTypes[1],
        categories: [Object.assign(categories[1], { subcategories: [] })],
      });
      expect(groups[2]).toEqual({
        categoryType: categoryTypes[2],
        categories: [
          Object.assign(categories[3], { subcategories: [] }),
          Object.assign(categories[4], { subcategories: [] }),
          Object.assign(categories[0], { subcategories: [subcategories[1], subcategories[2], subcategories[0]] }),
        ],
      });
    });
  });
});
