import React from 'react';
import SubcategoryRow from '../subcategory-row';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';

describe('SubcategoryRow', () => {
  let subcategory,
    clickHandlerSpy,
    row;
  beforeEach(() => {
    subcategory = { name: 'Phone', categoryId: 3 };
    clickHandlerSpy = jasmine.createSpy('clickHandler');

    row = shallowRenderer(
      <SubcategoryRow subcategory={subcategory} onClickHandler={clickHandlerSpy} />
    );
  });

  describe('render', () => {
    it('displays the subcategory', () => {
      expect(row.props.children.props.children).toEqual('Phone');
    });
  });

  describe('on click', () => {
    it('calls the handler prop when row is clicked', () => {
      row.props.onClick();
      expect(clickHandlerSpy).toHaveBeenCalledWith(subcategory);
    });
  });
});
