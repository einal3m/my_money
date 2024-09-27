import React, { ChangeEvent } from 'react'

import Amount from '../common/Amount'
import Date from '../common/Date'
import GroupedCategorySelect from '../common/controls/GroupedCategorySelect'
import SubcategoryPicker from '../common/controls/SubcategoryPicker'
import { OfxTransaction, Subcategory } from 'types/models'
import { GroupedCategories } from 'hooks/useGroupedCategories'
import {
  setCategoryId,
  setImport,
  setNotes,
  setSubcategoryId,
} from 'stores/importSlice'
import { useDispatch } from 'react-redux'

type ImportRowProps = {
  index: number
  transaction: OfxTransaction
  groupedCategories: GroupedCategories[]
  subcategories: Subcategory[]
}

const ImportRow = (props: ImportRowProps) => {
  const dispatch = useDispatch()

  const onImportChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setImport({ index: props.index, value: event.target.checked }))
  }

  const onCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setCategoryId({ index: props.index, value: Number(event.target.value) }),
    )
  }

  const onSubcategoryChange = (subcategoryId: number) => {
    dispatch(setSubcategoryId({ index: props.index, value: subcategoryId }))
  }

  const onNotesChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setNotes({ index: props.index, value: event.target.value }))
  }

  const renderImport = () => {
    return (
      <input
        data-testid="import-checkbox"
        type="checkbox"
        checked={props.transaction.import}
        onChange={onImportChange}
      />
    )
  }

  const renderNotes = () => {
    return (
      <input
        data-testid="import-notes"
        className="form-control"
        value={props.transaction.notes || ''}
        onChange={onNotesChange}
      />
    )
  }

  const renderCategory = () => {
    return (
      <div data-testid="import-category">
        <GroupedCategorySelect
          groupedCategories={props.groupedCategories}
          onChange={onCategoryChange}
          value={props.transaction.categoryId}
          allowUnassigned
        />
      </div>
    )
  }

  const renderSubcategory = () => {
    if (!props.transaction.categoryId) {
      return undefined
    }

    return (
      <div data-testid="import-subcategory">
        <SubcategoryPicker
          groupedCategories={props.groupedCategories}
          categoryId={props.transaction.categoryId}
          onChange={onSubcategoryChange}
          value={props.transaction.subcategoryId}
        />
      </div>
    )
  }

  const rowClass = () => {
    if (props.transaction.duplicate) {
      return 'danger'
    }
    return ''
  }

  return (
    <tr className={rowClass()}>
      <td>
        <Date date={props.transaction.date} />
      </td>
      <td>{props.transaction.memo}</td>
      <td>{renderNotes()}</td>
      <td>{renderCategory()}</td>
      <td>{renderSubcategory()}</td>
      <td className="currency">
        <Amount amount={props.transaction.amount} />
      </td>
      <td>{renderImport()}</td>
    </tr>
  )
}

export default ImportRow
