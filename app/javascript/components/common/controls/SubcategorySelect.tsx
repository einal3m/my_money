import React from 'react'

import { SingleSelect } from './SingleSelect'
import { GroupedCategories } from 'hooks/useGroupedCategories'
import { Subcategory } from 'types/models'

type SubcategorySelectProps = {
  name: string
  value: number | undefined
  categoryId: number
  allowUnassigned?: boolean
  groupedCategories: GroupedCategories[]
  onChange: (newValue: number | undefined) => void
}

export const SubcategorySelect = (props: SubcategorySelectProps) => {
  const subcategoriesForCategory = (): Subcategory[] => {
    return props.groupedCategories
      .map((categoryType) =>
        categoryType.categories.filter(
          (category) => category.id === props.categoryId,
        ),
      )
      .filter((array) => array.length === 1)[0][0].subcategories
  }

  return (
    <SingleSelect
      name="subcategoryId"
      value={props.value == 0 ? undefined : props.value}
      options={subcategoriesForCategory()}
      allowUnassigned
      onChange={props.onChange}
    />
  )
}
