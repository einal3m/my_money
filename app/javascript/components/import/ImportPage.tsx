import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { Button } from 'react-bootstrap'

import PageHeader from '../common/PageHeader'
import ImportTable from './ImportTable'
import { useGroupedAccounts } from 'hooks/useGroupedAccounts'
import { useGroupedCategories } from 'hooks/useGroupedCategories'
import { RootState } from 'stores/store'
import { useCreateBankStatementMutation } from 'stores/importApi'

import '../../stylesheets/common.scss'
import '../../stylesheets/import.scss'

const ImportPage = () => {
  const { currentAccount } = useGroupedAccounts()
  const { groupedCategories, subcategories } = useGroupedCategories()
  const { transactions, filename } = useSelector(
    (state: RootState) => state.importStore,
  )

  const [toTransactions, setToTransaction] = useState(false)
  const [createBankStatement] = useCreateBankStatementMutation()

  const isLoading =
    !currentAccount || !transactions || !groupedCategories || !subcategories

  const importTransactions = () => {
    const ofXTransactions = transactions.filter((t) => t.import)
    createBankStatement({
      accountId: currentAccount?.id || 0,
      filename,
      transactions: ofXTransactions,
    })

    setToTransaction(true)
  }

  if (toTransactions) {
    return <Navigate to="/transactions" />
  }

  const renderImportTable = () => {
    if (isLoading) {
      return <div />
    }

    return (
      <>
        <h5 data-testid="import-title">
          into <strong>{currentAccount.name}</strong> account
        </h5>
        <ImportTable
          transactions={transactions}
          groupedCategories={groupedCategories}
          subcategories={subcategories}
        />
      </>
    )
  }

  return (
    <div>
      <PageHeader title="import transactions" isLoading={isLoading}>
        {!isLoading && (
          <Button onClick={importTransactions}>
            <i className="fa fa-file-text-o" /> Import
          </Button>
        )}
      </PageHeader>
      <div className="container import">{renderImportTable()}</div>
    </div>
  )
}

export default ImportPage
