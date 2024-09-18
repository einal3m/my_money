import { DateRange } from 'types/models'
import { DateRangeResponse } from 'types/api'

export const transformFromApi = (dateRange: DateRangeResponse): DateRange => {
  return {
    id: dateRange.id,
    name: dateRange.name,
    custom: dateRange.custom,
    default: dateRange.default,
    fromDate: dateRange.from_date,
    toDate: dateRange.to_date,
  }
}
