import React from 'react'
import { useSelector } from 'react-redux'

import PageHeader from '../common/PageHeader'
import ReportViewButtons from '../common/controls/ReportViewButtons'
import SearchCriteria, {
  DATE_RANGE_FILTER,
  CATEGORY_FILTER,
} from '../common/criteria/SearchCriteria'
import ReportContent from './ReportContent'
import { SOURCE_SUBCATEGORY_REPORT } from 'actions/action-types'
import { RootState } from 'stores/store'
import { UseCurrentDateRange } from 'hooks/useCurrentDateRange'
import { useGetSubcategoryReportQuery } from 'stores/reportApi'

const SubcategoryReport = () => {
  const { currentReportView, currentCategory, currentSubcategory } =
    useSelector((state: RootState) => state.currentStore)
  const { currentDateRange } = UseCurrentDateRange()
  const { data } = useGetSubcategoryReportQuery(
    {
      categoryId: currentCategory?.id,
      subcategoryId: currentSubcategory?.id,
      dateRange: currentDateRange,
    },
    { skip: !currentDateRange },
  )

  if (!data) {
    return <div />
  }

  return (
    <div>
      <PageHeader title="subcategory report">
        <ReportViewButtons viewType={currentReportView} />
      </PageHeader>
      <SearchCriteria
        filters={[
          {
            name: CATEGORY_FILTER,
            options: { showSubcategories: true, allowUnassigned: true },
          },
          { name: DATE_RANGE_FILTER },
        ]}
      />
      <div className="container">
        <ReportContent
          source={SOURCE_SUBCATEGORY_REPORT}
          viewType={currentReportView}
          transactions={data.transactions}
          chartData={data.chartData}
        />
      </div>
    </div>
  )
}

export default SubcategoryReport
