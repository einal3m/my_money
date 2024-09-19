import React from 'react'
import { useSelector } from 'react-redux'

import PageHeader from '../common/PageHeader'
import LoanViewButtons from './LoanViewButtons'
import LoanChartView from './LoanChartView'
import BudgetTable from './BudgetTable'
import { accountNameAndBank } from '../../util/text-util'
import { RootState } from 'stores/store'

const LoanReport = () => {
  const { currentLoanView, currentAccount } = useSelector(
    (state: RootState) => state.currentStore,
  )

  const renderContent = () => {
    switch (currentLoanView) {
      case 'chart':
        return <LoanChartView />
      case 'budget':
        return <BudgetTable />
      default:
        return <div />
    }
  }

  return (
    <div>
      <PageHeader title="loan report" apiStatus={{}}>
        <LoanViewButtons />
      </PageHeader>
      <div id="report" className="container">
        <h3>{accountNameAndBank(currentAccount)}</h3>
        {renderContent()}
      </div>
    </div>
  )
}

export default LoanReport
