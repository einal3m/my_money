import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

import Balance from 'components/common/Balance'
import AccountIcon from './AccountIcon'
import AccountActionButtons from './AccountActionButtons'
import { Account } from 'types/models'
import { setCurrentAccount } from 'stores/currentSlice'

type AccountSlatProps = {
  account: Account
}

const AccountSlat = (props: AccountSlatProps) => {
  const [routeTo, setRouteTo] = useState(false)
  const dispatch = useDispatch()

  if (routeTo) {
    dispatch(setCurrentAccount(props.account))
    return <Navigate to="/transactions" />
  }

  return (
    <div className="account">
      <div className="account-icon">
        <AccountIcon accountType={props.account.accountType} />
      </div>
      <div className="account-detail" onClick={() => setRouteTo(true)}>
        <div>
          <div className="name-link">
            <h6>{props.account.name}</h6>
          </div>
          <span className="text-muted">{props.account.bank}</span>
        </div>
        <div className="currency balance">
          <Balance balance={props.account.currentBalance} />
        </div>
      </div>
      <div className="button-group button-group-small button-group-secondary">
        <AccountActionButtons account={props.account} />
      </div>
    </div>
  )
}

export default AccountSlat
