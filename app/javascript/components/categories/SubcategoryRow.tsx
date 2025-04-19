import React from 'react'

import { ModelType, Subcategory } from 'types/models'
import { useDispatch } from 'react-redux'
import { showFormModal } from 'stores/formSlice'

type SubcategoryRowProps = {
  subcategory: Subcategory
}

export const SubcategoryRow = (props: SubcategoryRowProps) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(
      showFormModal({
        modelType: ModelType.Subcategory,
        model: props.subcategory,
        allowDelete: true,
      }),
    )
  }

  return (
    <div className="subcategory-row click-me" onClick={handleClick}>
      {props.subcategory.name}
    </div>
  )
}
