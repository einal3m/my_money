import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import GroupedCategorySelect from '../grouped-category-select';

describe('GroupedCategorySelect', () => {

  let select, groupedCategories, onChangeSpy;
  beforeEach(() => {
    onChangeSpy = jasmine.createSpy('onChangeSpy');
    let category1 = {id: 1, name: 'Wages'};
    let category2 = {id: 2, name: 'Bills'};
    let category3 = {id: 3, name: 'Tax Return'};
    groupedCategories = [
      {categoryType: {name: 'Income', id: 4}, categories: [category1, category3]},
      {categoryType: {name: 'Expense', id: 5}, categories: [category2]}
    ];
  });

  describe('render', () => {
    it('has a select with correct category selected', () => {
      select = shallowRenderer(
        <GroupedCategorySelect value={2} groupedCategories={groupedCategories} onChange={onChangeSpy}/>
      );

      expect(select.type).toEqual('select');
      expect(select.props.value).toEqual(2);

      let [blank, optionGroups] = select.props.children;
      expect(blank).toBeUndefined();
      expect(optionGroups.length).toEqual(2);

      let [type1, type2] = optionGroups;
      expect(type1.props.label).toEqual('Income');
      expect(type1.props.children[0].props.children).toEqual('Wages');
      expect(type1.props.children[1].props.children).toEqual('Tax Return');
      expect(type2.props.label).toEqual('Expense');
      expect(type2.props.children[0].props.children).toEqual('Bills');
    });

    it('has a select with a placeholder when value is missing', () => {
      select = shallowRenderer(<GroupedCategorySelect groupedCategories={groupedCategories} onChange={onChangeSpy}/>);
      expect(select.type).toEqual('select');
      expect(select.props.value).toEqual('0');

      let [blank, options] = select.props.children;
      expect(blank.props.children).toEqual('Please select...');
      expect(options.length).toEqual(2);
    });
  });

  describe('onChange', () => {
    it('calls the onChange prop', () => {
      select = TestUtils.renderIntoDocument(
        <GroupedCategorySelect value={2} groupedCategories={groupedCategories} onChange={onChangeSpy}/>
      );
      TestUtils.Simulate.change(select.refs.select, {target: {name: 'categoryId', value: '2'}});

      expect(onChangeSpy).toHaveBeenCalledWith({target: {name: 'categoryId', value: 2}});
    });
  });
});
