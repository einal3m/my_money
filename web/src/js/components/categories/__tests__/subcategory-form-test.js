import React from 'react';
import TestUtils from 'react-addons-test-utils';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import SubcategoryForm from '../subcategory-form';
import FormControl from '../../common/controls/form-control';
import GroupedCategorySelect from '../../common/controls/grouped-category-select';

fdescribe('SubcategoryForm', () => {
  const subcategory = { id: 11, name: 'myName', categoryId: 3 };
  const category1 = { id: 1, name: 'category1' };
  const category3 = { id: 3, name: 'category3' };
  const groupedCategories = [{ categoryType: { name: 'Income', id: 2 }, categories: [category1, category3] }];

  describe('render', () => {
    let form;
    let name;
    let category;

    beforeEach(() => {
      form = shallowRenderer(<SubcategoryForm subcategory={subcategory} groupedCategories={groupedCategories} />);
      [category, name] = form.props.children;
    });

    it('has a category select', () => {
      expect(category.type).toEqual(FormControl);
      expect(category.props.name).toEqual('categoryId');
      expect(category.props.label).toEqual('Category');
      expect(category.props.children.type).toEqual(GroupedCategorySelect);
      expect(category.props.children.props.value).toEqual(3);
    });

    it('has a name field', () => {
      expect(name.type).toEqual(FormControl);
      expect(name.props.name).toEqual('name');
      expect(name.props.label).toEqual('Name');
      expect(name.props.children.type).toEqual('input');
      expect(name.props.children.props.value).toEqual('myName');
    });
  });

  describe('isValid', () => {
    it('returns true if all fields are valid', () => {
      const form = TestUtils.renderIntoDocument(
        <SubcategoryForm subcategory={subcategory} groupedCategories={groupedCategories} />
      );
      spyOn(form, 'forceUpdate');
      form.state.subcategory = { name: 'myName', categoryId: 1 };
      expect(form.isValid()).toEqual(true);
      expect(form.forceUpdate).toHaveBeenCalled();
    });

    it('returns false if name field is missing', () => {
      const form = TestUtils.renderIntoDocument(
        <SubcategoryForm subcategory={subcategory} groupedCategories={groupedCategories} />
      );
      spyOn(form, 'forceUpdate');
      form.state.subcategory = { name: '', categoryId: 3 };
      expect(form.isValid()).toEqual(false);
      expect(form.forceUpdate).toHaveBeenCalled();
    });

    it('returns false if category field is missing', () => {
      const form = TestUtils.renderIntoDocument(
        <SubcategoryForm subcategory={subcategory} groupedCategories={groupedCategories} />
      );
      spyOn(form, 'forceUpdate');
      form.state.subcategory = { name: 'myName', categoryId: null };
      expect(form.isValid()).toEqual(false);
      expect(form.forceUpdate).toHaveBeenCalled();
    });
  });

  describe('updating state and validation', () => {
    it('name is required', () => {
      const form = TestUtils.renderIntoDocument(
        <SubcategoryForm subcategory={{}} groupedCategories={groupedCategories} />
      );
      const name = TestUtils.findRenderedDOMComponentWithTag(form, 'input');

      name.value = '';
      TestUtils.Simulate.change(name);
      expect(form.validator.errorState('name')).toEqual('has-error');
      expect(form.validator.errorFor('name')).toEqual('Name is required');

      name.value = 'giraffe';
      TestUtils.Simulate.change(name);
      expect(form.state.subcategory.name).toEqual('giraffe');
      expect(form.validator.errorState('name')).toEqual('has-success');
      expect(form.validator.errorFor('name')).toBeUndefined();
    });

    it('category is required', () => {
      const form = TestUtils.renderIntoDocument(
        <SubcategoryForm subcategory={{}} groupedCategories={groupedCategories} />
      );
      const category = TestUtils.findRenderedComponentWithType(form, GroupedCategorySelect);

      category.props.onChange({ target: { name: 'categoryId', value: null } });
      expect(form.validator.errorState('categoryId')).toEqual('has-error');
      expect(form.validator.errorFor('categoryId')).toEqual('Category id is required');

      category.props.onChange({ target: { name: 'categoryId', value: 3 } });
      expect(form.state.subcategory.categoryId).toEqual(3);
      expect(form.validator.errorState('categoryId')).toEqual('has-success');
      expect(form.validator.errorFor('categoryId')).toBeUndefined();
    });
  });
});
