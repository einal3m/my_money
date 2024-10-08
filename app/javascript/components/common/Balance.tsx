import React from 'react'

import { centsToDollars, numberFormat } from 'util/moneyUtil'

type BalanceProps = {
  balance: number
}
const Balance = (props: BalanceProps) => {
  const formattedAmount = numberFormat(centsToDollars(props.balance))

  const cents = formattedAmount.substr(formattedAmount.length - 2, 2)
  let dollars = formattedAmount.substr(0, formattedAmount.length - 3)

  let rightBracket
  if (props.balance < 0) {
    dollars = `(${dollars}`
    rightBracket = <span className="dollars">)</span>
  }
  dollars = `$${dollars}`
  return (
    <span>
      <span className="dollars">{dollars}</span>.
      <span className="cents">{cents}</span>
      {rightBracket}
    </span>
  )
}

export default Balance
