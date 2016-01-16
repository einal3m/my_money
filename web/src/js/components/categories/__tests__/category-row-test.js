import React from 'react';
import CategoryRow from '../category-row';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';

describe('CategoryRow', () => {
  let category, categoryType, clickHandlerSpy, row;
  beforeEach(() => {
    category = {name: 'Category One'};
    categoryType = {id: 2, name: 'Income'};
    clickHandlerSpy = jasmine.createSpy('clickHandler');
    row = shallowRenderer(
      <CategoryRow categoryType={categoryType} category={category} onClickHandler={clickHandlerSpy}/>
    );
  });

  describe('render', () => {
    it('displays the category', () => {
      expect(row.props.children.props.children).toEqual('Category One');
    });
  });

  describe('on click', () => {
    it('calls the handler prop when row is clicked', () => {
      row.props.onClick();
      expect(clickHandlerSpy).toHaveBeenCalledWith(categoryType, category);
    });
  });
});
