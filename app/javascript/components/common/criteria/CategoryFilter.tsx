import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useGroupedCategories } from 'hooks/useGroupedCategories'
import { RootState } from 'stores/store'
import Select, {
  MultiOption,
  SingleOption,
} from 'components/common/controls/MultiSelect'
import { setCurrentCategory, setCurrentSubcategory } from 'stores/currentSlice'
import { Category, Subcategory } from 'types/models'

type CategoryFilterProps = {
  showSubcategories: boolean
  allowUnassigned: boolean
}

const CategoryFilter = ({
  showSubcategories,
  allowUnassigned,
}: CategoryFilterProps) => {
  const { isLoading, groupedCategories } = useGroupedCategories()
  const { currentCategory, currentSubcategory } = useSelector(
    (state: RootState) => state.currentStore,
  )
  const dispatch = useDispatch()

  if (isLoading || !groupedCategories) {
    return <div />
  }

  const groupedOptions = groupedCategories.map((gc) => ({
    label: gc.categoryType.name,
    options: gc.categories,
  }))

  let subcategoryOptions: Subcategory[] = []
  if (showSubcategories && currentCategory) {
    subcategoryOptions = groupedCategories
      .map((categoryType) =>
        categoryType.categories.filter((c) => c.id === currentCategory.id),
      )
      .filter((array) => array.length === 1)[0][0].subcategories
  }

  const onSelectCategory = (category: MultiOption | SingleOption | null) => {
    dispatch(setCurrentCategory(category as Category))
  }

  const onSelectSubcategory = (
    subcategory: MultiOption | SingleOption | null,
  ) => {
    dispatch(setCurrentSubcategory(subcategory as Subcategory))
  }

  return (
    <div className="category-filter">
      <label htmlFor="currentCategoryId" className="control-label">
        Category
      </label>
      <Select
        name="currentCategoryId"
        value={currentCategory}
        groupedOptions={groupedOptions}
        onChange={onSelectCategory}
        isMulti={false}
        allowUnassigned={allowUnassigned}
      />
      {showSubcategories && currentCategory && (
        <>
          <label htmlFor="currentSubcategoryId" className="control-label">
            Subcategory
          </label>
          <Select
            name="currentSubcategoryId"
            value={currentSubcategory}
            options={subcategoryOptions}
            onChange={onSelectSubcategory}
            isMulti={false}
            allowUnassigned={allowUnassigned}
          />
        </>
      )}
    </div>
  )
}

export default CategoryFilter
