import React from 'react'

import ReportTransactionRow from './ReportTransactionRow'
import TransactionModal from '../transactions/TransactionModal'
import ReportTransactionTotalRow from './ReportTransactionTotalRow'
import { Transaction } from 'types/models'
import { useGroupedAccounts } from 'hooks/useGroupedAccounts'
import { useGroupedCategories } from 'hooks/useGroupedCategories'

import '../../stylesheets/transaction.scss'

type ReportTransactionTableProps = {
  source: string
  transactions: Transaction[]
}

const ReportTransactionTable = (props: ReportTransactionTableProps) => {
  const { accounts } = useGroupedAccounts()
  const { groupedCategories } = useGroupedCategories()
  const isLoaded = accounts && groupedCategories && props.transactions

  const renderTransactions = () => {
    return props.transactions.map((transaction) => (
      <ReportTransactionRow
        key={transaction.id}
        account={
          accounts?.filter(
            (account) => account.id === transaction.accountId,
          )[0]
        }
        transaction={transaction}
        groupedCategories={groupedCategories}
        source={props.source}
      />
    ))
  }

  const renderTotalRow = () => {
    let total = 0
    props.transactions.forEach((transaction) => {
      total += transaction.amount
    })

    return <ReportTransactionTotalRow total={total} />
  }

  const renderTable = () => {
    if (isLoaded) {
      return (
        <table
          className="table table-hover table-report"
          id="transaction-table"
        >
          <thead>
            <tr>
              <th className="date">date</th>
              <th>account</th>
              <th>description</th>
              <th className="currency">amount</th>
            </tr>
          </thead>
          <tbody>
            {renderTransactions()}
            {renderTotalRow()}
          </tbody>
        </table>
      )
    }
    return undefined
  }

  return (
    <div>
      <h3>Transactions</h3>
      {renderTable()}
      <TransactionModal />
    </div>
  )
}

export default ReportTransactionTable
