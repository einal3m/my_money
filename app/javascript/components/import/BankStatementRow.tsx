import React from 'react'
import { useDispatch } from 'react-redux'

import Date from 'components/common/Date'
import Button from 'components/common/controls/Button'
import { BankStatement, ModelType } from 'types/models'
import { showFormModal } from 'stores/formSlice'

type BankStatementRowProps = {
  bankStatement: BankStatement
}

const BankStatementRow = (props: BankStatementRowProps) => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(
      showFormModal({
        modelType: ModelType.BankStatement,
        model: props.bankStatement,
        allowDelete: true,
      }),
    )
  }

  return (
    <tr>
      <td>
        <Date date={props.bankStatement.date} />
      </td>
      <td>{props.bankStatement.fileName}</td>
      <td className="right-justify">{props.bankStatement.transactionCount}</td>
      <td className="right-justify button-group button-group-secondary">
        <Button onClick={handleClick}>Delete</Button>
      </td>
    </tr>
  )
}

export default BankStatementRow
