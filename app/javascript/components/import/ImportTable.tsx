import React from 'react'

import ImportRow from './ImportRow'
import { OfxTransaction, Subcategory } from 'types/models'
import { GroupedCategories } from 'hooks/useGroupedCategories'

import '../../stylesheets/transaction.scss'

type ImportTableProps = {
  transactions: OfxTransaction[]
  groupedCategories: GroupedCategories[]
  subcategories: Subcategory[]
}

const ImportTable = (props: ImportTableProps) => {
  const renderTransactions = () => {
    return props.transactions.map((transaction, index) => (
      <ImportRow
        key={index}
        index={index}
        transaction={transaction}
        groupedCategories={props.groupedCategories}
        subcategories={props.subcategories}
      />
    ))
  }

  const renderTable = () => {
    if (props.transactions.length > 0) {
      return (
        <table
          className="table table-hover"
          id="transaction-table"
          data-testid="transaction-table"
        >
          <thead>
            <tr>
              <th className="date">date</th>
              <th className="memo">bank memo</th>
              <th className="notes">notes</th>
              <th className="category">category</th>
              <th className="subcategory">subcategory</th>
              <th className="currency">amount</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>{renderTransactions()}</tbody>
        </table>
      )
    }
    return <div>No transactions to import</div>
  }

  return <div>{renderTable()}</div>
}

export default ImportTable
