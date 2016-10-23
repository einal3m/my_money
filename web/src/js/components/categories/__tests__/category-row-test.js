import React from 'react';
import CategoryRow from '../category-row';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';

describe('CategoryRow', () => {
  let category,
    clickHandlerSpy,
    row;
  beforeEach(() => {
    category = { name: 'Category One' };
    clickHandlerSpy = jasmine.createSpy('clickHandler');

    row = shallowRenderer(
      <CategoryRow category={category} onClickHandler={clickHandlerSpy} />
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
      expect(clickHandlerSpy).toHaveBeenCalledWith(category);
    });
  });
});
