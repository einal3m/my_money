import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import CategoryForm from '../category-form';
import CategoryTypeSelect from '../../common/category-type-select';

describe('CategoryForm', () => {
  let category, categoryTypes;
  beforeEach(() => {
    category = {id: 11, name: 'categoryName', categoryTypeId: 3};
    categoryTypes = [{id: 1, name: 'Income'}, {id: 2, name: 'Expense'}];
  });

  describe('render', () => {
    let form, name, categoryType;
    beforeEach(() => {
      form = shallowRenderer(<CategoryForm category={category} categoryTypes={categoryTypes}/>);
      [categoryType, name] = form.props.children;
    });

    it('has a category type', () => {
      expect(categoryType.props.children[0].props.children).toEqual('Category Type');
      expect(categoryType.props.children[1].type).toEqual(CategoryTypeSelect);
      expect(categoryType.props.children[1].props.value).toEqual(3);
    });

    it('has a name field', () => {
      expect(name.props.children[0].props.children).toEqual('Name');
      expect(name.props.children[1].type).toEqual('input');
      expect(name.props.children[1].props.value).toEqual('categoryName');
    });
  });
  
  describe('isValid', () => {
    it('returns true if all fields are valid', () => {
      let form = TestUtils.renderIntoDocument(<CategoryForm category={category} categoryTypes={categoryTypes}/>);
      spyOn(form, 'forceUpdate');
      form.state.category = {name: 'myName', categoryTypeId: 2};
      expect(form.isValid()).toEqual(true);
      expect(form.forceUpdate).toHaveBeenCalled();
    });

    it('returns false if name field is missing', () => {
      let form = TestUtils.renderIntoDocument(<CategoryForm category={category} categoryTypes={categoryTypes}/>);
      spyOn(form, 'forceUpdate');
      form.state.category = {name: '', categoryTypeId: 3};
      expect(form.isValid()).toEqual(false);
      expect(form.forceUpdate).toHaveBeenCalled();
    });

    it('returns false if category type field is missing', () => {
      let form = TestUtils.renderIntoDocument(<CategoryForm category={category} categoryTypes={categoryTypes}/>);
      spyOn(form, 'forceUpdate');
      form.state.category = {name: 'myName', categoryTypeId: null};
      expect(form.isValid()).toEqual(false);
      expect(form.forceUpdate).toHaveBeenCalled();
    });
  });

  describe('updating state and validation', () => {
    it('updates state and validates name is required', () => {
      let form = TestUtils.renderIntoDocument(<CategoryForm category={{}} categoryTypes={categoryTypes}/>);
      let name = form.refs.nameField;
      let formGroup = name.parentNode;
      let helpBlock = formGroup.getElementsByClassName('help-block')[0];

      TestUtils.Simulate.change(name);
      expect(formGroup.className).toMatch(/has-error/);
      expect(helpBlock.textContent).toEqual('Name is required');

      name.value = 'giraffe'
      TestUtils.Simulate.change(name);
      expect(form.state.category.name).toEqual('giraffe');
      expect(formGroup.className).toMatch(/has-success/);
      expect(helpBlock.textContent).toEqual('');
    });
  });
});
