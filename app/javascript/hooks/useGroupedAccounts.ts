import { useGetAccountsQuery, useGetAccountTypesQuery } from 'stores/accountApi'

import { Account, AccountType } from 'types/models'

type AccountGroup = {
  accountType: AccountType
  accounts: Account[]
}

type UseGroupedAccounts = {
  isLoading: boolean
  isSuccess: boolean
  groupedAccounts?: AccountGroup[]
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

  const isLoading = isLoadingT || isLoadingA
  const isSuccess = isSuccessT && isSuccessA

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

  return { isLoading, isSuccess, groupedAccounts }
}
