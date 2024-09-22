import React from 'react'
import { useSelector } from 'react-redux'

import PageHeader from '../common/PageHeader'
import ReportViewButtons from 'components/common/controls/ReportViewButtons'
import SearchCriteria, {
  DATE_RANGE_FILTER,
  CATEGORY_FILTER,
} from 'components/common/criteria/SearchCriteria'
import ReportContent from './ReportContent'
import { SOURCE_CATEGORY_REPORT } from 'actions/action-types'
import { RootState } from 'stores/store'
import { useGetCategoryReportQuery } from 'stores/reportApi'
import { UseCurrentDateRange } from 'hooks/useCurrentDateRange'
import { useGroupedCategories } from 'hooks/useGroupedCategories'

const CategoryReport = () => {
  const { currentReportView } = useSelector(
    (state: RootState) => state.currentStore,
  )
  const { currentCategory } = useGroupedCategories()
  const { currentDateRange } = UseCurrentDateRange()
  const { data } = useGetCategoryReportQuery(
    {
      categoryId: currentCategory?.id,
      dateRange: currentDateRange,
    },
    { skip: !currentDateRange },
  )

  if (!data) {
    return <div />
  }

  return (
    <div>
      <PageHeader title="category report">
        <ReportViewButtons viewType={currentReportView} />
      </PageHeader>
      <SearchCriteria
        filters={[
          {
            name: CATEGORY_FILTER,
            options: { showSubcategories: false, allowUnassigned: true },
          },
          { name: DATE_RANGE_FILTER },
        ]}
      />
      <div className="container">
        <ReportContent
          source={SOURCE_CATEGORY_REPORT}
          viewType={currentReportView}
          transactions={data.transactions}
          chartData={data.chartData}
        />
      </div>
    </div>
  )
}

export default CategoryReport
