import categorySelector from '../category-selector';
import { fromJS, toJS } from 'immutable';

describe('CategorySelector', () => {
  it('groups categories by category type', () => {
    let categories = [
      {id: 11, name: 'Expense1', categoryTypeId: 3},
      {id: 12, name: 'Income1', categoryTypeId: 2}
    ];
    let categoryTypes = [
      { id: 1, name: 'Transfer', code: 'transfer', editable: false },
      { id: 2, name: 'Income', code: 'income', editable: true },
      { id: 3, name: 'Expense', code: 'expense', editable: true }
    ];

    let subcategories = [
      {id: 22, name: 'Sub2', categoryId: 11},
      {id: 21, name: 'Sub1', categoryId: 11}
    ]

    let groupedCategories = categorySelector({
      categoryStore: fromJS({categories: categories, categoryTypes: categoryTypes, subcategories: subcategories})
    }).toJS();

    expect(groupedCategories.length).toEqual(2);
    expect(groupedCategories[0]).toEqual({
      categoryType: categoryTypes[1],
      categories: [Object.assign(categories[1], {subcategories: []})]
    });
    expect(groupedCategories[1]).toEqual({
      categoryType: categoryTypes[2],
      categories: [Object.assign(categories[0], {subcategories: [subcategories[0], subcategories[1]]})]
    });
  });
});
