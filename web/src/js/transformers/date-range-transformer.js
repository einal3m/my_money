
const dateRangeTransformer = {
  transformDateRange(dateRange) {
    return {
      id: dateRange.id,
      name: dateRange.name,
      custom: dateRange.custom,
      default: dateRange.default,
      fromDate: dateRange.from_date,
      toDate: dateRange.to_date,
    };
  },
};

export default dateRangeTransformer;
