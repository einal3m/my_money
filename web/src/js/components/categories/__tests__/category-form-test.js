import React from 'react';
import ReactDOM from 'react-dom';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import CategoryForm from '../category-form';
import Picker from '../../common/controls/picker';

describe('CategoryForm', () => {
  let category,
    categoryTypes;
  beforeEach(() => {
    category = { id: 11, name: 'categoryName', categoryTypeId: 1 };
    categoryTypes = [{ id: 1, name: 'Income' }, { id: 2, name: 'Expense' }];
  });

  describe('render', () => {
    let form,
      name,
      categoryType;
    beforeEach(() => {
      form = shallowRenderer(<CategoryForm category={category} categoryTypes={categoryTypes} />);
      [categoryType, name] = form.props.children;
    });

    it('has a category type', () => {
      expect(categoryType.props.children[0].props.children).toEqual('Category Type');
      expect(categoryType.props.children[1].type).toEqual(Picker);
      expect(categoryType.props.children[1].props.options).toEqual(categoryTypes);
      expect(categoryType.props.children[1].props.value).toEqual(1);
    });

    it('has a name field', () => {
      expect(name.props.children[0].props.children).toEqual('Name');
      expect(name.props.children[1].type).toEqual('input');
      expect(name.props.children[1].props.value).toEqual('categoryName');
    });
  });

  describe('isValid', () => {
    it('returns true if all fields are valid', () => {
      const form = TestUtils.renderIntoDocument(<CategoryForm category={category} categoryTypes={categoryTypes} />);
      spyOn(form, 'forceUpdate');
      form.state.category = { name: 'myName', categoryTypeId: 2 };
      expect(form.isValid()).toEqual(true);
      expect(form.forceUpdate).toHaveBeenCalled();
    });

    it('returns false if name field is missing', () => {
      const form = TestUtils.renderIntoDocument(<CategoryForm category={category} categoryTypes={categoryTypes} />);
      spyOn(form, 'forceUpdate');
      form.state.category = { name: '', categoryTypeId: 2 };
      expect(form.isValid()).toEqual(false);
      expect(form.forceUpdate).toHaveBeenCalled();
    });

    it('returns false if category type field is missing', () => {
      const form = TestUtils.renderIntoDocument(<CategoryForm category={category} categoryTypes={categoryTypes} />);
      spyOn(form, 'forceUpdate');
      form.state.category = { name: 'myName', categoryTypeId: null };
      expect(form.isValid()).toEqual(false);
      expect(form.forceUpdate).toHaveBeenCalled();
    });
  });

  describe('updating state and validation', () => {
    it('name is required', () => {
      const form = TestUtils.renderIntoDocument(<CategoryForm category={{}} categoryTypes={categoryTypes} />);
      const name = form.refs.nameField;
      const formGroup = name.parentNode;
      const helpBlock = formGroup.getElementsByClassName('help-block')[0];

      TestUtils.Simulate.change(name);
      expect(formGroup.className).toMatch(/has-error/);
      expect(helpBlock.textContent).toEqual('Name is required');

      name.value = 'giraffe';
      TestUtils.Simulate.change(name);
      expect(form.state.category.name).toEqual('giraffe');
      expect(formGroup.className).toMatch(/has-success/);
      expect(helpBlock.textContent).toEqual('');
    });

    it('category type is required', () => {
      const form = TestUtils.renderIntoDocument(<CategoryForm category={{ categoryTypeId: 2 }} categoryTypes={categoryTypes} />);
      const categoryType = form.refs.categoryTypeIdField;
      const formGroup = ReactDOM.findDOMNode(categoryType).parentNode;
      const helpBlock = formGroup.getElementsByClassName('help-block')[0];

      categoryType.props.onChange(null);
      form.forceUpdate();
      expect(formGroup.className).toMatch(/has-error/);
      expect(helpBlock.textContent).toEqual('Category type id is required');

      categoryType.props.onChange(2);
      form.forceUpdate();
      expect(form.state.category.categoryTypeId).toEqual(2);
      expect(formGroup.className).toMatch(/has-success/);
      expect(helpBlock.textContent).toEqual('');
    });
  });
});
