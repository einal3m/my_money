import { DateRangeResponse } from 'types/api'

const dateRangeOptions: DateRangeResponse[] = [
  {
    id: 1,
    name: 'Today',
    default: true,
    from_date: '2023-03-01',
    to_date: '2023-03-08',
    custom: false,
  },
  {
    id: 2,
    name: 'Custom Dates',
    default: false,
    from_date: '2023-04-11',
    to_date: '2023-04-18',
    custom: true,
  },
]

export const dateRangesMock = {
  date_range_options: dateRangeOptions,
}
