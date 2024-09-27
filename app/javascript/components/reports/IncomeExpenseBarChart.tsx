import React from 'react'

import PageHeader from '../common/PageHeader'
import D3BarLineComboChart from './D3BarLineComboChart'
import { useGetIncomeExpensesBarReportQuery } from 'stores/reportApi'

import '../../stylesheets/common.scss'
import '../../stylesheets/report.scss'

const IncomeVsExpenseBarChart = () => {
  const { data: chartData } = useGetIncomeExpensesBarReportQuery()

  const renderChart = () => {
    if (chartData) {
      return <D3BarLineComboChart chartData={chartData} />
    }
    return undefined
  }

  return (
    <div>
      <PageHeader title="Income vs Expenses" />
      <div id="report" className="container">
        {renderChart()}
      </div>
    </div>
  )
}

export default IncomeVsExpenseBarChart
