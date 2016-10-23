import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import TestUtils from 'react-addons-test-utils';
import SearchCriteria from '../search-criteria';
import DateRangeFilter from '../date-range-filter';

describe('SearchCriteria', () => {
  let criteria;
  describe('render', () => {
    it('renders date range filter', () => {
      const filters = [{ name: 'DATE_RANGE_FILTER' }];
      const onFetchHandler = jasmine.createSpy('onFetchHandler');
      const criteria = shallowRenderer(<SearchCriteria filters={filters} fetch={onFetchHandler} />);

      const dateFilter = criteria.props.children[0];
      expect(dateFilter.type).toEqual(DateRangeFilter);
      expect(dateFilter.props.fetch).toEqual(onFetchHandler);
    });
  });
});
