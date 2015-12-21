import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import CategoryForm from '../category-form';
import { fromJS } from 'immutable';

describe('CategoryForm', () => {
  let selectedCategoryType;
  beforeEach(() => {
    selectedCategoryType = fromJS({code: 'income', name: 'Income'});
  });

  describe('render', () => {
    let form, name, categoryType;
    beforeEach(() => {
      form = shallowRenderer(<CategoryForm categoryType={selectedCategoryType}/>);
      [categoryType, name] = form.props.children;
    });

    it('has a category type', () => {
      expect(categoryType.props.children).toEqual('Income')
    });

    it('has a name field', () => {
      expect(name.props.children[0].props.children).toEqual('Name');
      expect(name.props.children[1].type).toEqual('input');
      expect(name.props.children[1].props.value).toEqual(null);
    });
  });
  
  describe('isValid', () => {
    it('returns true if all fields are valid', () => {
      let form = TestUtils.renderIntoDocument(<CategoryForm categoryType={selectedCategoryType}/>);
      spyOn(form, 'forceUpdate');
      form.state.category = {name: 'myName', categoryType: 'income'};
      expect(form.isValid()).toEqual(true);
      expect(form.forceUpdate).toHaveBeenCalled();
    });

    it('returns false if any fields are invalid', () => {
      let form = TestUtils.renderIntoDocument(<CategoryForm categoryType={selectedCategoryType}/>);
      spyOn(form, 'forceUpdate');
      form.state.category = {name: '', categoryType: 'income'};
      expect(form.isValid()).toEqual(false);
      expect(form.forceUpdate).toHaveBeenCalled();
    });
  });

  describe('updating state and validation', () => {
    it('updates state and validates name is required', () => {
      let form = TestUtils.renderIntoDocument(<CategoryForm categoryType={selectedCategoryType}/>);
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
