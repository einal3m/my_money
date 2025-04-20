import React from 'react'

import { SingleSelect } from './SingleSelect'
import { GroupedCategories } from 'hooks/useGroupedCategories'

type CategorySelectProps = {
  name: string
  allowUnassigned?: boolean
  value: number | undefined
  groupedCategories: GroupedCategories[]
  onChange: (newValue: number | undefined) => void
}

export const CategorySelect = (props: CategorySelectProps) => {
  const groupedOptions = () => {
    return props.groupedCategories.map((group) => ({
      label: group.categoryType.name,
      options: group.categories,
    }))
  }

  return (
    <SingleSelect
      name="categoryId"
      value={props.value}
      allowUnassigned={props.allowUnassigned}
      groupedOptions={groupedOptions()}
      onChange={props.onChange}
    />
  )
}
