import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import SubcategoryReport from '../subcategory-report';
import PageHeader from '../../common/page-header';

describe('SubcategoryReport', () => {
  describe('render', () => {
    it('has a page header, search criteria and chart', () => {
      const report = shallowRenderer(<SubcategoryReport />);

      const [header, chart] = report.props.children;
      expect(header.type).toEqual(PageHeader);
      expect(header.props.title).toEqual('subcategory report');
    });
  });
});
