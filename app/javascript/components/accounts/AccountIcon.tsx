import React from 'react'

type AccountIconProps = {
  accountType: string
}

const AccountIcon = (props: AccountIconProps) => {
  switch (props.accountType) {
    case 'savings':
      return <i className="fas fa-piggy-bank fa-3x"></i>
    case 'share':
      return <i className="fas fa-university fa-3x"></i>
    case 'loan':
      return <i className="fas fa-home fa-3x"></i>
    default:
      return <span />
  }
}

export default AccountIcon
