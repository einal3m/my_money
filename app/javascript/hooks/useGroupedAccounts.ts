import { useSelector } from 'react-redux'
import { useGetAccountsQuery, useGetAccountTypesQuery } from 'stores/accountApi'
import { RootState } from 'stores/store'

import { Account, AccountType } from 'types/models'

type AccountGroup = {
  accountType: AccountType
  accounts: Account[]
}

type UseGroupedAccounts = {
  isLoading: boolean
  isSuccess: boolean
  accounts?: Account[]
  groupedAccounts?: AccountGroup[]
  currentAccount?: Account
  currentSelectedAccounts?: Account[]
}

export const useGroupedAccounts = (): UseGroupedAccounts => {
  const {
    data: accountTypes,
    isLoading: isLoadingT,
    isSuccess: isSuccessT,
  } = useGetAccountTypesQuery()

  const {
    data: accounts,
    isLoading: isLoadingA,
    isSuccess: isSuccessA,
  } = useGetAccountsQuery()

  const { currentAccount, currentSelectedAccounts } = useSelector(
    (state: RootState) => state.currentStore,
  )

  const isLoading = isLoadingT || isLoadingA || !currentAccount
  const isSuccess = isSuccessT && isSuccessA && !!currentAccount

  const groupedAccounts = (
    accountTypes
      ? accountTypes.map((accountType: AccountType) => ({
          accountType,
          accounts: accounts
            ? accounts.filter((a: Account) => a.accountType == accountType.code)
            : [],
        }))
      : []
  ).filter((accountGroup: AccountGroup) => accountGroup.accounts.length > 0)

  return {
    isLoading,
    isSuccess,
    accounts,
    groupedAccounts,
    currentAccount,
    currentSelectedAccounts,
  }
}
