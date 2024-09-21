import React from 'react'
import { useDispatch } from 'react-redux'

import DatePicker from '../date-picker/DatePicker'
import Select from '../controls/Select'
import { UseCurrentDateRange } from 'hooks/useCurrentDateRange'
import {
  setCurrentDateRange,
  setCurrentFromDate,
  setCurrentToDate,
} from 'stores/currentSlice'

const DateRangeFilter = () => {
  const { isSuccess, dateRanges, currentDateRange } = UseCurrentDateRange()
  const dispatch = useDispatch()

  const onSelectDateRange = (id: number) => {
    const dateRange = dateRanges?.find((dr) => dr.id == id)
    if (dateRange) {
      dispatch(setCurrentDateRange(dateRange))
    }
  }

  const onFromDateChange = (date: string) => {
    dispatch(setCurrentFromDate(date))
  }

  const onToDateChange = (date: string) => {
    dispatch(setCurrentToDate(date))
  }

  if (isSuccess && dateRanges && currentDateRange) {
    return (
      <div className="date-range-filter">
        <div className="form-group">
          <label htmlFor="dateRangeSelect" className="control-label">
            Dates
          </label>
          <Select
            name="dateRangeId"
            value={currentDateRange.id}
            options={dateRanges}
            onChange={onSelectDateRange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="fromDate" className="control-label">
            From
          </label>
          <DatePicker
            name="fromDate"
            value={currentDateRange.fromDate}
            onChange={onFromDateChange}
            disabled={!currentDateRange.custom}
          />
        </div>
        <div className="form-group">
          <label htmlFor="toDate" className="control-label">
            To
          </label>
          <DatePicker
            name="toDate"
            value={currentDateRange.toDate}
            onChange={onToDateChange}
            disabled={!currentDateRange.custom}
          />
        </div>
      </div>
    )
  }

  return <div />
}

export default DateRangeFilter
