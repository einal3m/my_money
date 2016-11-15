import React from 'react';
import shallowRenderer from '../../../util/__tests__/shallow-renderer';
import { ReportContentComponent as ReportContent } from '../report-content';

describe('ReportContent', () => {
  describe('render', () => {
    it('displays a chart if viewType is chart', () => {
      const content = shallowRenderer(<ReportContent viewType="chart" />);

      expect(content.props.children.props.children).toMatch(/chart/);
    });

    it('displays a table if viewType is table', () => {
      const content = shallowRenderer(<ReportContent viewType="table" />);

      expect(content.props.children.props.children).toMatch(/table/);
    });
  });
});
