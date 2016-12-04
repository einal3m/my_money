import React from 'react';
import shallowRenderer from '../../../../util/__tests__/shallow-renderer';
import SearchCriteria, { CATEGORY_FILTER, ACCOUNT_FILTER, DATE_RANGE_FILTER } from '../search-criteria';
import DateRangeFilter from '../date-range-filter';
import AccountFilter from '../account-filter';
import CategoryFilter from '../category-filter';

describe('SearchCriteria', () => {
  describe('render', () => {
    it('renders date range, category and account filters', () => {
      const filters = [
        { name: CATEGORY_FILTER },
        { name: DATE_RANGE_FILTER },
        { name: ACCOUNT_FILTER },
      ];
      const onFetchHandler = jasmine.createSpy('onFetchHandler');
      const criteria = shallowRenderer(<SearchCriteria filters={filters} fetch={onFetchHandler} />);

      const [categoryFilter, dateFilter, accountFilter] = criteria.props.children;

      expect(categoryFilter.type).toEqual(CategoryFilter);
      expect(categoryFilter.props.fetch).toEqual(onFetchHandler);
      expect(categoryFilter.props.showSubcategories).toEqual(false);

      expect(dateFilter.type).toEqual(DateRangeFilter);
      expect(dateFilter.props.fetch).toEqual(onFetchHandler);

      expect(accountFilter.type).toEqual(AccountFilter);
      expect(accountFilter.props.multiple).toEqual(false);
      expect(accountFilter.props.fetch).toEqual(onFetchHandler);
    });

    it('passes on account filter options', () => {
      const filters = [
        { name: ACCOUNT_FILTER, options: { multiple: true } },
      ];
      const onFetchHandler = jasmine.createSpy('onFetchHandler');
      const criteria = shallowRenderer(<SearchCriteria filters={filters} fetch={onFetchHandler} />);

      const accountFilter = criteria.props.children[0];
      expect(accountFilter.props.multiple).toEqual(true);
    });

    it('passes on category filter options', () => {
      const filters = [
        { name: CATEGORY_FILTER, options: { showSubcategories: true } },
      ];
      const onFetchHandler = jasmine.createSpy('onFetchHandler');
      const criteria = shallowRenderer(<SearchCriteria filters={filters} fetch={onFetchHandler} />);

      const categoryFilter = criteria.props.children[0];
      expect(categoryFilter.props.showSubcategories).toEqual(true);
    });
  });
});
