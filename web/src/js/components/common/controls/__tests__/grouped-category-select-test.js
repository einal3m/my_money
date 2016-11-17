import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import GroupedCategorySelect from '../grouped-category-select';
import DropDown from '../drop-down';

describe('GroupedCategorySelect', () => {
  const category1 = { id: 1, name: 'Wages' };
  const category2 = { id: 2, name: 'Bills' };
  const category3 = { id: 3, name: 'Tax Return' };
  const groupedCategories = [
    { categoryType: { name: 'Income', id: 4 }, categories: [category1, category3] },
    { categoryType: { name: 'Expense', id: 5 }, categories: [category2] },
  ];

  const groupedOptions = [
    { name: 'Income', options: [category1, category3] },
    { name: 'Expense', options: [category2] },
  ];

  let select;
  let onChangeSpy;

  beforeEach(() => {
    onChangeSpy = jasmine.createSpy('onChangeSpy');
  });

  describe('render', () => {
    it('is a dropdown with grouped options', () => {
      select = shallowRenderer(
        <GroupedCategorySelect value={2} groupedCategories={groupedCategories} onChange={onChangeSpy} />
      );

      expect(select.type).toEqual(DropDown);
      expect(select.props.value).toEqual(2);
      expect(select.props.groupedOptions).toEqual(groupedOptions);
    });
  });

  describe('onChange', () => {
    it('calls the onChange prop', () => {
      select = shallowRenderer(
        <GroupedCategorySelect value={2} groupedCategories={groupedCategories} onChange={onChangeSpy} />
      );
      select.props.onChange(2);

      expect(onChangeSpy).toHaveBeenCalledWith({ target: { name: 'categoryId', value: 2 } });
    });
  });
});
