import React from 'react'

import PageHeader from '../common/PageHeader'
import SearchCriteria, {
  DATE_RANGE_FILTER,
} from '../common/criteria/SearchCriteria'
import PieAndTable from './PieAndTable'
import { UseCurrentDateRange } from 'hooks/useCurrentDateRange'
import { useIncomeExpenseReport } from 'hooks/useIncomeExpenseReport'

const IncomeVsExpensesReport = () => {
  const { currentDateRange } = UseCurrentDateRange()
  const { incomeExpenseReport, isLoading } =
    useIncomeExpenseReport(currentDateRange)

  return (
    <div>
      <PageHeader title="income vs expenses" />
      <SearchCriteria
        filters={[{ name: DATE_RANGE_FILTER }]}
      />
      <div id="report" className="container">
        <div className="row">
          <div className="col-xs-6">
            <PieAndTable
              loaded={!isLoading}
              title="income"
              tableData={incomeExpenseReport?.tableData.income}
              pieChartData={incomeExpenseReport?.pieChartData.income}
            />
          </div>
          <div className="col-xs-6">
            <PieAndTable
              loaded={!isLoading}
              title="expenses"
              tableData={incomeExpenseReport?.tableData.expense}
              pieChartData={incomeExpenseReport?.pieChartData.expense}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default IncomeVsExpensesReport
