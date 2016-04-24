import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';

import SubcategoryPicker from '../subcategory-picker';
import Picker from '../picker';

describe('SubcategoryPicker', () => {
  let subcategoryPicker, subcategories, onChangeSpy, groupedCategories;
  beforeEach(() => {
    subcategories = [
      { id: 1, categoryId: 11, name: 'One' },
      { id: 2, categoryId: 12, name: 'One Again' },
      { id: 3, categoryId: 11, name: 'Two' },
      { id: 4, categoryId: 13, name: 'Two Again' },
      { id: 5, categoryId: 11, name: 'Three' }
    ];

    let category1 = {id: 11, name: 'Wages', subcategories: [subcategories[0], subcategories[2], subcategories[4]]};
    let category2 = {id: 12, name: 'Bills', subcategories: [subcategories[1]]};
    let category3 = {id: 13, name: 'Tax Return', subcategories: [subcategories[3]]};

    groupedCategories = [
      {categoryType: {name: 'Income', id: 4}, categories: [category1, category3]},
      {categoryType: {name: 'Expense', id: 5}, categories: [category2]}
    ];

    onChangeSpy = jasmine.createSpy('onChangeSpy');
  });

  describe('render', () => {
    it('has a picker with subset of subcategories', () => {
      subcategoryPicker = shallowRenderer(
        <SubcategoryPicker groupedCategories={groupedCategories} value={null} onChange={onChangeSpy} categoryId={11} />
      );

      expect(subcategoryPicker.type).toEqual(Picker);
      expect(subcategoryPicker.props.options).toEqual([subcategories[0], subcategories[2], subcategories[4]]);
    });
  });

  describe('events', () => {
    it('dropdown onChange calls the onChange prop', () => {
      subcategoryPicker = shallowRenderer(
        <SubcategoryPicker groupedCategories={groupedCategories} value={2} onChange={onChangeSpy} categoryId={11} />
      );

      subcategoryPicker.props.onChange(4);

      expect(onChangeSpy).toHaveBeenCalledWith(4);
    });
  });
});
