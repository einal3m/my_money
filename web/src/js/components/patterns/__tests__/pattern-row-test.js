import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import PatternRow from '../pattern-row';
import * as formActions from '../../../actions/form-actions';

describe('PatternRow', () => {
  let patternRow;
  const pattern = {
    id: 23,
    accountId: 14,
    matchText: 'my text',
    notes: 'my note',
    categoryId: 3,
    subcategoryId: 5,
  };
  const groupedCategories = [{
    categoryType: 'Income',
    categories: [{
      id: 3,
      name: 'My Category',
      subcategories: [{ id: 5, name: 'My Subcategory' }],
    }],
  }];

  describe('render', () => {
    it('pattern attributes', () => {
      patternRow = shallowRenderer(
        <PatternRow pattern={pattern} groupedCategories={groupedCategories} />
      );
      const [matchText, notes, category] = patternRow.props.children;

      expect(patternRow.type).toEqual('tr');
      expect(matchText.props.children).toEqual('my text');
      expect(notes.props.children).toEqual('my note');
      expect(category.props.children).toEqual('My Category/My Subcategory');
    });
  });

  describe('events', () => {
    it('click row opens edit pattern modal', () => {
      spyOn(formActions, 'showFormModal');
      patternRow = shallowRenderer(
        <PatternRow pattern={pattern} groupedCategories={groupedCategories} />
      );

      patternRow.props.onClick();

      expect(formActions.showFormModal).toHaveBeenCalledWith('Pattern', pattern, { allowDelete: true });
    });
  });
});
