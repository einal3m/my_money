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

    let groupedCategories = categorySelector({
      categoryStore: fromJS({categories: categories, categoryTypes: categoryTypes})
    }).toJS();

    expect(groupedCategories.length).toEqual(2);
    expect(groupedCategories[0]).toEqual({
      categoryType: categoryTypes[1],
      categories: [categories[1]]
    });
    expect(groupedCategories[1]).toEqual({
      categoryType: categoryTypes[2],
      categories: [categories[0]]
    });
  });
});
