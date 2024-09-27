import React from 'react'
import { useDispatch } from 'react-redux'

import Amount from '../common/Amount'
import Date from '../common/Date'
import Balance from '../common/Balance'
import { memoAndNotes, categoryAndSubcategory, transferTo } from 'util/textUtil'
import { GroupedCategories } from 'hooks/useGroupedCategories'
import { Account, ModelType, Transaction } from 'types/models'
import { showFormModal } from 'stores/formSlice'

type TransactionRowProps = {
  transaction: Transaction
  groupedCategories: GroupedCategories[]
  accounts: Account[]
}

const TransactionRow = (props: TransactionRowProps) => {
  const dispatch = useDispatch()

  const renderCategoryOrTransfer = () => {
    if (props.transaction.matchingTransaction) {
      return transferTo(
        props.transaction,
        props.transaction.matchingTransaction,
        props.accounts,
      )
    }
    return categoryAndSubcategory(props.transaction, props.groupedCategories)
  }

  const onClickHandler = () => {
    dispatch(
      showFormModal({
        modelType: ModelType.Transaction,
        model: props.transaction,
        allowDelete: true,
      }),
    )
  }

  return (
    <tr className="click-me" onClick={onClickHandler}>
      <td>
        <Date date={props.transaction.date} />
      </td>
      <td>
        <div>{memoAndNotes(props.transaction)}</div>
        <div className="category">{renderCategoryOrTransfer()}</div>
      </td>
      <td className="currency">
        <Amount amount={props.transaction.amount} />
      </td>
      <td className="currency">
        <Balance balance={props.transaction.balance} />
      </td>
    </tr>
  )
}

export default TransactionRow
