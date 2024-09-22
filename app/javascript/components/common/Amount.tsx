import React from 'react'

import { centsToDollars, numberFormat } from 'util/moneyUtil'

type AmountProps = {
  amount: number
}
const Amount = (props: AmountProps) => {
  let sign
  const formattedAmount = numberFormat(centsToDollars(props.amount))

  const cents = formattedAmount.substr(formattedAmount.length - 2, 2)
  const dollars = formattedAmount.substr(0, formattedAmount.length - 3)

  if (props.amount > 0) {
    sign = <span className="positive">+</span>
  } else if (props.amount < 0) {
    sign = <span className="negative">-</span>
  }
  return (
    <span>
      {sign} <span className="dollars">{dollars}</span>.
      <span className="cents">{cents}</span>
    </span>
  )
}

export default Amount
