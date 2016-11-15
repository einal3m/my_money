import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import * as categoryActions from '../../../../actions/category-actions';
import { CategoryFilterComponent as CategoryFilter } from '../category-filter';
import GroupedCategorySelect from '../../controls/grouped-category-select';
import SubcategoryPicker from '../../controls/subcategory-picker';
import HorizontalFormControl from '../../controls/horizontal-form-control';

describe('CategoryFilter', () => {
  const groupedCategories = [
    {
      categoryType: { id: 1, name: 'Expense' },
      categories: [
        { id: 3, name: 'Cat', subcategories: [{ id: 5, name: 'Dog' }, { id: 6, name: 'Horse' }] },
        { id: 4, name: 'Mouse', subcategories: [{ id: 7, name: 'Cow' }] },
      ],
    },
  ];
  let fetchSpy;
  beforeEach(() => {
    spyOn(categoryActions.default, 'getCategories');
    fetchSpy = jasmine.createSpy('fetchSpy');
  });

  describe('render', () => {
    it('does not display pickers if categories not loaded', () => {
      const filter = shallowRenderer(
        <CategoryFilter
          loaded={false}
          showSubcategories
          currentCategoryId={4}
          currentSubcategoryId={7}
          fetch={fetchSpy}
          groupedCategories={groupedCategories}
        />
      );

      const categoryGroup = filter.props.children[0].props.children;
      const subcategoryGroup = filter.props.children[1].props.children;

      expect(categoryGroup).toBeUndefined();
      expect(subcategoryGroup).toBeUndefined();
    });

    it('has a grouped category select and a subcategory picker', () => {
      const filter = shallowRenderer(
        <CategoryFilter
          loaded
          showSubcategories
          currentCategoryId={4}
          currentSubcategoryId={7}
          fetch={fetchSpy}
          groupedCategories={groupedCategories}
        />
      );

      const categoryGroup = filter.props.children[0].props.children;
      const subcategoryGroup = filter.props.children[1].props.children;

      expect(categoryGroup.type).toEqual(HorizontalFormControl);
      expect(categoryGroup.props.name).toEqual('currentCategoryId');
      expect(categoryGroup.props.label).toEqual('Category');
      expect(categoryGroup.props.children.type).toEqual(GroupedCategorySelect);
      expect(categoryGroup.props.children.props.groupedCategories).toEqual(groupedCategories);
      expect(categoryGroup.props.children.props.value).toEqual(4);

      expect(subcategoryGroup.type).toEqual(HorizontalFormControl);
      expect(subcategoryGroup.props.name).toEqual('currentSubcategoryId');
      expect(subcategoryGroup.props.label).toEqual('Subcategory');
      expect(subcategoryGroup.props.children.type).toEqual(SubcategoryPicker);
      expect(subcategoryGroup.props.children.props.groupedCategories).toEqual(groupedCategories);
      expect(subcategoryGroup.props.children.props.categoryId).toEqual(4);
      expect(subcategoryGroup.props.children.props.value).toEqual(7);
    });

    it('does not display subcategory picker if category id is null', () => {
      const filter = shallowRenderer(
        <CategoryFilter
          loaded
          showSubcategories
          fetch={fetchSpy}
          groupedCategories={groupedCategories}
        />
      );
      const categoryGroup = filter.props.children[0].props.children;
      const subcategoryGroup = filter.props.children[1].props.children;

      expect(categoryGroup.props.label).toEqual('Category');
      expect(subcategoryGroup).toBeUndefined();
    });

    it('does not display subcategory picker if showSubcategories is false', () => {
      const filter = shallowRenderer(
        <CategoryFilter
          loaded
          showSubcategories={false}
          currentCategoryId={4}
          currentSubcategoryId={7}
          fetch={fetchSpy}
          groupedCategories={groupedCategories}
        />
      );
      const categoryGroup = filter.props.children[0].props.children;
      const subcategoryGroup = filter.props.children[1].props.children;

      expect(categoryGroup.props.label).toEqual('Category');
      expect(subcategoryGroup).toBeUndefined();
    });
  });

  describe('events', () => {
    it('sets the current category and calls fetch when category selected', () => {
      const filter = shallowRenderer(
        <CategoryFilter
          loaded
          showSubcategories
          currentCategoryId={4}
          currentSubcategoryId={7}
          fetch={fetchSpy}
          groupedCategories={groupedCategories}
        />
      );

      spyOn(categoryActions, 'setCurrentCategory');
      const categoryPicker = filter.props.children[0].props.children.props.children;

      categoryPicker.props.onChange({ target: { value: 8 } });

      expect(categoryActions.setCurrentCategory).toHaveBeenCalledWith(8);
      expect(fetchSpy).toHaveBeenCalled();
    });

    it('sets the current subcategory and calls fetch when subcategory selected', () => {
      const filter = shallowRenderer(
        <CategoryFilter
          loaded
          showSubcategories
          currentCategoryId={4}
          currentSubcategoryId={7}
          fetch={fetchSpy}
          groupedCategories={groupedCategories}
        />
      );

      spyOn(categoryActions, 'setCurrentSubcategory');
      const subcategoryPicker = filter.props.children[1].props.children.props.children;

      subcategoryPicker.props.onChange(11);

      expect(categoryActions.setCurrentSubcategory).toHaveBeenCalledWith(11);
      expect(fetchSpy).toHaveBeenCalled();
    });
  });
});
