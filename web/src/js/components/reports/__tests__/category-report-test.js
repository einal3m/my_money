import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import CategoryReport from '../category-report';
import PageHeader from '../../common/page-header';
import ReportContent from '../report-content';
import SearchCriteria, { DATE_RANGE_FILTER, CATEGORY_FILTER } from '../../common/criteria/search-criteria';
import * as accountActions from '../../../actions/account-actions';

describe('CategoryReport', () => {
  describe('render', () => {
    it('has a page header, search criteria and chart', () => {
      spyOn(accountActions, 'getAccounts');
      const report = shallowRenderer(<CategoryReport />);
      expect(accountActions.getAccounts).toHaveBeenCalled();

      const [header, criteria, content] = report.props.children;

      expect(header.type).toEqual(PageHeader);
      expect(header.props.title).toEqual('category report');

      expect(criteria.type).toEqual(SearchCriteria);
      const filters = criteria.props.filters;
      expect(filters[0].name).toEqual(CATEGORY_FILTER);
      expect(filters[1].name).toEqual(DATE_RANGE_FILTER);

      expect(content.props.children.type).toEqual(ReportContent);
    });
  });
});
