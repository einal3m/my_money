import { useSelector } from 'react-redux'

import { useGetDateRangesQuery } from 'stores/dateRangeApi'
import { DateRange } from 'types/models'
import { RootState } from 'stores/store'

type UseCurrentDateRange = {
  isLoading: boolean
  isSuccess: boolean
  dateRanges?: DateRange[]
  currentDateRange?: DateRange
}

export const UseCurrentDateRange = (): UseCurrentDateRange => {
  const { data: dateRanges, isLoading: isLoading, isSuccess: isSuccessD } =
    useGetDateRangesQuery()

  const currentDateRange = useSelector(
    (state: RootState) => state.currentStore.currentDateRange,
  )

  const isSuccess = isSuccessD && !!currentDateRange

  return { isLoading, isSuccess, dateRanges, currentDateRange }
}
