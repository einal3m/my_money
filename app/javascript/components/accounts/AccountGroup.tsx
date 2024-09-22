import React from 'react'

import AccountSlat from './AccountSlat'
import { Account, AccountType } from 'types/models'

type AccountGroupProps = {
  accountType: AccountType
  accounts: Account[]
}
const AccountGroup = (props: AccountGroupProps) => {
  return (
    <div className="account-group">
      <h5 className="text-uppercase">{`${props.accountType.name} Accounts`}</h5>
      <div className="accounts">
        {props.accounts.map((account) => (
          <AccountSlat key={account.id} account={account} />
        ))}
      </div>
    </div>
  )
}

export default AccountGroup
