import staticDataTransformer from '../static-data-transformer';

describe('StaticDataTransformer', () => {
  describe('transformFromApi', () => {
    it('converts date ranges from API format', () => {
      let dateRange = {
        id: 11,
        name: 'Current Month',
        custom: false,
        default: true,
        from_date: '2015-11-01',
        to_date: '2015-11-30'
      }

      let transformedDateRange = staticDataTransformer.transformDateRange(dateRange);

      expect(transformedDateRange.id).toEqual(11);
      expect(transformedDateRange.name).toEqual('Current Month');
      expect(transformedDateRange.custom).toEqual(false);
      expect(transformedDateRange.default).toEqual(true);
      expect(transformedDateRange.fromDate).toEqual('2015-11-01');
      expect(transformedDateRange.toDate).toEqual('2015-11-30');
    });
  });
});
