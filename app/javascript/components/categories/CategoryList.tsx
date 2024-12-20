import React from 'react'

import PageHeader from '../common/PageHeader'
import NewModelButtons from '../common/controls/NewModelButtons'
import CategoryTypeTable from './CategoryTypeTable'
import { CategoryModal } from './CategoryModal'
import { useGroupedCategories } from 'hooks/useGroupedCategories'

import '../../stylesheets/common.scss'
import '../../stylesheets/categories.scss'

export const CategoryList = () => {
  const { groupedCategories, isLoading, isSuccess } = useGroupedCategories()

  const renderCategoryTypes = () => {
    if (isLoading || !isSuccess) return <></>

    return groupedCategories?.filter((gc) => gc.categoryType.editable).map((ct) => (
      <div key={ct.categoryType.code} className="category-type">
        <CategoryTypeTable
          categoryType={ct.categoryType}
          categories={ct.categories}
        />
      </div>
    ))
  }

  return (
    <div>
      <PageHeader title="my categories" isLoading={isLoading}>
        <NewModelButtons modelTypes={['Category', 'Subcategory']} />
      </PageHeader>
      <div className="category-list">{renderCategoryTypes()}</div>
      <CategoryModal groupedCategories={groupedCategories || []} />
    </div>
  )
}
