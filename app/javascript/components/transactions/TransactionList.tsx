import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Navigate } from 'react-router'

import PageHeader from '../common/PageHeader'
import SearchCriteria from './SearchCriteria'
import TransactionTable from './TransactionTable'
import FileChooserModal from '../import/FileChooserModal'
import TransactionModal from './TransactionModal'
import { useGroupedAccounts } from 'hooks/useGroupedAccounts'
import { showFormModal } from 'stores/formSlice'
import { ModelType } from 'types/models'
import { applicationApi } from 'stores/applicationApi'
import { useUploadOFXMutation } from 'stores/importApi'
import { setOfxTransactions } from 'stores/importSlice'

import '../../stylesheets/common.scss'
import '../../stylesheets/transaction.scss'

const TransactionList = () => {
  const [toImport, setToImport] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [uploadOFX] = useUploadOFXMutation()
  const { currentAccount } = useGroupedAccounts()
  const dispatch = useDispatch()

  const newTransaction = () => {
    dispatch(
      showFormModal({
        modelType: ModelType.Transaction,
        model: { accountId: currentAccount?.id },
        allowDelete: false,
      }),
    )
    dispatch(applicationApi.util.invalidateTags(['matching-transactions']))
  }

  const importTransactions = async (file: File) => {
    setShowImportModal(false)
    const data = await uploadOFX({
      accountId: currentAccount?.id || 0,
      file: file,
    }).unwrap()
    dispatch(setOfxTransactions({ transactions: data, filename: file.name }))
    setToImport(true)
  }

  const renderImportModal = () => {
    if (showImportModal && currentAccount) {
      return (
        <FileChooserModal
          show={showImportModal}
          onHide={() => setShowImportModal(false)}
          onImport={importTransactions}
          account={currentAccount}
        />
      )
    }
    return undefined
  }

  if (toImport) {
    return <Navigate to="/import" />
  }

  return (
    <div>
      <PageHeader title="my transactions" apiStatus={{}}>
        <Button onClick={() => setShowImportModal(true)}>
          <i className="fa fa-file-text-o" /> Import
        </Button>
        <Button onClick={newTransaction}>
          <i className="fas fa-plus" /> New
        </Button>
      </PageHeader>
      <SearchCriteria />
      <div className="container">
        <TransactionTable />
      </div>
      {renderImportModal()}
      <TransactionModal />
    </div>
  )
}

export default TransactionList
