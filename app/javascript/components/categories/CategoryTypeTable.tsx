import React from 'react'

import { CategoryRow } from './CategoryRow'
import { SubcategoryRow } from './SubcategoryRow'
import { CategoryType } from 'types/models'
import { CategoryWithSubcatories } from 'hooks/useGroupedCategories'

type CategoryTypeTableProps = {
  categoryType: CategoryType
  categories: CategoryWithSubcatories[]
}

export const CategoryTypeTable = (props: CategoryTypeTableProps) => {
  const renderSubcategories = (category: CategoryWithSubcatories) =>
    category.subcategories.map((subcategory) => (
      <SubcategoryRow key={subcategory.id} subcategory={subcategory} />
    ))

  const renderCategories = () => {
    if (props.categories) {
      return props.categories.map((category) => (
        <div className="category" key={category.id}>
          <CategoryRow category={category} />
          {renderSubcategories(category)}
        </div>
      ))
    }
    return undefined
  }

  return (
    <>
      <h5 className="text-uppercase">{props.categoryType.name}</h5>
      {renderCategories()}
    </>
  )
}
