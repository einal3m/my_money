import React from 'react'

import PageHeader from '../common/PageHeader'
import SearchCriteria, {
  DATE_RANGE_FILTER,
} from '../common/criteria/SearchCriteria'
import D3LineChart from './D3LineChart'
import { useGetNetBalanceReportQuery } from 'stores/reportApi'
import { UseCurrentDateRange } from 'hooks/useCurrentDateRange'
import { transformNetBalanceReport } from 'transformers/reportTransformer'

import '../../stylesheets/common.scss'
import '../../stylesheets/report.scss'

const NetBalanceChart = () => {
  const { currentDateRange } = UseCurrentDateRange()
  const { data, isLoading } = useGetNetBalanceReportQuery(currentDateRange, {
    skip: !currentDateRange,
  })

  const renderChart = () => {
    if (data) {
      const seriesData = transformNetBalanceReport(data)
      return <D3LineChart seriesData={[seriesData]} />
    }
    return undefined
  }

  return (
    <div>
      <PageHeader title="Net Balance Report" isLoading={isLoading} />
      <SearchCriteria filters={[{ name: DATE_RANGE_FILTER }]} />
      <div id="report" className="container">
        {renderChart()}
      </div>
    </div>
  )
}

export default NetBalanceChart
