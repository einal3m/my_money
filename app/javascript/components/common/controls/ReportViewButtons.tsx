import React from 'react'
import { useDispatch } from 'react-redux'

import { toggleCurrentReportView, ReportViewType } from 'stores/currentSlice'

type ReportViewButtonsProps = {
  viewType: ReportViewType
}

export const ReportViewButtons = (props: ReportViewButtonsProps) => {
  const disabled = (viewType: ReportViewType) =>
    viewType === props.viewType ? true : false
  const dispatch = useDispatch()

  const toggleReportView = () => {
    dispatch(toggleCurrentReportView())
  }

  return (
    <div className="button-group" role="group">
      <button
        id="chartButton"
        className="btn btn-primary"
        disabled={disabled('chart')}
        onClick={toggleReportView}
      >
        <i className="fa fa-bar-chart" />
      </button>
      <button
        id="tableButton"
        className="btn btn-primary"
        disabled={disabled('table')}
        onClick={toggleReportView}
      >
        <i className="fa fa-table" />
      </button>
    </div>
  )
}

export default ReportViewButtons
