import React from 'react'

import PageHeader from '../common/PageHeader'
import { NewModelButtons } from 'components/common/controls/NewModelButtons'
import AccountGroup from './AccountGroup'
import AccountModal from './AccountModal'
import { useGroupedAccounts } from 'hooks/useGroupedAccounts'
import { ModelType } from 'types/models'

import '../../stylesheets/common.scss'
import '../../stylesheets/accounts.scss'

const AccountList = () => {
  const { isLoading, activeGroupedAccounts } = useGroupedAccounts()

  const renderAccountGroups = () => {
    if (activeGroupedAccounts == undefined) return <></>

    return activeGroupedAccounts.map((accountGroup) => {
      return (
        <AccountGroup
          key={accountGroup.accountType.code}
          accountType={accountGroup.accountType}
          accounts={accountGroup.accounts}
        />
      )
    })
  }

  return (
    <div>
      <PageHeader title="my accounts" isLoading={isLoading}>
        <NewModelButtons
          modelTypes={[
            ModelType.AccountSavings,
            ModelType.AccountShare,
            ModelType.AccountLoan,
          ]}
        />
      </PageHeader>

      <div className="account-list">{renderAccountGroups()}</div>

      <AccountModal />
    </div>
  )
}

export default AccountList
