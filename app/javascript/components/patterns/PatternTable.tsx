import React from 'react'

import PatternRow from './PatternRow'
import { Account, Pattern } from 'types/models'
import { GroupedCategories } from 'hooks/useGroupedCategories'

type PatternTableProps = {
  account: Account
  groupedCategories: GroupedCategories[]
  patterns: Pattern[]
}

export const PatternTable = (props: PatternTableProps) => {
  const renderPatterns = () => {
    return props.patterns.map((pattern) => (
      <PatternRow
        key={pattern.id}
        pattern={pattern}
        groupedCategories={props.groupedCategories}
      />
    ))
  }

  const renderTable = () => {
    if (props.patterns.length > 0) {
      return (
        <table className="table table-hover" id="pattern-table">
          <thead>
            <tr>
              <th>match text</th>
              <th>notes</th>
              <th>category</th>
            </tr>
          </thead>
          <tbody>{renderPatterns()}</tbody>
        </table>
      )
    }
    return (
      <div className="empty-state">There are no patterns for this account</div>
    )
  }

  return (
    <div>
      <div className="pattern-title">
        <h5 className="text-uppercase">patterns for</h5>
        <h5 className="account-name">{props.account.name}</h5>
      </div>
      {renderTable()}
    </div>
  )
}
