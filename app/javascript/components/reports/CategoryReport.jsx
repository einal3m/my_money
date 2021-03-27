import React from 'react';
import PageHeader from '../common/PageHeader';
import ReportViewButtons from '../common/controls/ReportViewButtons';
import SearchCriteria, { DATE_RANGE_FILTER, CATEGORY_FILTER } from '../common/criteria/SearchCriteria';
import ReportContent from './ReportContent';
import { getCategoryReport } from '../../actions/report-actions';
import { SOURCE_CATEGORY_REPORT } from '../../actions/form-actions';

export default class CategoryReport extends React.Component {

  constructor() {
    super();
    this.fetchReport();
  }

  fetchReport = () => {
    getCategoryReport();
  };

  render() {
    return (
      <div>
        <PageHeader title="category report">
          <ReportViewButtons />
        </PageHeader>
        <SearchCriteria
          filters={[{ name: CATEGORY_FILTER, options: { showSubcategories: false } }, { name: DATE_RANGE_FILTER }]}
          fetch={this.fetchReport}
        />
        <div className="container">
          <ReportContent source={SOURCE_CATEGORY_REPORT} />
        </div>
      </div>
    );
  }
}
