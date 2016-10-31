import React from 'react';
import SubcategoryRow from '../subcategory-row';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import * as formActions from '../../../actions/form-actions';

describe('SubcategoryRow', () => {
  const subcategory = { name: 'Phone', categoryId: 3 };
  let row;

  beforeEach(() => {
    row = shallowRenderer(<SubcategoryRow subcategory={subcategory} />);
  });

  describe('render', () => {
    it('displays the subcategory', () => {
      expect(row.type).toEqual('tr');
      expect(row.props.children.props.children).toEqual('Phone');
    });
  });

  describe('on click', () => {
    it('calls the handler prop when row is clicked', () => {
      spyOn(formActions, 'showFormModal');
      row.props.onClick();
      expect(formActions.showFormModal).toHaveBeenCalledWith('Subcategory', subcategory, true);
    });
  });
});
