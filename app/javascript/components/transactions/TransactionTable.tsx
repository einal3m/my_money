import React from 'react'
import { useSelector } from 'react-redux'

import TransactionRow from './TransactionRow'
import { accountNameAndBank } from 'util/textUtil'
import { UseCurrentDateRange } from 'hooks/useCurrentDateRange'
import { useGetTransactionsQuery } from 'stores/transactionApi'
import { useGroupedAccounts } from 'hooks/useGroupedAccounts'
import { useGroupedCategories } from 'hooks/useGroupedCategories'
import { RootState } from 'stores/store'

import '../../stylesheets/transaction.scss'

const TransactionTable = () => {
  const { currentAccount, accounts } = useGroupedAccounts()
  const { currentDateRange } = UseCurrentDateRange()
  const { groupedCategories } = useGroupedCategories()
  const { searchDescription } = useSelector(
    (state: RootState) => state.transactionStore,
  )
  const isDataLoaded = !!currentAccount && !!groupedCategories
  const { data: transactions } = useGetTransactionsQuery(
    {
      accountId: currentAccount?.id || 0,
      dateRange: currentDateRange,
      description: searchDescription,
    },
    { skip: !isDataLoaded },
  )

  const renderTransactions = () => {
    if (accounts && groupedCategories && transactions) {
      return transactions.map((transaction) => (
        <TransactionRow
          key={transaction.id}
          transaction={transaction}
          groupedCategories={groupedCategories}
          accounts={accounts}
        />
      ))
    }
  }

  const renderTitle = () => {
    if (currentAccount) {
      return <h3>Transactions for {accountNameAndBank(currentAccount)}</h3>
    }
    return undefined
  }

  const renderTable = () => {
    if (!transactions) {
      return undefined
    }
    if (transactions.length > 0) {
      return (
        <table className="table table-hover" id="transaction-table">
          <thead>
            <tr>
              <th className="date">date</th>
              <th>description</th>
              <th className="currency">amount</th>
              <th className="currency">balance</th>
            </tr>
          </thead>
          <tbody>{renderTransactions()}</tbody>
        </table>
      )
    }
    return (
      <div className="empty-state">
        No transactions match the search criteria
      </div>
    )
  }

  return (
    <div>
      {renderTitle()}
      {renderTable()}
    </div>
  )
}

export default TransactionTable
