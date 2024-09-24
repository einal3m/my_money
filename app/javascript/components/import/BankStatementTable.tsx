import React from 'react'

import BankStatementRow from './BankStatementRow'
import { BankStatement } from 'types/models'

type BankStatementTableProps = {
  bankStatements: BankStatement[]
}

const BankStatementTable = (props: BankStatementTableProps) => {
  const renderBankStatements = () =>
    props.bankStatements.map((bankStatement) => (
      <BankStatementRow key={bankStatement.id} bankStatement={bankStatement} />
    ))

  if (props.bankStatements.length > 0) {
    return (
      <table className="table" id="transaction-table">
        <thead>
          <tr>
            <th>date</th>
            <th>file name</th>
            <th className="right-justify">transaction count</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>{renderBankStatements()}</tbody>
      </table>
    )
  }
  return <div className="empty-state">Nothing imported into this account</div>
}

export default BankStatementTable
