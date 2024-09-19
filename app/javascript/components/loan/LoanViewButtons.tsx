import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setCurrentLoanView } from 'stores/currentSlice'
import { RootState } from 'stores/store'

const LoanViewButtons = () => {
  const currentLoanView = useSelector(
    (state: RootState) => state.currentStore.currentLoanView,
  )
  const dispatch = useDispatch()

  const className = (view: string) =>
    view === currentLoanView ? ' active' : ''
  const setChartView = () => dispatch(setCurrentLoanView('chart'))
  const setBudgetView = () => dispatch(setCurrentLoanView('budget'))

  return (
    <div className="btn-group" role="group">
      <button
        className={`btn btn-default${className('chart')}`}
        onClick={setChartView}
      >
        <i className="fa fa-line-chart" />
      </button>
      <button
        className={`btn btn-default${className('budget')}`}
        onClick={setBudgetView}
      >
        <i className="fa fa-table" />
      </button>
    </div>
  )
}

export default LoanViewButtons
