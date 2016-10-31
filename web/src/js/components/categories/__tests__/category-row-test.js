import React from 'react';
import CategoryRow from '../category-row';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import * as formActions from '../../../actions/form-actions';

describe('CategoryRow', () => {
  const category = { name: 'Category One' };
  let row;

  beforeEach(() => {
    row = shallowRenderer(<CategoryRow category={category} />);
  });

  describe('render', () => {
    it('displays the category', () => {
      expect(row.type).toEqual('tr');

      expect(row.props.children.props.children).toEqual('Category One');
    });
  });

  describe('on click', () => {
    it('calls the handler prop when row is clicked', () => {
      spyOn(formActions, 'showFormModal');
      row.props.onClick();
      expect(formActions.showFormModal).toHaveBeenCalledWith('Category', category, true);
    });
  });
});
