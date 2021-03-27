import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import { CategoryModalComponent as CategoryModal } from '../category-modal';
import FormModal from '../../common/form-modal';
import CategoryForm from '../category-form';
import SubcategoryForm from '../subcategory-form';
import categoryActions from '../../../actions/category-actions';

describe('CategoryModal', () => {
  const category1 = { id: 1, name: 'One', subcategories: [] };
  const category2 = { id: 2, name: 'Two', subcategories: [{ id: 45, name: 'Four', categoryId: 2 }] };
  const category3 = { id: 3, name: 'Three', subcategories: [] };

  const categoryType1 = { id: 1, code: 'income', name: 'Income' };
  const categoryType2 = { id: 2, code: 'expense', name: 'Expense' };
  const groupedCategories = [
    { categoryType: categoryType1, categories: [category1, category2] },
    { categoryType: categoryType2, categories: [category3] },
  ];

  describe('render', () => {
    it('does not display modal if show is false', () => {
      const categoryModal = shallowRenderer(
        <CategoryModal show={false} groupedCategories={groupedCategories} />
      );

      expect(categoryModal.type).toEqual('div');
      expect(categoryModal.props.children).toEqual(undefined);
    });

    it('shows category form if modelType is category', () => {
      const categoryModal = shallowRenderer(
        <CategoryModal
          show
          groupedCategories={groupedCategories}
          modelType="Category"
          model={{ id: 34 }}
          allowDelete
        />
      );

      expect(categoryModal.type).toEqual(FormModal);
      expect(categoryModal.props.show).toEqual(true);
      expect(categoryModal.props.modelName).toEqual('Category');
      expect(categoryModal.props.allowDelete).toEqual(true);

      const categoryForm = categoryModal.props.children;
      expect(categoryForm.type).toEqual(CategoryForm);
      expect(categoryForm.props.category).toEqual({ id: 34 });
      expect(categoryForm.props.categoryTypes).toEqual([categoryType1, categoryType2]);
    });

    it('shows subcategory form if modelType is subcategory', () => {
      const categoryModal = shallowRenderer(
        <CategoryModal
          show
          groupedCategories={groupedCategories}
          modelType="Subcategory"
          model={{ id: 34 }}
          allowDelete={false}
        />
      );

      expect(categoryModal.type).toEqual(FormModal);
      expect(categoryModal.props.show).toEqual(true);
      expect(categoryModal.props.modelName).toEqual('Subcategory');
      expect(categoryModal.props.allowDelete).toEqual(false);

      const subcategoryForm = categoryModal.props.children;
      expect(subcategoryForm.type).toEqual(SubcategoryForm);
      expect(subcategoryForm.props.subcategory).toEqual({ id: 34 });
      expect(subcategoryForm.props.groupedCategories).toEqual(groupedCategories);
    });
  });

  describe('events', () => {
    it('saves category', () => {
      spyOn(categoryActions, 'saveCategory');

      const categoryModal = shallowRenderer(
        <CategoryModal
          show
          groupedCategories={groupedCategories}
          modelType="Category"
          model={{ id: 34 }}
          allowDelete
        />
      );

      categoryModal.props.onSave({ id: 34 });
      expect(categoryActions.saveCategory).toHaveBeenCalledWith({ id: 34 });
    });

    it('saves subcategory', () => {
      spyOn(categoryActions, 'saveSubcategory');

      const categoryModal = shallowRenderer(
        <CategoryModal
          show
          groupedCategories={groupedCategories}
          modelType="Subcategory"
          model={{ id: 34 }}
          allowDelete
        />
      );

      categoryModal.props.onSave({ id: 34 });
      expect(categoryActions.saveSubcategory).toHaveBeenCalledWith({ id: 34 });
    });

    it('deletes category', () => {
      spyOn(categoryActions, 'deleteCategory');

      const categoryModal = shallowRenderer(
        <CategoryModal
          show
          groupedCategories={groupedCategories}
          modelType="Category"
          model={{ id: 34 }}
          allowDelete
        />
      );

      categoryModal.props.onDelete(34);
      expect(categoryActions.deleteCategory).toHaveBeenCalledWith(34);
    });

    it('deletes subcategory', () => {
      spyOn(categoryActions, 'deleteSubcategory');

      const categoryModal = shallowRenderer(
        <CategoryModal
          show
          groupedCategories={groupedCategories}
          modelType="Subcategory"
          model={{ id: 34 }}
          allowDelete
        />
      );

      categoryModal.props.onDelete(34);
      expect(categoryActions.deleteSubcategory).toHaveBeenCalledWith(34);
    });
  });
});
