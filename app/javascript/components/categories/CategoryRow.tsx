import React from 'react'

import { showFormModal } from 'stores/formSlice'
import { ModelType } from 'types/models'
import { useDispatch } from 'react-redux'
import { CategoryWithSubcatories } from 'hooks/useGroupedCategories'

type CategoryRowProps = {
  category: CategoryWithSubcatories
}

export const CategoryRow = (props: CategoryRowProps) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(
      showFormModal({
        modelType: ModelType.Category,
        model: props.category,
        allowDelete: props.category.subcategories.length == 0,
      }),
    )
  }

  return (
    <div className="category-row click-me" onClick={handleClick}>
      {props.category.name}
    </div>
  )
}
