import React from 'react'

import D3BarChart from './D3BarChart'
import ReportTransactionTable from './ReportTransactionTable'
import { BarChartData, Transaction } from 'types/models'
import { ReportViewType } from 'stores/currentSlice'

type ReportContentProps = {
  viewType: ReportViewType
  source: string
  transactions: Transaction[]
  chartData: BarChartData
}

const ReportContent = (props: ReportContentProps) => {
  const renderTable = () => (
    <ReportTransactionTable
      source={props.source}
      transactions={props.transactions}
    />
  )

  const renderChart = () => <D3BarChart chartData={props.chartData} />

  const renderNoTransactions = () => (
    <div className="empty-state">There are no transactions</div>
  )

  let content
  if (props.transactions.length === 0) {
    content = renderNoTransactions()
  } else if (props.viewType === 'chart') {
    content = renderChart()
  } else {
    content = renderTable()
  }

  return content
}

export default ReportContent
