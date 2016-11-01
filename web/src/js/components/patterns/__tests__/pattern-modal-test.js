import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import { PatternModalComponent as PatternModal } from '../pattern-modal';
import PatternForm from '../pattern-form';
import FormModal from '../../common/form-modal';
import * as patternActions from '../../../actions/pattern-actions';

describe('PatternModal', () => {
  const pattern = { id: 11, matchText: 'Description', notes: 'my note', categoryId: 4, subcategoryId: 6 };
  const categoryType = { id: 1, code: 'income', name: 'Income' };
  const groupedCategories = [{ categoryType, categories: [] }];

  describe('render', () => {
    it('does not display modal if show is false', () => {
      const patternModal = shallowRenderer(
        <PatternModal show={false} groupedCategories={groupedCategories} />
      );

      expect(patternModal.type).toEqual('div');
      expect(patternModal.props.children).toEqual(undefined);
    });

    it('shows pattern form', () => {
      const patternModal = shallowRenderer(
        <PatternModal
          show
          groupedCategories={groupedCategories}
          modelType="Pattern"
          model={pattern}
          allowDelete
        />
      );

      expect(patternModal.type).toEqual(FormModal);
      expect(patternModal.props.show).toEqual(true);
      expect(patternModal.props.modelName).toEqual('Pattern');
      expect(patternModal.props.allowDelete).toEqual(true);

      const patternForm = patternModal.props.children;
      expect(patternForm.type).toEqual(PatternForm);
      expect(patternForm.props.pattern).toEqual(pattern);
      expect(patternForm.props.groupedCategories).toEqual(groupedCategories);
    });
  });

  describe('events', () => {
    it('saves pattern', () => {
      spyOn(patternActions, 'savePattern');

      const patternModal = shallowRenderer(
        <PatternModal
          show
          groupedCategories={groupedCategories}
          modelType="Pattern"
          model={pattern}
          allowDelete
        />
      );

      patternModal.props.onSave(pattern);
      expect(patternActions.savePattern).toHaveBeenCalledWith(pattern);
    });

    it('deletes transaction', () => {
      spyOn(patternActions, 'deletePattern');

      const patternModal = shallowRenderer(
        <PatternModal
          show
          groupedCategories={groupedCategories}
          modelType="Pattern"
          model={pattern}
          allowDelete
        />
      );

      patternModal.props.onDelete();
      expect(patternActions.deletePattern).toHaveBeenCalledWith(pattern);
    });
  });
});
