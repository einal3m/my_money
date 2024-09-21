import React from 'react'

import AccountFilter from './AccountFilter'
import DateRangeFilter from './DateRangeFilter'
import CategoryFilter from './CategoryFilter'

export const DATE_RANGE_FILTER = 'DATE_RANGE_FILTER'
export const ACCOUNT_FILTER = 'ACCOUNT_FILTER'
export const CATEGORY_FILTER = 'CATEGORY_FILTER'

import '../../../stylesheets/search-criteria.scss'

type FilterOptions = {
  multiple?: boolean
  showSubcategories?: boolean
}

type Filter = {
  name: string
  options?: FilterOptions
}

type SearchCriteriaProps = {
  filters: Filter[]
}

const SearchCriteria = ({ filters }: SearchCriteriaProps) => {
  const renderFilter = ({ name, options }: Filter) => {
    const allowMultipleAccounts = options?.multiple == true
    const showSubcategories = options?.showSubcategories == true

    switch (name) {
      case DATE_RANGE_FILTER:
        return <DateRangeFilter key={DATE_RANGE_FILTER} />
      case ACCOUNT_FILTER:
        return (
          <AccountFilter
            key={ACCOUNT_FILTER}
            multiple={allowMultipleAccounts}
          />
        )
      case CATEGORY_FILTER:
        return (
          <CategoryFilter
            key={CATEGORY_FILTER}
            showSubcategories={showSubcategories}
          />
        )
      default:
        return <div />
    }
  }

  return (
    <div className="search-criteria">
      {filters.map((filter) => renderFilter(filter))}
    </div>
  )
}

export default SearchCriteria
