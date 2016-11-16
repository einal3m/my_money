import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import SubcategoryReport from '../subcategory-report';
import PageHeader from '../../common/page-header';
import SearchCriteria, { DATE_RANGE_FILTER, CATEGORY_FILTER } from '../../common/criteria/search-criteria';
import ReportContent from '../report-content';
import * as accountActions from '../../../actions/account-actions';
import * as reportActions from '../../../actions/report-actions';

describe('SubcategoryReport', () => {
  describe('render', () => {
    it('has a page header, search criteria and chart', () => {
      spyOn(accountActions, 'getAccounts');
      spyOn(reportActions, 'getSubcategoryReport');
      const report = shallowRenderer(<SubcategoryReport />);
      expect(accountActions.getAccounts).toHaveBeenCalled();
      expect(reportActions.getSubcategoryReport).toHaveBeenCalled();

      const [header, criteria, content] = report.props.children;

      expect(header.type).toEqual(PageHeader);
      expect(header.props.title).toEqual('subcategory report');

      expect(criteria.type).toEqual(SearchCriteria);
      const filters = criteria.props.filters;
      expect(filters[0].name).toEqual(CATEGORY_FILTER);
      expect(filters[1].name).toEqual(DATE_RANGE_FILTER);

      expect(content.props.children.type).toEqual(ReportContent);
    });
  });
});
