import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import SubcategoryForm from '../subcategory-form';
import GroupedCategorySelect from '../../common/controls/grouped-category-select';

describe('SubcategoryForm', () => {
  let subcategory, groupedCategories;
  beforeEach(() => {
    subcategory = {id: 11, name: 'myName', categoryId: 3};
    let category1 = {id: 1, name: 'category1'};
    let category3 = {id: 3, name: 'category3'};
    groupedCategories = [{categoryType: {name: 'Income', id: 2}, categories: [category1, category3]}];
  });

  describe('render', () => {
    let form, name, category;
    beforeEach(() => {
      form = shallowRenderer(<SubcategoryForm subcategory={subcategory} groupedCategories={groupedCategories}/>);
      [category, name] = form.props.children;
    });

    it('has a category select', () => {
      expect(category.props.children[0].props.children).toEqual('Category');
      expect(category.props.children[1].type).toEqual(GroupedCategorySelect);
      expect(category.props.children[1].props.value).toEqual(3);
    });

    it('has a name field', () => {
      expect(name.props.children[0].props.children).toEqual('Name');
      expect(name.props.children[1].type).toEqual('input');
      expect(name.props.children[1].props.value).toEqual('myName');
    });
  });
  
  describe('isValid', () => {
    it('returns true if all fields are valid', () => {
      let form = TestUtils.renderIntoDocument(<SubcategoryForm subcategory={subcategory} groupedCategories={groupedCategories}/>);
      spyOn(form, 'forceUpdate');
      form.state.subcategory = {name: 'myName', categoryId: 1};
      expect(form.isValid()).toEqual(true);
      expect(form.forceUpdate).toHaveBeenCalled();
    });

    it('returns false if name field is missing', () => {
      let form = TestUtils.renderIntoDocument(<SubcategoryForm subcategory={subcategory} groupedCategories={groupedCategories}/>);
      spyOn(form, 'forceUpdate');
      form.state.subcategory = {name: '', categoryId: 3};
      expect(form.isValid()).toEqual(false);
      expect(form.forceUpdate).toHaveBeenCalled();
    });

    it('returns false if category field is missing', () => {
      let form = TestUtils.renderIntoDocument(<SubcategoryForm subcategory={subcategory} groupedCategories={groupedCategories}/>);
      spyOn(form, 'forceUpdate');
      form.state.subcategory = {name: 'myName', categoryId: null};
      expect(form.isValid()).toEqual(false);
      expect(form.forceUpdate).toHaveBeenCalled();
    });
  });

  describe('updating state and validation', () => {
    it('updates state and validates name is required', () => {
      let form = TestUtils.renderIntoDocument(<SubcategoryForm subcategory={{}} groupedCategories={groupedCategories}/>);
      let name = form.refs.nameField;
      let formGroup = name.parentNode;
      let helpBlock = formGroup.getElementsByClassName('help-block')[0];

      TestUtils.Simulate.change(name);
      expect(formGroup.className).toMatch(/has-error/);
      expect(helpBlock.textContent).toEqual('Name is required');

      name.value = 'giraffe'
      TestUtils.Simulate.change(name);
      expect(form.state.subcategory.name).toEqual('giraffe');
      expect(formGroup.className).toMatch(/has-success/);
      expect(helpBlock.textContent).toEqual('');
    });
  });
});
