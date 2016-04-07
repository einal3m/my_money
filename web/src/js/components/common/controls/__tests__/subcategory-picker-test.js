import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';

import SubcategoryPicker from '../subcategory-picker';
import Picker from '../picker';

describe('SubcategoryPicker', () => {
  let subcategoryPicker, subcategories, onChangeSpy;
  beforeEach(() => {
    subcategories = [
      { id: 1, categoryId: 11, name: 'One' },
      { id: 2, categoryId: 12, name: 'One Again' },
      { id: 3, categoryId: 11, name: 'Two' },
      { id: 4, categoryId: 13, name: 'Two Again' },
      { id: 5, categoryId: 11, name: 'Three' }
    ];

    onChangeSpy = jasmine.createSpy('onChangeSpy');
  });

  describe('render', () => {
    it('has a picker with subset of subcategories', () => {
      subcategoryPicker = shallowRenderer(
        <SubcategoryPicker subcategories={subcategories} value={null} onChange={onChangeSpy} categoryId={11} />
      );

      expect(subcategoryPicker.type).toEqual(Picker);
      expect(subcategoryPicker.props.options).toEqual([subcategories[0], subcategories[2], subcategories[4]]);
    });
  });

  describe('events', () => {
    it('dropdown onChange calls the onChange prop', () => {
      subcategoryPicker = shallowRenderer(
        <SubcategoryPicker subcategories={subcategories} value={2} onChange={onChangeSpy} categoryId={11} />
      );

      subcategoryPicker.props.onChange(4);

      expect(onChangeSpy).toHaveBeenCalledWith(4);
    });
  });
});
