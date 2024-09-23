import React from 'react'

import PageHeader from '../common/PageHeader'
import SearchCriteria, {
  DATE_RANGE_FILTER,
  ACCOUNT_FILTER,
} from '../common/criteria/SearchCriteria'
import D3LineChart from './D3LineChart'
import { useGetAccountBalanceReportQuery } from 'stores/reportApi'
import { UseCurrentDateRange } from 'hooks/useCurrentDateRange'
import { useGroupedAccounts } from 'hooks/useGroupedAccounts'
import { LineSeriesData } from 'types/models'

import '../../stylesheets/common.scss'
import '../../stylesheets/report.scss'

const AccountBalanceReport = () => {
  const { currentDateRange } = UseCurrentDateRange()
  const { currentSelectedAccounts } = useGroupedAccounts()

  const { data } = useGetAccountBalanceReportQuery(
    { accounts: currentSelectedAccounts || [], dateRange: currentDateRange },
    { skip: !currentDateRange },
  )

  const chartColours = ['#9467bd', '#bcbd22', '#17becf', '#e377c2', '#ffbb78']
  let seriesData: LineSeriesData[] = []
  if (data && currentSelectedAccounts && currentSelectedAccounts.length > 0) {
    seriesData = currentSelectedAccounts
      .map((a, index) => ({
        name: a.name,
        data: data[a.id.toString()],
        backgroundColour: chartColours[index % 5],
      }))
      .filter((sd) => sd.data != undefined)
  }

  const renderChart = () => {
    if (seriesData.length > 0) {
      return <D3LineChart chartData={{ seriesData: seriesData }} />
    }
    return undefined
  }

  return (
    <div>
      <PageHeader title="EOD Balance Report" />
      <SearchCriteria
        filters={[
          { name: DATE_RANGE_FILTER },
          { name: ACCOUNT_FILTER, options: { multiple: true } },
        ]}
      />
      <div id="report" className="container">
        {renderChart()}
      </div>
    </div>
  )
}

export default AccountBalanceReport
