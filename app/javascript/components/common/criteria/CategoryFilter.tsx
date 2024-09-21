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
  showSubcategories?: boolean
}

const CategoryFilter = ({ showSubcategories }: CategoryFilterProps) => {
  const { isLoading, groupedCategories } = useGroupedCategories()
  const { currentCategory, currentSubcategory } = useSelector(
    (state: RootState) => state.currentStore,
  )
  const dispatch = useDispatch()

  const groupedOptions = groupedCategories?.map((gc) => ({
    label: gc.categoryType.name,
    options: gc.categories,
  }))

  const subcategoryOptions = groupedCategories
    ?.map((categoryType) =>
      categoryType.categories.filter((c) => c.id === currentCategory?.id),
    )
    .filter((array) => array.length === 1)[0][0].subcategories

  const onSelectCategory = (category: MultiOption | SingleOption | null) => {
    dispatch(setCurrentCategory(category as Category))
  }

  const onSelectSubcategory = (
    subcategory: MultiOption | SingleOption | null,
  ) => {
    dispatch(setCurrentSubcategory(subcategory as Subcategory))
  }

  if (isLoading || !groupedCategories) {
    return <div />
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
        multiple={false}
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
            multiple={false}
          />
        </>
      )}
    </div>
  )
}

export default CategoryFilter
