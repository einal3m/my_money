import React from 'react'
import { useSelector } from 'react-redux'

import D3LineChart from '../reports/D3LineChart'
import { RootState } from 'stores/store'
import { useGetLoanReportQuery } from 'stores/reportApi'

const LoanChartView = () => {
  const currentAccount = useSelector(
    (state: RootState) => state.currentStore.currentAccount,
  )
  const { data, isLoading } = useGetLoanReportQuery(currentAccount?.id || 0, {
    skip: !currentAccount,
  })

  if (isLoading || !data) return <div />

  return (
    <div>
      <D3LineChart seriesData={data} />
    </div>
  )
}

export default LoanChartView
