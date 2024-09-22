import React from 'react'
import PropTypes from 'prop-types'

import Amount from 'components/common/Amount'

type ReportTransactionTotalRowProps = {
  total: number
}

const ReportTransactionTotalRow = ({
  total,
}: ReportTransactionTotalRowProps) => (
  <tr className="total">
    <td>Total</td>
    <td></td>
    <td></td>
    <td className="currency">
      <Amount amount={total} />
    </td>
  </tr>
)

ReportTransactionTotalRow.propTypes = {
  total: PropTypes.number.isRequired,
}

export default ReportTransactionTotalRow
