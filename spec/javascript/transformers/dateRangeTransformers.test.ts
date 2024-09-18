import { transformFromApi } from 'transformers/dateRangeTransformer'

describe('DateRangeTransformer', () => {
  describe('transformFromApi', () => {
    it('converts date ranges from API format', () => {
      const dateRange = {
        id: 11,
        name: 'Current Month',
        custom: false,
        default: true,
        from_date: '2015-11-01',
        to_date: '2015-11-30',
      }

      const transformedDateRange = transformFromApi(dateRange)

      expect(transformedDateRange.id).toEqual(11)
      expect(transformedDateRange.name).toEqual('Current Month')
      expect(transformedDateRange.custom).toEqual(false)
      expect(transformedDateRange.default).toEqual(true)
      expect(transformedDateRange.fromDate).toEqual('2015-11-01')
      expect(transformedDateRange.toDate).toEqual('2015-11-30')
    })
  })
})
