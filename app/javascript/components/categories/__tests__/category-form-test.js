import React from 'react';
import TestUtils from 'react-addons-test-utils';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import CategoryForm from '../category-form';
import FormControl from '../../common/controls/form-control';
import Select from '../../common/controls/select';

describe('CategoryForm', () => {
  const category = { id: 11, name: 'categoryName', categoryTypeId: 1 };
  const categoryTypes = [{ id: 1, name: 'Income' }, { id: 2, name: 'Expense' }];

  describe('render', () => {
    let form;
    let name;
    let categoryType;

    beforeEach(() => {
      form = shallowRenderer(<CategoryForm category={category} categoryTypes={categoryTypes} />);
      [categoryType, name] = form.props.children;
    });

    it('has a category type', () => {
      expect(categoryType.type).toEqual(FormControl);
      expect(categoryType.props.label).toEqual('Category Type');
      expect(categoryType.props.name).toEqual('categoryTypeId');
      expect(categoryType.props.children.props.options).toEqual(categoryTypes);
      expect(categoryType.props.children.props.value).toEqual(1);
    });

    it('has a name field', () => {
      expect(name.type).toEqual(FormControl);
      expect(name.props.name).toEqual('name');
      expect(name.props.label).toEqual('Name');
      expect(name.props.children.type).toEqual('input');
      expect(name.props.children.props.value).toEqual('categoryName');
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
      const name = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[1];

      name.value = '';
      TestUtils.Simulate.change(name);
      expect(form.validator.errorState('name')).toEqual('has-error');
      expect(form.validator.errorFor('name')).toEqual('Name is required');

      name.value = 'giraffe';
      TestUtils.Simulate.change(name);
      expect(form.state.category.name).toEqual('giraffe');
      expect(form.validator.errorState('name')).toEqual('has-success');
      expect(form.validator.errorFor('name')).toBeUndefined();
    });

    it('category type is required', () => {
      const form = TestUtils.renderIntoDocument(
        <CategoryForm category={{ categoryTypeId: 2 }} categoryTypes={categoryTypes} />
      );
      const categoryType = TestUtils.findRenderedComponentWithType(form, Select);

      categoryType.props.onChange(null);
      expect(form.validator.errorState('categoryTypeId')).toEqual('has-error');
      expect(form.validator.errorFor('categoryTypeId')).toEqual('Category type id is required');

      categoryType.props.onChange(2);
      expect(form.state.category.categoryTypeId).toEqual(2);
      expect(form.validator.errorState('categoryTypeId')).toEqual('has-success');
      expect(form.validator.errorFor('categoryTypeId')).toBeUndefined();
    });
  });
});
