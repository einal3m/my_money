import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { FormModal } from 'components/common/NewFormModal'
import { CategoryForm } from './CategoryForm'
import { SubcategoryForm } from './SubcategoryForm'
import { GroupedCategories } from 'hooks/useGroupedCategories'
import { ModelType } from 'types/models'
import {
  useUpsertCategoryMutation,
  useUpsertSubcategoryMutation,
  useDeleteCategoryMutation,
  useDeleteSubcategoryMutation,
} from 'stores/categoryApi'
import { RootState } from 'stores/store'
import { hideFormModal } from 'stores/formSlice'

type CategoryFormModalProps = {
  groupedCategories: GroupedCategories[]
}

export const CategoryModal = (props: CategoryFormModalProps) => {
  const { show, allowDelete, model, modelType } = useSelector(
    (state: RootState) => state.formStore,
  )
  const [upsertCategory] = useUpsertCategoryMutation()
  const [upsertSubcategory] = useUpsertSubcategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  const [deleteSubcategory] = useDeleteSubcategoryMutation()

  const dispatch = useDispatch()

  const handleSave = (model: any) => {
    if (modelType === ModelType.Category) {
      upsertCategory(model)
    } else {
      upsertSubcategory(model)
    }
    dispatch(hideFormModal())
  }

  const handleDelete = () => {
    if (modelType === ModelType.Category) {
      deleteCategory(model.id)
    } else {
      deleteSubcategory(model.id)
    }
  }

  const renderForm = () => {
    if (modelType === ModelType.Category) {
      const categoryTypes = props.groupedCategories.map(
        (categoryType) => categoryType.categoryType,
      )
      return (
        <CategoryForm
          categoryTypes={categoryTypes}
          category={model}
          onSubmit={handleSave}
        />
      )
    }
    return (
      <SubcategoryForm
        groupedCategories={props.groupedCategories}
        subcategory={model}
        onSubmit={handleSave}
      />
    )
  }

  if (show && modelType) {
    return (
      <FormModal
        show
        modelId={model.id}
        modelName={modelType}
        allowDelete={allowDelete}
        onDelete={handleDelete}
      >
        {renderForm()}
      </FormModal>
    )
  }

  return <div />
}
