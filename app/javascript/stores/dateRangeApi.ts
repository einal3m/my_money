import { DateRange } from 'types/models'
import { transformFromApi } from 'transformers/dateRangeTransformer'
import { DateRangeResponse } from 'types/api'
import { applicationApi } from './applicationApi'

export const dateRangeApi = applicationApi.injectEndpoints({
  endpoints: (builder) => ({
    getDateRanges: builder.query<DateRange[], void>({
      query() {
        return {
          url: `/date_range_options`,
        }
      },
      transformResponse: (results: { date_range_options: DateRangeResponse[] }) =>
        results.date_range_options.map((dateRange) => transformFromApi(dateRange)),
    }),
  }),
})

export const { useGetDateRangesQuery } = dateRangeApi
