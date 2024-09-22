import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { centsToDollars, moneyFormat } from 'util/moneyUtil'
import {
  useGetCategoriesQuery,
  useGetSubcategoriesQuery,
} from 'stores/categoryApi'
import { setCurrentCategory, setCurrentSubcategory } from 'stores/currentSlice'

type SubcaetgoryTotalRowProps = {
  categoryId: number
  subcategoryId?: number
  name: string
  amount: number
}

const SubcategoryTotalRow = (props: SubcaetgoryTotalRowProps) => {
  const [routeTo, setRouteTo] = useState(false)
  const dispatch = useDispatch()
  const { data: categories } = useGetCategoriesQuery()
  const { data: subcategories } = useGetSubcategoriesQuery()

  if (routeTo) {
    const category = categories?.find((c) => c.id == props.categoryId)
    const subcategory = subcategories?.find((s) => s.id == props.subcategoryId)
    dispatch(setCurrentCategory(category))
    dispatch(setCurrentSubcategory(subcategory))
    return <Navigate to="/reports/subcategoryReport" />
  }

  return (
    <tr className="subcategory clickable" onClick={() => setRouteTo(true)}>
      <td className="name">{props.name}</td>
      <td className="money">{moneyFormat(centsToDollars(props.amount))}</td>
      <td className="money" />
    </tr>
  )
}

export default SubcategoryTotalRow
