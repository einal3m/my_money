import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import SubcategoryReport from '../subcategory-report';
import PageHeader from '../../common/page-header';
import SearchCriteria, { DATE_RANGE_FILTER, CATEGORY_FILTER } from '../../common/criteria/search-criteria';

describe('SubcategoryReport', () => {
  describe('render', () => {
    it('has a page header, search criteria and chart', () => {
      const report = shallowRenderer(<SubcategoryReport />);

      const [header, criteria] = report.props.children;

      expect(header.type).toEqual(PageHeader);
      expect(header.props.title).toEqual('subcategory report');

      expect(criteria.type).toEqual(SearchCriteria);
      const filters = criteria.props.filters;
      expect(filters[0].name).toEqual(CATEGORY_FILTER);
      expect(filters[1].name).toEqual(DATE_RANGE_FILTER);
    });
  });
});
