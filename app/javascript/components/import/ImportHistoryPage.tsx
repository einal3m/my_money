import React from 'react'

import PageHeader from '../common/PageHeader'
import BankStatementTable from './BankStatementTable'
import BankStatementDeleteModal from './BankStatementDeleteModal'
import SearchCriteria, {
  ACCOUNT_FILTER,
} from '../common/criteria/SearchCriteria'
import { useGroupedAccounts } from 'hooks/useGroupedAccounts'
import { useGetBankStatementsQuery } from 'stores/importApi'

import '../../stylesheets/common.scss'

const ImportHistoryPage = () => {
  const { currentAccount } = useGroupedAccounts()
  const { data: bankStatements } = useGetBankStatementsQuery(
    currentAccount?.id || 0,
    { skip: !currentAccount },
  )

  return (
    <div className="import-history">
      <PageHeader title="import history" apiStatus={{}} />
      <SearchCriteria filters={[{ name: ACCOUNT_FILTER }]} />
      {bankStatements && (
        <div className="container">
          <BankStatementTable bankStatements={bankStatements} />
        </div>
      )}
      <BankStatementDeleteModal />
    </div>
  )
}

export default ImportHistoryPage
