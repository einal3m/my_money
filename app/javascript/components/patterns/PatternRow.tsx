import React from 'react'

import { showFormModal } from 'stores/formSlice'
import { categoryAndSubcategory } from 'util/textUtil'
import { ModelType, Pattern } from 'types/models'
import { GroupedCategories } from 'hooks/useGroupedCategories'
import { useDispatch } from 'react-redux'

type PatternRowProps = {
  pattern: Pattern
  groupedCategories: GroupedCategories[]
}

export const PatternRow = (props: PatternRowProps) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(
      showFormModal({
        modelType: ModelType.Pattern,
        model: props.pattern,
        allowDelete: true,
      }),
    )
  }

  return (
    <tr className="click-me" onClick={handleClick}>
      <td>{props.pattern.matchText}</td>
      <td>{props.pattern.notes}</td>
      <td>{categoryAndSubcategory(props.pattern, props.groupedCategories)}</td>
    </tr>
  )
}
