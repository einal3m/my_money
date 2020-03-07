import React from 'react';
import PageHeader from '../common/PageHeader';
import ReportViewButtons from '../common/controls/ReportViewButtons';
import SearchCriteria, { DATE_RANGE_FILTER, CATEGORY_FILTER } from '../common/criteria/SearchCriteria';
import ReportContent from './ReportContent';
import { getSubcategoryReport } from '../../actions/report-actions';
import { SOURCE_SUBCATEGORY_REPORT } from '../../actions/form-actions';

export default class SubcategoryReport extends React.Component {

  constructor() {
    super();
    this.fetchReport();
  }

  fetchReport = () => {
    getSubcategoryReport();
  };

  render() {
    return (
      <div>
        <PageHeader title="subcategory report">
          <ReportViewButtons />
        </PageHeader>
        <SearchCriteria
          filters={[{ name: CATEGORY_FILTER, options: { showSubcategories: true } }, { name: DATE_RANGE_FILTER }]}
          fetch={this.fetchReport}
        />
        <div className="container">
          <ReportContent source={SOURCE_SUBCATEGORY_REPORT} />
        </div>
      </div>
    );
  }
}
