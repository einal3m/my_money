import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useGetCategoriesQuery } from 'stores/categoryApi'
import { setCurrentCategory } from 'stores/currentSlice'

import { centsToDollars, moneyFormat } from 'util/moneyUtil'

type CategoryTotalRowProps = {
  categoryId?: number
  name: string
  amount: number
}

const CategoryTotalRow = (props: CategoryTotalRowProps) => {
  const [routeTo, setRouteTo] = useState(false)
  const dispatch = useDispatch()
  const { data: categories } = useGetCategoriesQuery()

  if (routeTo) {
    const category = categories?.find((c) => c.id == props.categoryId)
    dispatch(setCurrentCategory(category))
    return <Navigate to="/reports/categoryReport" />
  }

  return (
    <tr className="category clickable" onClick={() => setRouteTo(true)}>
      <td>{props.name}</td>
      <td className="money" />
      <td className="money">{moneyFormat(centsToDollars(props.amount))}</td>
    </tr>
  )
}

export default CategoryTotalRow
