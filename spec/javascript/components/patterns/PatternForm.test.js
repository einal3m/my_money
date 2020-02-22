import React from 'react';
import TestUtils from 'react-addons-test-utils';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import PatternForm from '../pattern-form';
import GroupedCategorySelect from '../../common/controls/grouped-category-select';
import SubcategoryPicker from '../../common/controls/subcategory-picker';
import FormControl from '../../common/controls/form-control';

describe('PatternForm', () => {
  const groupedCategories = [
    { categoryType: { id: 1, name: 'Expense' },
      categories: [{ id: 3, name: 'Cat', subcategories: [{ id: 5, name: 'Dog' }] }],
    },
  ];

  const pattern = {
    id: 22,
    matchText: 'my match',
    notes: 'This is a note',
    categoryId: 3,
    subcategoryId: 5,
  };

  describe('render', () => {
    it('has a control for each editable property', () => {
      const form = shallowRenderer(
        <PatternForm pattern={pattern} groupedCategories={groupedCategories} />
      );
      const [matchText, notes, categoryGroup] = form.props.children;
      const [category, subcategory] = categoryGroup.props.children;

      expect(matchText.type).toEqual(FormControl);
      expect(matchText.props.name).toEqual('matchText');
      expect(matchText.props.label).toEqual('Match Text');
      expect(matchText.props.children.type).toEqual('input');
      expect(matchText.props.children.props.value).toEqual('my match');

      expect(notes.type).toEqual(FormControl);
      expect(notes.props.name).toEqual('notes');
      expect(notes.props.label).toEqual('Notes');
      expect(notes.props.children.type).toEqual('input');
      expect(notes.props.children.props.value).toEqual('This is a note');

      expect(category.props.children.type).toEqual(FormControl);
      expect(category.props.children.props.name).toEqual('categoryId');
      expect(category.props.children.props.label).toEqual('Category');
      expect(category.props.children.props.children.type).toEqual(GroupedCategorySelect);
      expect(category.props.children.props.children.props.groupedCategories).toEqual(groupedCategories);
      expect(category.props.children.props.children.props.value).toEqual(3);

      expect(subcategory.props.children.type).toEqual(FormControl);
      expect(subcategory.props.children.props.name).toEqual('subcategoryId');
      expect(subcategory.props.children.props.label).toEqual('Subcategory');
      expect(subcategory.props.children.props.children.type).toEqual(SubcategoryPicker);
      expect(subcategory.props.children.props.children.props.groupedCategories).toEqual(groupedCategories);
      expect(subcategory.props.children.props.children.props.categoryId).toEqual(3);
      expect(subcategory.props.children.props.children.props.value).toEqual(5);
    });

    it('does not display subcategory picker if category id is null', () => {
      const form = shallowRenderer(
        <PatternForm pattern={{ }} groupedCategories={groupedCategories} />
      );
      const [matchText, notes, categoryGroup] = form.props.children;
      const [category, subcategory] = categoryGroup.props.children;

      expect(matchText.props.label).toEqual('Match Text');
      expect(notes.props.label).toEqual('Notes');
      expect(category.props.children.props.label).toEqual('Category');
      expect(subcategory.props.children).toEqual(<div />);
    });
  });

  describe('isValid', () => {
    it('returns true if all fields are valid', () => {
      const form = TestUtils.renderIntoDocument(
        <PatternForm pattern={pattern} groupedCategories={groupedCategories} />
      );
      spyOn(form, 'forceUpdate');
      expect(form.isValid()).toEqual(true);
      expect(form.forceUpdate).toHaveBeenCalled();
    });

    describe('updating state and validation', () => {
      it('updates state and validates match text is required', () => {
        const form = TestUtils.renderIntoDocument(
          <PatternForm pattern={pattern} groupedCategories={groupedCategories} />
        );
        const matchText = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[0];

        matchText.value = '';
        TestUtils.Simulate.change(matchText);
        expect(form.validator.errorState('matchText')).toEqual('has-error');
        expect(form.validator.errorFor('matchText')).toEqual('Match text is required');

        matchText.value = 'giraffe';
        TestUtils.Simulate.change(matchText);
        expect(form.state.pattern.matchText).toEqual('giraffe');
        expect(form.validator.errorState('matchText')).toEqual('has-success');
        expect(form.validator.errorFor('matchText')).toBeUndefined();
      });

      it('updates notes in state, optional field can be empty', () => {
        const form = TestUtils.renderIntoDocument(
          <PatternForm pattern={pattern} groupedCategories={groupedCategories} />
        );
        const notes = TestUtils.scryRenderedDOMComponentsWithTag(form, 'input')[1];

        notes.value = '';
        TestUtils.Simulate.change(notes);
        expect(form.state.pattern.notes).toEqual('');
        expect(form.validator.errorState('notes')).toEqual('has-success');
        expect(form.validator.errorFor('notes')).toBeUndefined();

        notes.value = 'My Bank';
        TestUtils.Simulate.change(notes);
        expect(form.state.pattern.notes).toEqual('My Bank');
        expect(form.validator.errorState('notes')).toEqual('has-success');
        expect(form.validator.errorFor('notes')).toBeUndefined();
      });
    });
  });
});
