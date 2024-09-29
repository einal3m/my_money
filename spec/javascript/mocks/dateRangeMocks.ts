import { DateRangeResponse } from 'types/api'
import { todaysDate } from './dateHelpers'

const dateRangeOptions: DateRangeResponse[] = [
  {
    id: 1,
    name: 'Today',
    default: true,
    from_date: todaysDate,
    to_date: todaysDate,
    custom: false,
  },
  {
    id: 2,
    name: 'Custom Dates',
    default: false,
    from_date: todaysDate,
    to_date: todaysDate,
    custom: true,
  },
]

export const dateRangesMock = {
  date_range_options: dateRangeOptions,
}
