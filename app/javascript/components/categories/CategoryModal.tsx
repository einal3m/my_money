import React from 'react'
import { useSelector } from 'react-redux'

import FormModal from '../common/FormModal'
import CategoryForm from './CategoryForm'
import SubcategoryForm from './SubcategoryForm'
import { GroupedCategories } from 'hooks/useGroupedCategories'
import { ModelType } from 'types/models'
import {
  useUpsertCategoryMutation,
  useUpsertSubcategoryMutation,
  useDeleteCategoryMutation,
  useDeleteSubcategoryMutation,
} from 'stores/categoryApi'
import { RootState } from 'stores/store'

type CategoryModalProps = {
  groupedCategories: GroupedCategories[]
}

export const CategoryModal = (props: CategoryModalProps) => {
  const { show, allowDelete, model, modelType } = useSelector((state: RootState) => state.formStore)
  const [upsertCategory] = useUpsertCategoryMutation()
  const [upsertSubcategory] = useUpsertSubcategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  const [deleteSubcategory] = useDeleteSubcategoryMutation()

  const handleSave = (model: any) => {
    if (modelType === ModelType.Category) {
      upsertCategory(model)
    } else {
      upsertSubcategory(model)
    }
  }

  const handleDelete = (modelId: number) => {
    if (modelType === ModelType.Category) {
      deleteCategory(modelId)
    } else {
      deleteSubcategory(modelId)
    }
  }

  const renderForm = () => {
    if (modelType === ModelType.Category) {
      const categoryTypes = props.groupedCategories.map(
        (categoryType) => categoryType.categoryType,
      )
      return <CategoryForm categoryTypes={categoryTypes} category={model} />
    }
    return (
      <SubcategoryForm
        groupedCategories={props.groupedCategories}
        subcategory={model}
      />
    )
  }

  if (show) {
    return (
      <FormModal
        show
        modelName={modelType}
        allowDelete={allowDelete}
        onSave={handleSave}
        onDelete={handleDelete}
      >
        {renderForm()}
      </FormModal>
    )
  }
  return <div />
}
