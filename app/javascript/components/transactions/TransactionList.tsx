import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { Button } from 'react-bootstrap'
import { Navigate } from 'react-router'
import PageHeader from '../common/PageHeader'
import SearchCriteria from './SearchCriteria'
import TransactionTable from './TransactionTable'
import { uploadOFX } from '../../actions/import-actions'
import FileChooserModal from '../import/FileChooserModal'
import TransactionModal from './TransactionModal'
import { useGroupedAccounts } from 'hooks/useGroupedAccounts'
import { showFormModal } from 'stores/formSlice'
import { ModelType } from 'types/models'

import '../../stylesheets/common.scss'
import '../../stylesheets/transaction.scss'
import { applicationApi } from 'stores/applicationApi'

const TransactionList = () => {
  const [toImport, setToImport] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
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

  // const formData = (file) => {
  //   const data = new FormData()
  //   data.append('data_file', file)
  //   return data
  // }

  const importTransactions = (file) => {
    setShowImportModal(false)
    uploadOFX(currentAccount?.id, file)
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
